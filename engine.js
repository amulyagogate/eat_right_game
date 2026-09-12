/**
 * Core 2D Game Engine for 'Eat Right'
 * Manages canvas rendering, animation loop, plate physics, food spawning,
 * collision detection, countdown sequence, 5-catch limit enforcement, and callbacks.
 */

class GameEngine {
  constructor(canvas, callbacks = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.callbacks = callbacks; // onCatch, onGameOver, onScoreUpdate, onCountdown

    this.plate = null;
    this.particles = new ParticleSystem();
    this.fallingItems = [];
this.score = 0;
this.caughtFoods = [];

// Foods already spawned in this game
this.usedFoodIds = [];
    this.maxCatches = 5;

    this.state = 'idle'; // 'idle', 'countdown', 'playing', 'paused', 'gameover'
    this.countdownValue = 3;
    this.countdownTimer = null;

   this.lastTime = 0;
this.animId = null;



    // Spawning control
    this.spawnTimer = 0;
    this.gameStartTime = null;
this.timeTaken = 0;
    this.spawnInterval = 95; // frames between spawns (~1.5s)
    this.speedMultiplier = 1.0;

    // Background floating clouds/bubbles for visual polish
    this.bgElements = [];
    this.initBgElements();

    this.initEvents();
    this.handleResize();
  }

  setSpeedMultiplier(val) {
    this.speedMultiplier = val || 1.0;
  }

  initBgElements() {
    this.bgElements = [];
    for (let i = 0; i < 6; i++) {
      this.bgElements.push({
        x: Math.random() * 800,
        y: Math.random() * 400 + 30,
        r: Math.random() * 30 + 20,
        speed: Math.random() * 0.4 + 0.15,
        opacity: Math.random() * 0.12 + 0.05
      });
    }
  }

  handleResize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = Math.round(rect.width * dpr);
    this.canvas.height = Math.round(rect.height * dpr);

    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);

    if (this.plate) {
      this.plate.resize(this.width, this.height);
    } else {
      this.plate = new Plate(this.width, this.height);
    }
  }

  initEvents() {
    // Window resize
    window.addEventListener('resize', () => {
      this.handleResize();
    });

    // Keyboard controls
    window.addEventListener('keydown', (e) => {
      if (this.state !== 'playing') return;
      if (['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(e.key)) {
        this.plate.setKeyDown(e.key);
      }
    });

    window.addEventListener('keyup', (e) => {
      if (!this.plate) return;
      if (['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(e.key)) {
        this.plate.setKeyUp(e.key);
      }
    });

    // Mouse control on canvas
    this.canvas.addEventListener('mousemove', (e) => {
      if (this.state !== 'playing' || !this.plate) return;
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      this.plate.setTargetX(mouseX);
    });

    // Touch controls on canvas
    const handleTouch = (e) => {
      if (this.state !== 'playing' || !this.plate) return;
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) {
        const touchX = touch.clientX - rect.left;
        this.plate.setTargetX(touchX);
      }
    };

    this.canvas.addEventListener('touchstart', handleTouch, { passive: false });
    this.canvas.addEventListener('touchmove', handleTouch, { passive: false });
  }

  /**
   * Start a new game session with 3 -> 2 -> 1 -> GO!
   */
  startNewGame() {
    this.handleResize();
    this.resetState();
    this.startCountdown();
  }

  resetState() {
    this.score = 0;
    this.caughtFoods = [];
    this.fallingItems = [];
    this.usedFoodIds = [];
    this.particles.reset();
    this.spawnTimer = 0;
    this.gameStartTime = null;
this.timeTaken = 0;
    this.state = 'idle';

    if (this.plate) {
      this.plate.x = this.width / 2;
      this.plate.targetX = this.width / 2;
    }

    if (this.callbacks.onScoreUpdate) {
      this.callbacks.onScoreUpdate(this.score, this.caughtFoods);
    }
  }

  startCountdown() {
    this.state = 'countdown';
    this.countdownValue = 3;

    if (window.soundManager) {
      window.soundManager.playCountdownTick();
    }
    if (this.callbacks.onCountdown) {
      this.callbacks.onCountdown('3');
    }

    clearInterval(this.countdownTimer);
    this.countdownTimer = setInterval(() => {
      this.countdownValue--;
      if (this.countdownValue === 2) {
        if (window.soundManager) window.soundManager.playCountdownTick();
        if (this.callbacks.onCountdown) this.callbacks.onCountdown('2');
      } else if (this.countdownValue === 1) {
        if (window.soundManager) window.soundManager.playCountdownTick();
        if (this.callbacks.onCountdown) this.callbacks.onCountdown('1');
      } else if (this.countdownValue === 0) {
        if (window.soundManager) window.soundManager.playCountdownGo();
        if (this.callbacks.onCountdown) this.callbacks.onCountdown('GO!');
      } else if (this.countdownValue < 0) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
        if (this.callbacks.onCountdown) this.callbacks.onCountdown(null);
        this.state = 'playing';
this.gameStartTime = performance.now();
      }
    }, 900);

    // Start render loop
    if (!this.animId) {
      this.lastTime = performance.now();
      this.loop(this.lastTime);
    }
  }

  pause() {
    if (this.state === 'playing') {
      this.state = 'paused';
    }
  }

  resume() {
    if (this.state === 'paused') {
      this.state = 'playing';
      this.lastTime = performance.now();
    }
  }

spawnFood() {
    // Get foods that have not been spawned yet in this game
    let availableFoods = FOODS_DATABASE.filter(
        food => !this.usedFoodIds.includes(food.id)
    );

    // If every food has been used, start a new cycle
    if (availableFoods.length === 0) {
        this.usedFoodIds = [];
        availableFoods = [...FOODS_DATABASE];
    }

    // Pick a random food from the remaining foods
    const foodData = availableFoods[
        Math.floor(Math.random() * availableFoods.length)
    ];

    // Mark this food as used
    this.usedFoodIds.push(foodData.id);

    const item = new FallingItem(
        foodData,
        this.width,
        this.speedMultiplier
    );

    this.fallingItems.push(item);
}

  loop(currentTime) {
    this.animId = requestAnimationFrame((t) => this.loop(t));

    const dt = Math.min((currentTime - this.lastTime) / 16.666, 2.0);
    this.lastTime = currentTime;

    this.update(dt);
    this.draw();
  }

  update(dt) {
    // Update ambient background
    for (const bg of this.bgElements) {
      bg.x += bg.speed * dt;
      if (bg.x - bg.r > this.width) {
        bg.x = -bg.r;
      }
    }

    // Plate & particles update during playing, countdown, or game over
    if (this.plate) {
      this.plate.update(dt);
    }
    this.particles.update(dt);

    if (this.state !== 'playing') {
      return;
    }

    // Food spawning
    this.spawnTimer += dt;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnTimer = 0;
      this.spawnFood();
    }

    // Update falling foods & collisions
    for (let i = this.fallingItems.length - 1; i >= 0; i--) {
      const item = this.fallingItems[i];
      item.update(dt);

      // Collision check with plate
      if (this.plate.collidesWith(item)) {
        this.handleCatch(item);
        this.fallingItems.splice(i, 1);
        continue;
      }

      // Offscreen check (missed item - 0 penalty)
      if (item.isOffscreen(this.height)) {
        this.fallingItems.splice(i, 1);
      }
    }
  }

  handleCatch(item) {
    this.caughtFoods.push(item.data);
    this.score += item.data.points;

    // Trigger visual & audio feedback
    this.plate.triggerCatchBounce();
    const isHealthy = item.data.category === 'healthy';

    if (window.soundManager) {
      if (isHealthy) {
        window.soundManager.playHealthyCatch();
      } else {
        window.soundManager.playJunkCatch();
      }
    }

    this.particles.spawnCatchBurst(item.x, this.plate.y, isHealthy ? 'healthy' : 'junk');
    this.particles.spawnFloatingText(
      item.x,
      this.plate.y - 20,
      `+${item.data.points}`,
      isHealthy ? '#10B981' : '#F97316'
    );

    // Notify UI HUD
    if (this.callbacks.onCatch) {
      this.callbacks.onCatch(item.data, this.score, this.caughtFoods.length);
    }
    if (this.callbacks.onScoreUpdate) {
      this.callbacks.onScoreUpdate(this.score, this.caughtFoods);
    }

    // Check 5-catch limit
    if (this.caughtFoods.length >= this.maxCatches) {
      this.triggerGameOver();
    }
  }

  triggerGameOver() {
    this.state = 'gameover';
    this.fallingItems = []; // Clear falling foods
    if (this.gameStartTime !== null) {
  this.timeTaken = (performance.now() - this.gameStartTime) / 1000;
}

    // Celebrate finish!
    if (window.soundManager) {
      window.soundManager.playGameOver();
    }

    this.particles.spawnCatchBurst(this.width / 2, this.height * 0.45, 'celebrate');

    // Notify UI
    if (this.callbacks.onGameOver) {
      this.callbacks.onGameOver(
  this.caughtFoods,
  this.score,
  this.timeTaken
);
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Vibrant Sky & Outdoor gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, this.height);
    bgGrad.addColorStop(0, '#E0F2FE');  // Sky blue
    bgGrad.addColorStop(0.65, '#F0FDF4'); // Gentle mint
    bgGrad.addColorStop(1, '#DCFCE7');  // Fresh picnic lawn
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // 2. Subtle decorative clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (const bg of this.bgElements) {
      ctx.beginPath();
      ctx.arc(bg.x, bg.y, bg.r, 0, Math.PI * 2);
      ctx.arc(bg.x + bg.r * 0.6, bg.y - bg.r * 0.25, bg.r * 0.75, 0, Math.PI * 2);
      ctx.arc(bg.x - bg.r * 0.6, bg.y - bg.r * 0.2, bg.r * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Picnic table / ground surface at bottom
    const groundH = 50;
    const groundGrad = ctx.createLinearGradient(0, this.height - groundH, 0, this.height);
    groundGrad.addColorStop(0, '#86EFAC');
    groundGrad.addColorStop(1, '#22C55E');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, this.height - groundH, this.width, groundH);

    // Subtle table edge stripe
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillRect(0, this.height - groundH, this.width, 4);

    // 4. Draw falling foods
    for (const item of this.fallingItems) {
      item.draw(ctx);
    }

    // 5. Draw player plate
    if (this.plate) {
      this.plate.draw(ctx);
    }

    // 6. Draw particles & floating numbers
    this.particles.draw(ctx);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GameEngine };
}

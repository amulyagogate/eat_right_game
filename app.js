/**
 * Main Application Controller for 'Eat Right'
 * Manages player profile, camera/avatar setup, screen navigation,
 * HUD updates, modal dialogs, and nutrition score report rendering.
 */

const SUPABASE_URL = "https://xokbgslnpabhbhowldfm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_H7cXIvB5IpOoJWKYdVw8nA_ASnZmKbb";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

class EatRightApp {
  constructor() {
    this.playerName = 'Player 1';
    this.playerYear = '';
    this.playerAvatar = ''; // data URL or emoji
    this.mediaStream = null;

    this.gameEngine = null;
    this.currentScreen = 'screen-setup';

    // Game result storage
    this.lastCaughtFoods = [];
    this.lastScore = 0;

    this.initElements();
    this.initEventListeners();
    this.initAvatarPresets();
    this.loadSavedPlayer();

    // Default to chef avatar if none chosen
    if (!this.playerAvatar) {
      this.setEmojiAvatar('🧑‍🍳');
    }
  }

  initElements() {
    // Screens
    this.screens = {
      setup: document.getElementById('screen-setup'),
      menu: document.getElementById('screen-menu'),
      gameplay: document.getElementById('screen-gameplay'),
      score: document.getElementById('screen-score'),
      leaderboard: document.getElementById('screen-leaderboard')
    };

    // Setup screen elements
    this.nameInput = document.getElementById('player-name-input');
    this.greetingText = document.getElementById('setup-greeting');
    this.btnNextSetup = document.getElementById('btn-next-setup');
    this.videoElem = document.getElementById('webcam-video');
    this.snapshotCanvas = document.getElementById('snapshot-canvas');
    this.avatarPreview = document.getElementById('avatar-preview-img');
    this.avatarEmojiPreview = document.getElementById('avatar-emoji-preview');
    this.btnStartCam = document.getElementById('btn-start-camera');
    this.btnTakeSnap = document.getElementById('btn-take-snapshot');
    this.btnRetakeSnap = document.getElementById('btn-retake-camera');
    this.fileUploadInput = document.getElementById('avatar-file-upload');
    this.cameraContainer = document.getElementById('camera-stream-box');

    // Menu screen elements
    this.menuPlayerName = document.getElementById('menu-player-name');
    this.menuAvatarImg = document.getElementById('menu-avatar-img');
    this.menuAvatarEmoji = document.getElementById('menu-avatar-emoji');
    this.btnStartGame = document.getElementById('btn-start-game');
    this.btnHowToPlay = document.getElementById('btn-how-to-play');
    this.btnSettings = document.getElementById('btn-settings');
    this.btnExitMenu = document.getElementById('btn-exit-menu');

    // Gameplay elements
    this.gameCanvas = document.getElementById('game-canvas');
    this.hudScore = document.getElementById('hud-score-value');
    this.hudSlotsContainer = document.getElementById('hud-slots-container');
    this.hudPlayerBadge = document.getElementById('hud-player-name');
    this.countdownOverlay = document.getElementById('countdown-overlay');
    this.countdownText = document.getElementById('countdown-text');
    this.btnPause = document.getElementById('btn-pause-game');

    // Modals
    this.modalHowTo = document.getElementById('modal-how-to');
    this.modalSettings = document.getElementById('modal-settings');
    this.modalPause = document.getElementById('modal-pause');
    this.modalGameOver = document.getElementById('modal-game-over');
    this.btnCheckScore = document.getElementById('btn-check-score');

    // Mobile touch controls
    this.btnTouchLeft = document.getElementById('btn-touch-left');
    this.btnTouchRight = document.getElementById('btn-touch-right');

    // Score screen elements
    this.scoreFinalValue = document.getElementById('score-final-value');
    this.scoreTimeValue = document.getElementById('score-time-value');
    this.scoreHealthTier = document.getElementById('score-health-tier');
    this.statHealthyCount = document.getElementById('stat-healthy-count');
    this.statJunkCount = document.getElementById('stat-junk-count');
    this.statHealthyPts = document.getElementById('stat-healthy-pts');
    this.statJunkPts = document.getElementById('stat-junk-pts');
    this.nutritionCardsGrid = document.getElementById('nutrition-cards-grid');
    this.mealTotalsBox = document.getElementById('meal-nutrition-totals');
    this.btnRestartGame = document.getElementById('btn-restart-game');
    this.btnExitScore = document.getElementById('btn-exit-score');
    this.btnDownloadZip = document.getElementById('btn-download-game');
  }

  loadSavedPlayer() {
    try {
      const savedName = localStorage.getItem('eat_right_player_name');
      if (savedName) {
        this.playerName = savedName;
        this.nameInput.value = savedName;
        this.updateGreeting(savedName);
      }
      const savedAvatar = localStorage.getItem('eat_right_player_avatar');
      if (savedAvatar) {
        if (savedAvatar.startsWith('data:image')) {
          this.setImageAvatar(savedAvatar);
        } else {
          this.setEmojiAvatar(savedAvatar);
        }
      }
    } catch (e) {}
  }

  savePlayer() {
    try {
      localStorage.setItem('eat_right_player_name', this.playerName);
      localStorage.setItem('eat_right_player_avatar', this.playerAvatar);
    } catch (e) {}
  }

  initAvatarPresets() {
    const presets = [
      { emoji: '🧑‍🍳', name: 'Chef' },
    { emoji: '👩🏻', name: 'Girl' },
    { emoji: '👨🏻', name: 'Boy' },
    { emoji: '👩🏻‍💻', name: 'Tech Girl' },
    { emoji: '👨🏻‍💻', name: 'Tech Boy' },
  
];

    const container = document.getElementById('avatar-preset-chips');
    if (!container) return;
    container.innerHTML = '';

    presets.forEach((p) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'avatar-preset-btn';
      chip.title = p.name;
      chip.innerHTML = p.emoji;
      chip.addEventListener('click', () => {
        if (window.soundManager) window.soundManager.playClick();
        this.stopCameraStream();
        this.setEmojiAvatar(p.emoji);
      });
      container.appendChild(chip);
    });
  }

  setEmojiAvatar(emoji) {
    this.playerAvatar = emoji;
    this.avatarPreview.style.display = 'none';
    this.avatarEmojiPreview.style.display = 'flex';
    this.avatarEmojiPreview.textContent = emoji;

    if (this.cameraContainer) {
      this.cameraContainer.classList.remove('live-streaming');
    }
  }

  setImageAvatar(dataUrl) {
    this.playerAvatar = dataUrl;
    this.avatarEmojiPreview.style.display = 'none';
    this.avatarPreview.style.display = 'block';
    this.avatarPreview.src = dataUrl;

    if (this.cameraContainer) {
      this.cameraContainer.classList.remove('live-streaming');
    }
  }

  initEventListeners() {
    // 1. Setup Screen Events
    this.nameInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      this.playerName = val || 'Player 1';
      this.updateGreeting(val);
    });

    this.yearInput = document.getElementById('player-year');

this.yearInput.addEventListener('change', (e) => {
    this.playerYear = e.target.value;
});

    this.btnNextSetup.addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playClick();
      if (!this.nameInput.value.trim()) {
        this.nameInput.focus();
        this.nameInput.classList.add('shake-alert');
        setTimeout(() => this.nameInput.classList.remove('shake-alert'), 600);
        return;
      }
      if (!this.yearInput.value) {
    this.yearInput.focus();
    this.yearInput.classList.add('shake-alert');
    setTimeout(() => this.yearInput.classList.remove('shake-alert'), 600);
    return;
}
      this.stopCameraStream();
      this.savePlayer();
      this.updateMenuScreen();
      this.showScreen('menu');
    });
const btnResetProfile = document.getElementById('btn-reset-profile');

if (btnResetProfile) {
    btnResetProfile.addEventListener('click', () => {

        if (!confirm('Reset player profile and settings?')) {
            return;
        }

        localStorage.clear();

        this.playerName = 'Player 1';
        this.playerYear = '';
        this.playerAvatar = '';

        this.nameInput.value = '';
        this.yearInput.value = '';

        this.updateGreeting('');
        this.setEmojiAvatar('🧑‍🍳');

        this.stopCameraStream();
        this.showScreen('setup');
    });
}
    // Camera capture
    if (this.btnStartCam) {
      this.btnStartCam.addEventListener('click', () => this.startCamera());
    }
    if (this.btnTakeSnap) {
      this.btnTakeSnap.addEventListener('click', () => this.captureSnapshot());
    }
    if (this.btnRetakeSnap) {
      this.btnRetakeSnap.addEventListener('click', () => this.startCamera());
    }

    // Photo file upload
    if (this.fileUploadInput) {
      this.fileUploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (loadEvt) => {
          this.stopCameraStream();
          this.setImageAvatar(loadEvt.target.result);
        };
        reader.readAsDataURL(file);
      });
    }

    // 2. Main Menu Events
    this.btnStartGame.addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playClick();
      this.launchGameplay();
    });

    this.btnHowToPlay.addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playClick();
      this.openModal(this.modalHowTo);
    });

    this.btnSettings.addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playClick();
      this.syncSettingsUI();
      this.openModal(this.modalSettings);
    });

    this.btnExitMenu.addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playClick();
      this.showScreen('setup');
    });

    // 3. Modals Close
    document.querySelectorAll('.modal-close-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (window.soundManager) window.soundManager.playClick();
        const modal = e.target.closest('.modal-backdrop');
        this.closeModal(modal);
      });
    });

    // Pause button in game
    this.btnPause.addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playClick();
      if (this.gameEngine) {
        this.gameEngine.pause();
        this.openModal(this.modalPause);
      }
    });

    // Resume from pause
    document.getElementById('btn-resume-game').addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playClick();
      this.closeModal(this.modalPause);
      if (this.gameEngine) {
        this.gameEngine.resume();
      }
    });

    // Restart from pause
    document.getElementById('btn-restart-from-pause').addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playClick();
      this.closeModal(this.modalPause);
      this.launchGameplay();
    });

    // Quit from pause
    document.getElementById('btn-quit-to-menu').addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playClick();
      this.closeModal(this.modalPause);
      if (this.gameEngine) this.gameEngine.resetState();
      this.showScreen('menu');
    });

    // Game Over "CHECK SCORE" button
    this.btnCheckScore.addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playClick();
      this.closeModal(this.modalGameOver);
      this.renderScoreScreen(
    this.lastCaughtFoods,
    this.lastScore,
    this.lastTimeTaken
);
      this.showScreen('score');
    });

    // 4. Score Screen Actions
    this.btnRestartGame.addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playClick();
      this.launchGameplay();
    });

    this.btnExitScore.addEventListener('click', () => {
      if (window.soundManager) window.soundManager.playClick();
      this.showScreen('setup');
    });

    // Leaderboard
this.btnViewLeaderboard = document.getElementById('btn-view-leaderboard');
this.btnBackFromLeaderboard = document.getElementById('btn-back-from-leaderboard');

this.btnViewLeaderboard.addEventListener('click', () => {
    if (window.soundManager) window.soundManager.playClick();
    this.showLeaderboard();
});

this.btnBackFromLeaderboard.addEventListener('click', () => {
    if (window.soundManager) window.soundManager.playClick();
    this.showScreen('score');
});

    // Download game files
    if (this.btnDownloadZip) {
      this.btnDownloadZip.addEventListener('click', () => {
        this.triggerDownloadZip();
      });
    }

    // Leaderboard elements
this.leaderboardList = document.getElementById('leaderboard-list');
this.leaderboardFilters = document.querySelectorAll('.leaderboard-filter');
this.leaderboardFilters.forEach((button) => {
    button.addEventListener('click', () => {

        if (window.soundManager) {
            window.soundManager.playClick();
        }

        // Remove active state from all filters
        this.leaderboardFilters.forEach((btn) => {
            btn.classList.remove('active');
        });

        // Make clicked filter active
        button.classList.add('active');

        // Load leaderboard for selected year
        this.showLeaderboard(button.dataset.year);
    });
});


    // 5. Mobile on-screen touch arrows
    if (this.btnTouchLeft && this.btnTouchRight) {
      const handleLeftPress = (down) => {
        if (!this.gameEngine || !this.gameEngine.plate) return;
        if (down) {
          this.gameEngine.plate.setKeyDown('ArrowLeft');
        } else {
          this.gameEngine.plate.setKeyUp('ArrowLeft');
        }
      };

      const handleRightPress = (down) => {
        if (!this.gameEngine || !this.gameEngine.plate) return;
        if (down) {
          this.gameEngine.plate.setKeyDown('ArrowRight');
        } else {
          this.gameEngine.plate.setKeyUp('ArrowRight');
        }
      };

      this.btnTouchLeft.addEventListener('touchstart', (e) => { e.preventDefault(); handleLeftPress(true); });
      this.btnTouchLeft.addEventListener('touchend', (e) => { e.preventDefault(); handleLeftPress(false); });
      this.btnTouchLeft.addEventListener('mousedown', () => handleLeftPress(true));
      this.btnTouchLeft.addEventListener('mouseup', () => handleLeftPress(false));
      this.btnTouchLeft.addEventListener('mouseleave', () => handleLeftPress(false));

      this.btnTouchRight.addEventListener('touchstart', (e) => { e.preventDefault(); handleRightPress(true); });
      this.btnTouchRight.addEventListener('touchend', (e) => { e.preventDefault(); handleRightPress(false); });
      this.btnTouchRight.addEventListener('mousedown', () => handleRightPress(true));
      this.btnTouchRight.addEventListener('mouseup', () => handleRightPress(false));
      this.btnTouchRight.addEventListener('mouseleave', () => handleRightPress(false));
    }

    // Settings controls bindings
    this.initSettingsEvents();
  }

  initSettingsEvents() {
    const sfxToggle = document.getElementById('setting-sfx-toggle');
    const musicToggle = document.getElementById('setting-music-toggle');
    const volumeSlider = document.getElementById('setting-volume-slider');
    const speedSelect = document.getElementById('setting-speed-select');
   const btnResetProfile = document.getElementById('btn-reset-profile-settings');


   
    

    if (sfxToggle) {
      sfxToggle.addEventListener('change', (e) => {
        if (window.soundManager) window.soundManager.setSfxEnabled(e.target.checked);
      });
    }

    if (musicToggle) {
      musicToggle.addEventListener('change', (e) => {
        if (window.soundManager) window.soundManager.setMusicEnabled(e.target.checked);
      });
    }

    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) / 100;
        if (window.soundManager) window.soundManager.setMasterVolume(val);
      });
    }

    if (speedSelect) {
      speedSelect.addEventListener('change', (e) => {
        const multiplier = parseFloat(e.target.value);
        if (this.gameEngine) this.gameEngine.setSpeedMultiplier(multiplier);
      });
    }

    if (btnResetProfile) {
      btnResetProfile.addEventListener('click', () => {
        if (confirm('Reset player profile and settings?')) {
          localStorage.clear();
          this.playerName = 'Player 1';
          this.nameInput.value = '';
          this.playerYear = '';
          this.yearInput.value = '';
          this.updateGreeting('');
          this.setEmojiAvatar('🧑‍🍳');
          this.closeModal(this.modalSettings);
          this.showScreen('setup');
        }
      });
    }
  }

  syncSettingsUI() {
    const sm = window.soundManager;
    if (!sm) return;
    const sfxToggle = document.getElementById('setting-sfx-toggle');
    const musicToggle = document.getElementById('setting-music-toggle');
    const volumeSlider = document.getElementById('setting-volume-slider');

    if (sfxToggle) sfxToggle.checked = sm.sfxEnabled;
    if (musicToggle) musicToggle.checked = sm.musicEnabled;
    if (volumeSlider) volumeSlider.value = Math.round(sm.masterVolume * 100);
  }

  // --- CAMERA / WEBCAM SYSTEM ---

  async startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Camera access is not supported by your browser or environment. Please choose an avatar or upload an image file.');
      return;
    }

    try {
      this.stopCameraStream();
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 400 }, height: { ideal: 400 }, facingMode: 'user' },
        audio: false
      });

      this.videoElem.srcObject = this.mediaStream;
      await this.videoElem.play();

      this.cameraContainer.classList.add('live-streaming');
      this.btnStartCam.style.display = 'none';
      this.btnTakeSnap.style.display = 'inline-flex';
      this.btnRetakeSnap.style.display = 'none';
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      alert('Could not access camera (permission denied or no camera device found). You can upload a photo or pick any avatar below!');
    }
  }

  captureSnapshot() {
    if (!this.mediaStream) return;
    const width = this.videoElem.videoWidth || 300;
    const height = this.videoElem.videoHeight || 300;

    this.snapshotCanvas.width = width;
    this.snapshotCanvas.height = height;

    const ctx = this.snapshotCanvas.getContext('2d');
    // Mirror snapshot to match selfie view
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(this.videoElem, 0, 0, width, height);

    const dataUrl = this.snapshotCanvas.toDataURL('image/jpeg', 0.85);
    this.setImageAvatar(dataUrl);

    this.stopCameraStream();
    this.btnTakeSnap.style.display = 'none';
    this.btnRetakeSnap.style.display = 'inline-flex';
  }

  stopCameraStream() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    if (this.videoElem) {
      this.videoElem.srcObject = null;
    }
    if (this.cameraContainer) {
      this.cameraContainer.classList.remove('live-streaming');
    }
    if (this.btnStartCam) this.btnStartCam.style.display = 'inline-flex';
    if (this.btnTakeSnap) this.btnTakeSnap.style.display = 'none';
  }

  // --- SCREEN NAVIGATION ---

  showScreen(name) {
    this.currentScreen = name;
    Object.keys(this.screens).forEach((key) => {
      const el = this.screens[key];
      if (key === name) {
        el.classList.add('active');
        el.classList.remove('hidden');
      } else {
        el.classList.remove('active');
        el.classList.add('hidden');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateGreeting(name) {
    if (name && name.trim().length > 0) {
      this.greetingText.textContent = `Hi, ${name.trim()}!`;
      this.greetingText.style.opacity = '1';
    } else {
      this.greetingText.textContent = 'Hi, Player!';
      this.greetingText.style.opacity = '0.6';
    }
  }

  updateMenuScreen() {
    this.menuPlayerName.textContent = this.playerName;

    if (this.playerAvatar.startsWith('data:image')) {
      this.menuAvatarEmoji.style.display = 'none';
      this.menuAvatarImg.style.display = 'block';
      this.menuAvatarImg.src = this.playerAvatar;
    } else {
      this.menuAvatarImg.style.display = 'none';
      this.menuAvatarEmoji.style.display = 'flex';
      this.menuAvatarEmoji.textContent = this.playerAvatar || '🧑‍🍳';
    }
  }

  openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
  }

  closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
  }

  // --- GAMEPLAY ORCHESTRATION ---

  launchGameplay() {
    this.showScreen('gameplay');

    // Update HUD
    if (this.hudPlayerBadge) {
      this.hudPlayerBadge.textContent = this.playerName;
    }
    this.hudScore.textContent = '0';
    this.renderCatchSlots([]);

    // Initialize GameEngine if not created
    if (!this.gameEngine) {
      this.gameEngine = new GameEngine(this.gameCanvas, {
        onScoreUpdate: (score, caught) => {
          this.hudScore.textContent = score;
          this.renderCatchSlots(caught);
        },
        onCatch: (item, score, count) => {
          this.hudScore.textContent = score;
          this.renderCatchSlots(this.gameEngine.caughtFoods);
        },
        onCountdown: (val) => {
          if (val) {
            this.countdownOverlay.classList.remove('hidden');
            this.countdownText.textContent = val;
            this.countdownText.classList.remove('pulse-in');
            void this.countdownText.offsetWidth; // trigger reflow
            this.countdownText.classList.add('pulse-in');
          } else {
            this.countdownOverlay.classList.add('hidden');
          }
        },
 onGameOver: async (caughtFoods, finalScore, timeTaken) => {
    this.lastCaughtFoods = caughtFoods;
    this.lastScore = finalScore;
    this.lastTimeTaken = timeTaken;

    // Save result to Supabase
    await this.saveGameScore(caughtFoods, finalScore, timeTaken);

    setTimeout(() => {
        this.openModal(this.modalGameOver);
    }, 600);
}
      });
    }

    // Read selected difficulty speed
    const speedSelect = document.getElementById('setting-speed-select');
    if (speedSelect) {
      this.gameEngine.setSpeedMultiplier(parseFloat(speedSelect.value));
    }

    this.gameEngine.startNewGame();
  }

  renderCatchSlots(caughtFoods) {
    this.hudSlotsContainer.innerHTML = '';
    const totalSlots = 5;

    for (let i = 0; i < totalSlots; i++) {
      const slot = document.createElement('div');
      slot.className = 'catch-slot';

      if (i < caughtFoods.length) {
        const food = caughtFoods[i];
        slot.classList.add('filled', food.category === 'healthy' ? 'healthy-slot' : 'junk-slot');
        slot.textContent = food.icon;
        slot.title = `${food.name} (+${food.points} pts)`;
      } else {
        slot.classList.add('empty');
        slot.textContent = '';
      }
      this.hudSlotsContainer.appendChild(slot);
    }
  }

  // --- SAVE GAME SCORE TO SUPABASE ---

async saveGameScore(caughtFoods, finalScore, timeTaken) {
    try {
        const foodNames = caughtFoods.map(food => food.name);

        const { data, error } = await supabaseClient
            .from('game_scores')
            .insert({
    name: this.playerName,
    year: this.playerYear,
    score: finalScore,
    items_caught: caughtFoods.length,
    food_caught: foodNames,
    time_taken: timeTaken
});

        if (error) {
            console.error('Failed to save score:', error);
            return;
        }

        console.log('Score saved successfully!', data);

    } catch (error) {
        console.error('Error saving score:', error);
    }
}
async showLeaderboard(selectedYear = 'All Years') {
    this.showScreen('leaderboard');

    this.leaderboardList.innerHTML = '<p>Loading leaderboard...</p>';

    try {
        const { data, error } = await supabaseClient
            .from('game_scores')
            .select('name, year, score, time_taken');

        if (error) {
            throw error;
        }

        let rows = data || [];

        // Filter by year
        if (selectedYear !== 'All Years') {
            rows = rows.filter(row => row.year === selectedYear);
        }

        // Sort: highest score first, then fastest time
        rows.sort((a, b) => {
            const scoreDifference = Number(b.score) - Number(a.score);

            if (scoreDifference !== 0) {
                return scoreDifference;
            }

            return Number(a.time_taken) - Number(b.time_taken);
        });
        // Keep top 4 ranks, including all tied players
if (rows.length > 4) {
    const fourth = rows[3];

    rows = rows.filter((row, index) => {
        return index < 4 ||
            (
                Number(row.score) === Number(fourth.score) &&
                Number(row.time_taken) === Number(fourth.time_taken)
            );
    });
}

        // Assign ranks
        let currentRank = 1;

        rows.forEach((row, index) => {
            if (index > 0) {
                const previous = rows[index - 1];

                if (
                    Number(row.score) !== Number(previous.score) ||
                    Number(row.time_taken) !== Number(previous.time_taken)
                ) {
                    currentRank = index + 1;
                }
            }

            row.rank = currentRank;
        });

        // No scores
        if (rows.length === 0) {
            this.leaderboardList.innerHTML = `
                <div class="leaderboard-row">
                    <div style="grid-column: 1 / -1; text-align: center;">
                        No scores yet!
                    </div>
                </div>
            `;
            return;
        }

        // Header
        let html = `
            <div class="leaderboard-row leaderboard-header">
                <div class="leaderboard-rank">Rank</div>
                <div class="leaderboard-name">Player Name</div>
                <div class="leaderboard-year">Year</div>
                <div class="leaderboard-score">Score</div>
                <div class="leaderboard-time">Time Taken</div>
            </div>
        `;

        // Player rows
        rows.forEach(row => {
            html += `
                <div class="leaderboard-row">
                    <div class="leaderboard-rank">
    ${
        row.rank === 1 ? '🥇' :
        row.rank === 2 ? '🥈' :
        row.rank === 3 ? '🥉' :
        row.rank
    }
</div>
                    <div class="leaderboard-name">${row.name}</div>
                    <div class="leaderboard-year">${row.year || '-'}</div>
                    <div class="leaderboard-score">${row.score}</div>
                    <div class="leaderboard-time">
                        ${Number(row.time_taken).toFixed(2)}s
                    </div>
                </div>
            `;
        });

        this.leaderboardList.innerHTML = html;

    } catch (error) {
        console.error('Leaderboard error:', error);

        this.leaderboardList.innerHTML = `
            <div class="leaderboard-row">
                <div style="grid-column: 1 / -1; text-align: center;">
                    Unable to load leaderboard.
                </div>
            </div>
        `;
    }
}
  // --- SCREEN 4: NUTRITION & SCORE SCREEN ---

 
  renderScoreScreen(caughtFoods, finalScore, timeTaken) {
  const resultPlateFoods = document.getElementById('result-plate-foods');

if (resultPlateFoods) {
    resultPlateFoods.innerHTML = caughtFoods.map(food => `
        <div class="result-plate-food">${food.icon}</div>
    `).join('');
}
    this.scoreFinalValue.textContent = finalScore;
    this.scoreTimeValue.textContent = timeTaken.toFixed(2);

    // Calculate metrics
    const healthyFoods = caughtFoods.filter((f) => f.category === 'healthy');
    const junkFoods = caughtFoods.filter((f) => f.category === 'junk');

    const healthyCount = healthyFoods.length;
    const junkCount = junkFoods.length;

    const healthyPts = healthyFoods.reduce((acc, f) => acc + f.points, 0);
    const junkPts = junkFoods.reduce((acc, f) => acc + f.points, 0);

    this.statHealthyCount.textContent = healthyCount;
    this.statJunkCount.textContent = junkCount;
    this.statHealthyPts.textContent = `+${healthyPts} pts`;
    this.statJunkPts.textContent = `+${junkPts} pts`;

    // Health Rating Tier
    if (healthyCount === 5) {
      this.scoreHealthTier.textContent = '🌟 Super Nutrition Hero! (Perfect 5/5 Healthy)';
      this.scoreHealthTier.className = 'health-tier-badge tier-super';
    } else if (healthyCount >= 4) {
      this.scoreHealthTier.textContent = '🥗 Excellent Diet! (4/5 Healthy Choices)';
      this.scoreHealthTier.className = 'health-tier-badge tier-great';
    } else if (healthyCount >= 3) {
      this.scoreHealthTier.textContent = '🥪 Balanced Meal! (3/5 Healthy Choices)';
      this.scoreHealthTier.className = 'health-tier-badge tier-balanced';
    } else if (healthyCount >= 1) {
      this.scoreHealthTier.textContent = '⚠️ High Junk Intake! (Try picking more veggies & fruits)';
      this.scoreHealthTier.className = 'health-tier-badge tier-warning';
    } else {
      this.scoreHealthTier.textContent = '🚨 Fast Food Overload! (0/5 Healthy - Watch your nutrition!)';
      this.scoreHealthTier.className = 'health-tier-badge tier-danger';
    }

    // Cumulative meal nutrition totals
    const totalCalories = caughtFoods.reduce((sum, f) => sum + (f.calories || 0), 0);
    const totalProtein = caughtFoods.reduce((sum, f) => sum + (f.protein || 0), 0).toFixed(1);
    const totalCarbs = caughtFoods.reduce((sum, f) => sum + (f.carbs || 0), 0).toFixed(1);
    const totalFat = caughtFoods.reduce((sum, f) => sum + (f.fat || 0), 0).toFixed(1);
    const totalFiber = caughtFoods.reduce((sum, f) => sum + (f.fiber || 0), 0).toFixed(1);
    const totalSugar = caughtFoods.reduce((sum, f) => sum + (f.sugar || 0), 0).toFixed(1);

    this.mealTotalsBox.innerHTML = `
      <div class="macro-summary-pill"><span class="label">Calories</span><span class="val">${totalCalories} kcal</span></div>
      <div class="macro-summary-pill"><span class="label">Protein</span><span class="val">${totalProtein} g</span></div>
      <div class="macro-summary-pill"><span class="label">Carbs</span><span class="val">${totalCarbs} g</span></div>
      <div class="macro-summary-pill"><span class="label">Fat</span><span class="val">${totalFat} g</span></div>
      <div class="macro-summary-pill"><span class="label">Fiber</span><span class="val">${totalFiber} g</span></div>
      <div class="macro-summary-pill"><span class="label">Sugar</span><span class="val">${totalSugar} g</span></div>
    `;

    // Render 5 compact nutrition cards
    this.nutritionCardsGrid.innerHTML = '';
    caughtFoods.forEach((food) => {
      const isHealthy = food.category === 'healthy';
      const card = document.createElement('div');
      card.className = `nutrition-card ${isHealthy ? 'card-healthy' : 'card-junk'}`;

      card.innerHTML = `
        <div class="card-header">
          <div class="card-title-group">
            <span class="food-icon">${food.icon}</span>
            <div>
              <h4 class="food-name">${food.name.toUpperCase()}</h4>
              <span class="badge-classification ${isHealthy ? 'badge-healthy' : 'badge-junk'}">
                ${isHealthy ? '🟢 Healthy Choice' : '🔴 Junk Food'}
              </span>
            </div>
          </div>
          <div class="card-points ${isHealthy ? 'points-healthy' : 'points-junk'}">
            +${food.points}
          </div>
        </div>

        <div class="card-nutrients">
          <div class="nutri-row"><span class="n-label">Calories:</span><span class="n-val">${food.calories} kcal</span></div>
          <div class="nutri-row"><span class="n-label">Protein:</span><span class="n-val">${food.protein} g</span></div>
          <div class="nutri-row"><span class="n-label">Carbs:</span><span class="n-val">${food.carbs} g</span></div>
          <div class="nutri-row"><span class="n-label">Fat:</span><span class="n-val">${food.fat} g</span></div>
          <div class="nutri-row"><span class="n-label">Fiber:</span><span class="n-val">${food.fiber} g</span></div>
          <div class="nutri-row"><span class="n-label">Sugar:</span><span class="n-val">${food.sugar} g</span></div>
        </div>

        <div class="card-desc">
          <p>${food.description}</p>
        </div>
      `;

      this.nutritionCardsGrid.appendChild(card);
    });
  }

  // --- DOWNLOAD SOURCE ZIP HELPER ---

  triggerDownloadZip() {
    try {
      const a = document.createElement('a');
      a.href = 'eat_right.zip';
      a.download = 'eat_right.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.warn('Download link error', e);
    }
    alert('Downloading Eat Right game ZIP package!\n\n' +
          'All project files are also available on your computer at:\n' +
          'C:\\Users\\parag\\.gemini\\antigravity\\scratch\\eat_right');
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new EatRightApp();
});

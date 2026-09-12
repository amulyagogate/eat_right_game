/**
 * Player Plate Controller
 * Handles movement, responsive sizing, touch/mouse/keyboard inputs,
 * boundary clamping, and catch bounce animation.
 */

class Plate {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.width = Math.min(140, Math.max(90, canvasWidth * 0.22));
    this.height = 28;
    this.x = canvasWidth / 2;
    this.y = canvasHeight - 45;

    this.targetX = this.x;
    this.speed = 12;
    this.vx = 0;

    // Bounce squash & stretch upon catch
    this.squashY = 1.0;
    this.stretchX = 1.0;

    // Keys pressed
    this.keys = { left: false, right: false };
  }

  resize(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.width = Math.min(140, Math.max(90, canvasWidth * 0.22));
    this.y = canvasHeight - 45;
    this.clamp();
  }

  setTargetX(targetX) {
    this.targetX = targetX;
  }

  setKeyDown(key) {
    if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
      this.keys.left = true;
    }
    if (key === 'ArrowRight' || key === 'd' || key === 'D') {
      this.keys.right = true;
    }
  }

  setKeyUp(key) {
    if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
      this.keys.left = false;
    }
    if (key === 'ArrowRight' || key === 'd' || key === 'D') {
      this.keys.right = false;
    }
  }

  triggerCatchBounce() {
    this.squashY = 0.75;
    this.stretchX = 1.15;
  }

  update(dt = 1) {
    // Keyboard movement
    if (this.keys.left) {
      this.targetX -= this.speed * dt;
    }
    if (this.keys.right) {
      this.targetX += this.speed * dt;
    }

    // Clamp target
    const halfW = this.width / 2;
    this.targetX = Math.max(halfW, Math.min(this.canvasWidth - halfW, this.targetX));

    // Smooth lerp to target
    this.x += (this.targetX - this.x) * 0.3 * dt;
    this.clamp();

    // Rebound squash & stretch back to normal
    this.squashY += (1.0 - this.squashY) * 0.15 * dt;
    this.stretchX += (1.0 - this.stretchX) * 0.15 * dt;
  }

  clamp() {
    const halfW = this.width / 2;
    if (this.x < halfW) this.x = halfW;
    if (this.x > this.canvasWidth - halfW) this.x = this.canvasWidth - halfW;
  }

  /**
   * Check collision with falling item
   * @param {FallingItem} item
   */
  collidesWith(item) {
    const halfW = (this.width / 2) * this.stretchX;
    const plateTop = this.y - (this.height / 2);
    const plateBottom = this.y + (this.height / 2);

    // Food bottom edge reaches plate upper surface
    const itemBottom = item.y + item.radius;
    const itemTop = item.y - item.radius;

    const horizontallyAligned = (item.x >= this.x - halfW && item.x <= this.x + halfW);
    const verticallyAligned = (itemBottom >= plateTop && itemTop <= plateBottom);

    return horizontallyAligned && verticallyAligned;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.stretchX, this.squashY);

    const w = this.width;
    const h = this.height;

    // 1. Soft ground shadow under plate
    ctx.beginPath();
    ctx.ellipse(0, h * 0.6, w * 0.55, h * 0.25, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    ctx.fill();

    // 2. Ceramic / Modern healthy plate base
    const gradPlate = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
    gradPlate.addColorStop(0, '#FFFFFF');
    gradPlate.addColorStop(0.4, '#F8FAFC');
    gradPlate.addColorStop(0.85, '#E2E8F0');
    gradPlate.addColorStop(1, '#CBD5E1');

    ctx.beginPath();
    ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = gradPlate;
    ctx.fill();

    // 3. Plate outer rim stroke
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#059669'; // Fresh emerald rim accent
    ctx.stroke();

    // 4. Inner plate well (shallow dip)
    const gradInner = ctx.createLinearGradient(0, -h * 0.35, 0, h * 0.35);
    gradInner.addColorStop(0, '#E6F4EA');
    gradInner.addColorStop(1, '#F0FDF4');

    ctx.beginPath();
    ctx.ellipse(0, 2, (w / 2) * 0.78, (h / 2) * 0.65, 0, 0, Math.PI * 2);
    ctx.fillStyle = gradInner;
    ctx.fill();

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#A7F3D0';
    ctx.stroke();

    // 5. Glossy highlight streak on top rim
    ctx.beginPath();
    ctx.ellipse(0, -h * 0.32, (w / 2) * 0.65, 2.5, 0, 0, Math.PI);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.restore();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Plate };
}

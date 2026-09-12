/**
 * Falling Food Item Entity
 * Represents an individual food item falling from the sky.
 */

class FallingItem {
  constructor(foodData, canvasWidth, speedMultiplier = 1.0) {
    this.data = foodData;
    this.radius = 28;

    // Spawn randomly across width with margin
    const margin = this.radius + 15;
    this.x = margin + Math.random() * (canvasWidth - margin * 2);
    this.y = -this.radius * 2;

    // Falling speed with slight variation
    const baseSpeed = 2.4 + Math.random() * 1.2;
    this.vy = baseSpeed * speedMultiplier;

    // Natural falling wobble / sway
    this.wobblePhase = Math.random() * Math.PI * 2;
    this.wobbleSpeed = 0.04 + Math.random() * 0.03;
    this.wobbleAmp = 0.8 + Math.random() * 0.8;
    this.rotation = 0;
    this.rotSpeed = (Math.random() - 0.5) * 0.04;

    this.caught = false;
  }

  update(dt = 1) {
    this.y += this.vy * dt;
    this.wobblePhase += this.wobbleSpeed * dt;
    this.x += Math.sin(this.wobblePhase) * this.wobbleAmp * dt;
    this.rotation += this.rotSpeed * dt;
  }

  isOffscreen(canvasHeight) {
    return this.y > canvasHeight + this.radius * 2;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    const isHealthy = this.data.category === 'healthy';
    const r = this.radius;

    // 1. Soft glowing background aura
    ctx.beginPath();
    ctx.arc(0, 0, r + 4, 0, Math.PI * 2);
    ctx.fillStyle = isHealthy ? 'rgba(16, 185, 129, 0.22)' : 'rgba(239, 68, 68, 0.22)';
    ctx.fill();

    // 2. Translucent badge container
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = 'transparent';

    // 3. Colored rim ring
    ctx.beginPath();
    ctx.arc(0, 0, r - 1, 0, Math.PI * 2);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    // 4. Large food emoji icon
    ctx.font = `${Math.round(r * 1.25)}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.data.icon, 0, 1);

    ctx.restore();

    // 5. Food Name Tag below item (unrotated for clear readability)
    ctx.save();
    ctx.translate(this.x, this.y + r + 13);
    const tagText = this.data.name;
    ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
    const textWidth = ctx.measureText(tagText).width;

    // Tag background
    ctx.beginPath();
    const padX = 7;
    const padY = 3;
    ctx.roundRect(-textWidth / 2 - padX, -8 - padY, textWidth + padX * 2, 16 + padY * 2, 8);
    ctx.fillStyle = '#FFFF00'
    ctx.fill();

    // Tag text
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tagText, 0, 0);

    ctx.restore();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FallingItem };
}

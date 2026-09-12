/**
 * Particle Effects & Floating Score Popups
 * Renders sparkles, stars, leaves, and animated score markers upon catching items.
 */

class ParticleSystem {
  constructor() {
    this.particles = [];
    this.floatingTexts = [];
  }

  reset() {
    this.particles = [];
    this.floatingTexts = [];
  }

  /**
   * Spawn burst particles at x, y
   * @param {number} x
   * @param {number} y
   * @param {string} type - 'healthy' | 'junk' | 'celebrate'
   */
  spawnCatchBurst(x, y, type = 'healthy') {
    const count = type === 'celebrate' ? 40 : 18;
    const colors = type === 'healthy'
      ? ['#10B981', '#34D399', '#6EE7B7', '#FBBF24', '#FFFFFF']
      : type === 'junk'
        ? ['#EF4444', '#F97316', '#FBBF24', '#F87171']
        : ['#10B981', '#3B82F6', '#EC4899', '#F59E0B', '#8B5CF6'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      const shape = Math.random() > 0.5 ? 'circle' : (Math.random() > 0.5 ? 'star' : 'rect');

      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (type === 'celebrate' ? 4 : 2),
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        decay: Math.random() * 0.02 + 0.015,
        gravity: 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        shape: shape
      });
    }
  }

  /**
   * Spawn floating text e.g. "+10" or "+5"
   */
  spawnFloatingText(x, y, text, color = '#10B981') {
    this.floatingTexts.push({
      x: x,
      y: y - 10,
      text: text,
      color: color,
      alpha: 1.0,
      vy: -2.2,
      scale: 1.4,
      scaleSpeed: 0.02
    });
  }

  update(dt = 1) {
    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += p.gravity * dt;
      p.rotation += p.rotSpeed * dt;
      p.alpha -= p.decay * dt;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Update floating score texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const t = this.floatingTexts[i];
      t.y += t.vy * dt;
      t.alpha -= 0.02 * dt;
      if (t.scale > 1.0) {
        t.scale -= t.scaleSpeed * dt;
      }
      if (t.alpha <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }
  }

  draw(ctx) {
    // Draw particles
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'star') {
        // Simple 4-point star
        ctx.beginPath();
        const r = p.size;
        ctx.moveTo(0, -r);
        ctx.lineTo(r * 0.3, -r * 0.3);
        ctx.lineTo(r, 0);
        ctx.lineTo(r * 0.3, r * 0.3);
        ctx.lineTo(0, r);
        ctx.lineTo(-r * 0.3, r * 0.3);
        ctx.lineTo(-r, 0);
        ctx.lineTo(-r * 0.3, -r * 0.3);
        ctx.closePath();
        ctx.fill();
      } else {
        // Confetti rect
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      ctx.restore();
    }

    // Draw floating score text
    for (const t of this.floatingTexts) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, t.alpha);
      ctx.font = `900 ${Math.round(28 * t.scale)}px "Fredoka", "Quicksand", system-ui, sans-serif`;
      ctx.fillStyle = t.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Outline for legibility
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#FFFFFF';
      ctx.strokeText(t.text, t.x, t.y);
      ctx.fillText(t.text, t.x, t.y);
      ctx.restore();
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ParticleSystem };
}

/**
 * Procedural Sound Synthesizer using Web Audio API
 * Generates all SFX and background melodies dynamically.
 * Zero external audio files or network requests required.
 */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = true;
    this.musicEnabled = false;
    this.masterVolume = 0.7;
    this.musicGain = null;
    this.musicInterval = null;
    this.isInitialized = false;

    // Load saved preferences if available
    try {
      const savedSfx = localStorage.getItem('eat_right_sfx');
      if (savedSfx !== null) this.sfxEnabled = savedSfx === 'true';
      const savedMusic = localStorage.getItem('eat_right_music');
      if (savedMusic !== null) this.musicEnabled = savedMusic === 'true';
      const savedVol = localStorage.getItem('eat_right_volume');
      if (savedVol !== null) this.masterVolume = parseFloat(savedVol);
    } catch (e) {
      console.warn('Storage not available for sound settings', e);
    }
  }

  init() {
    if (this.isInitialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.isInitialized = true;
    }
  }

  setMasterVolume(vol) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
    try {
      localStorage.setItem('eat_right_volume', this.masterVolume.toString());
    } catch (e) {}
  }

  setSfxEnabled(val) {
    this.sfxEnabled = !!val;
    try {
      localStorage.setItem('eat_right_sfx', this.sfxEnabled.toString());
    } catch (e) {}
  }

  setMusicEnabled(val) {
    this.musicEnabled = !!val;
    try {
      localStorage.setItem('eat_right_music', this.musicEnabled.toString());
    } catch (e) {}
    if (this.musicEnabled) {
      this.startMusic();
    } else {
      this.stopMusic();
    }
  }

  // --- SOUND EFFECTS ---

  /** Play crisp click on UI buttons */
  playClick() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /** Healthy food caught: +10 chime (Bright, uplifting C5 - G5 - C6 bell) */
  playHealthyCatch() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteStart = now + idx * 0.04;
      const noteEnd = noteStart + 0.28;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteStart);

      gain.gain.setValueAtTime(0.25, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.001, noteEnd);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(noteStart);
      osc.stop(noteEnd);
    });
  }

  /** Junk food caught: +5 cartoon boing / squish */
  playJunkCatch() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.25);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.25);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  /** Countdown ticks (3, 2, 1) */
  playCountdownTick() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  /** Countdown GO! */
  playCountdownGo() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [880, 1174.66].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = now + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.35, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(start);
      osc.stop(start + 0.35);
    });
  }

  /** Game Over fanfare: celebration chords */
  playGameOver() {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [
      { f: 523.25, d: 0.15 }, // C5
      { f: 659.25, d: 0.15 }, // E5
      { f: 783.99, d: 0.15 }, // G5
      { f: 1046.50, d: 0.5 }  // C6
    ];

    const now = this.ctx.currentTime;
    let offset = 0;

    notes.forEach((note) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = now + offset;
      const end = start + note.d;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, start);

      gain.gain.setValueAtTime(0.3, start);
      gain.gain.exponentialRampToValueAtTime(0.001, end);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(start);
      osc.stop(end);

      offset += note.d * 0.85;
    });
  }

  // --- PROCEDURAL BACKGROUND MELODY ---

  startMusic() {
    if (!this.musicEnabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.musicInterval) return;

    // Gentle relaxing pentatonic scale (C, D, E, G, A)
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    let step = 0;

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    this.musicGain.connect(this.masterGain);

    this.musicInterval = setInterval(() => {
      if (!this.musicEnabled || !this.ctx || this.ctx.state !== 'running') return;
      const noteFreq = scale[step % scale.length];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, now);

      noteGain.gain.setValueAtTime(0.05, now);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(noteGain);
      noteGain.connect(this.musicGain);

      osc.start(now);
      osc.stop(now + 0.45);

      // Playful stepping pattern
      step = (step + Math.floor(Math.random() * 3) + 1) % scale.length;
    }, 400);
  }

  stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

// Global sound manager instance
window.soundManager = new SoundManager();

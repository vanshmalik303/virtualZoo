// src/utils/soundEffects.js

class ZooSoundEngine {
  constructor() {
    this.ctx = null;
    this.ambientGain = null;
    this.ambientOsc = null;
    this.isMuted = false;
    this.isAmbientPlaying = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.05, this.ctx?.currentTime || 0);
    }
    return this.isMuted;
  }

  // Quick tone helper
  playTone(freq, type = 'sine', duration = 0.2, gainLevel = 0.15) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  }

  // Feed crunch sound
  playFeedSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    [0, 0.08, 0.16].forEach((delay, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260 - idx * 40, t + delay);
      osc.frequency.exponentialRampToValueAtTime(80, t + delay + 0.07);

      gain.gain.setValueAtTime(0.18, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + delay);
      osc.stop(t + delay + 0.07);
    });
  }

  // Petting / love chime
  playPetSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.25, 0.12);
      }, i * 65);
    });
  }

  // Clean / sponge swoosh
  playCleanSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2800, this.ctx.currentTime + 0.25);
      filter.Q.value = 3.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch {
      this.playTone(400, 'triangle', 0.2, 0.1);
    }
  }

  // Coin / reward chime
  playCoinSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    this.playTone(987.77, 'sine', 0.12, 0.15); // B5
    setTimeout(() => {
      this.playTone(1318.51, 'sine', 0.25, 0.18); // E6
    }, 90);
  }

  // Adopt celebration fanfare
  playAdoptSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.35, 0.2);
      }, idx * 120);
    });
  }

  // Animal calls synthesis
  playAnimalSound(soundType) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    switch (soundType) {
      case 'roar': {
        const osc = this.ctx.createOscillator();
        const subOsc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        subOsc.type = 'triangle';

        osc.frequency.setValueAtTime(95, t);
        osc.frequency.linearRampToValueAtTime(160, t + 0.2);
        osc.frequency.linearRampToValueAtTime(70, t + 0.85);

        subOsc.frequency.setValueAtTime(45, t);
        subOsc.frequency.linearRampToValueAtTime(80, t + 0.2);
        subOsc.frequency.linearRampToValueAtTime(35, t + 0.85);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350, t);
        filter.frequency.linearRampToValueAtTime(700, t + 0.3);
        filter.frequency.linearRampToValueAtTime(200, t + 0.85);

        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(0.3, t + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.85);

        osc.connect(filter);
        subOsc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        subOsc.start(t);
        osc.stop(t + 0.85);
        subOsc.stop(t + 0.85);
        break;
      }

      case 'trumpet': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';

        osc.frequency.setValueAtTime(220, t);
        osc.frequency.linearRampToValueAtTime(440, t + 0.15);
        osc.frequency.linearRampToValueAtTime(390, t + 0.5);

        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(0.25, t + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.55);
        break;
      }

      case 'chirp': {
        [0, 0.12, 0.24].forEach((delay) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';

          osc.frequency.setValueAtTime(1600, t + delay);
          osc.frequency.exponentialRampToValueAtTime(2800, t + delay + 0.05);
          osc.frequency.exponentialRampToValueAtTime(1400, t + delay + 0.09);

          gain.gain.setValueAtTime(0.15, t + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.09);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(t + delay);
          osc.stop(t + delay + 0.09);
        });
        break;
      }

      case 'chatter': {
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            this.playTone(400 + Math.random() * 200, 'triangle', 0.08, 0.14);
          }, i * 90);
        }
        break;
      }

      case 'click': {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            this.playTone(1800 + i * 200, 'sine', 0.03, 0.12);
          }, i * 50);
        }
        break;
      }

      case 'hoot': {
        this.playTone(320, 'sine', 0.28, 0.16);
        setTimeout(() => {
          this.playTone(280, 'sine', 0.4, 0.18);
        }, 320);
        break;
      }

      default:
        this.playTone(440, 'sine', 0.2, 0.15);
    }
  }

  // Toggle subtle ambient breeze/nature sound
  toggleAmbientNature() {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isAmbientPlaying) {
      if (this.ambientGain) {
        this.ambientGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      }
      setTimeout(() => {
        try {
          this.ambientOsc?.stop();
        } catch {
          // Ignore stop on already stopped node
        }
        this.ambientOsc = null;
        this.ambientGain = null;
      }, 500);
      this.isAmbientPlaying = false;
      return false;
    } else {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.04, this.ctx.currentTime + 1);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        this.ambientOsc = osc;
        this.ambientGain = gain;
        this.isAmbientPlaying = true;
        return true;
      } catch {
        return false;
      }
    }
  }
}

export const zooAudio = new ZooSoundEngine();

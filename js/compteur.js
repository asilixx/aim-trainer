export default class Chrono {
    constructor() {
      this.centiseconds = 0;
      this.intervalId = null; // Stocke l'identifiant du setInterval pour pouvoir l'arrêter
      this.createChronoContainer();
      this.start();
    }
  
    createChronoContainer() {
      this.chronoContainer = document.createElement("div");
      this.chronoContainer.className = "chrono";
      this.applyStyles(this.chronoContainer);
      document.body.appendChild(this.chronoContainer);
    }
  
    applyStyles(element) {
      element.className = "chrono";
    }
  
    formatTime(cs) {
      const mins = Math.floor(cs / 6000);
      const secs = Math.floor((cs % 6000) / 100);
      const csecs = cs % 100;
      return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}:${csecs.toString().padStart(2, "0")}`;
    }
  
    updateChrono() {
      this.centiseconds++;
      this.chronoContainer.textContent = this.formatTime(this.centiseconds);
    }
  
    start() {
      this.intervalId = setInterval(() => this.updateChrono(), 10);
    }
  
    stop() {
      clearInterval(this.intervalId); // Arrête le setInterval
      this.intervalId = null; // Réinitialise l'identifiant
    }
  }
  
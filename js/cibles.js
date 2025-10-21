export default class Cible {
    constructor(elementDom, x, y, width = 50, height = 50) {
      this.elementDom = elementDom;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    mettreAJourDOM() {
      this.elementDom.style.left = `${this.x}px`;
      this.elementDom.style.bottom = `${this.y}px`;
      this.elementDom.style.width = `${this.width}px`;
      this.elementDom.style.height = `${this.height}px`;
    }
  }
  
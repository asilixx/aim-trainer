import Chrono from "./compteur.js";
import Cible from "./cibles.js";

fetch('https://picsum.photos/200/300')
  .then(response => {
    const imageUrl = response.url;
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = 'Random Image';
    const imageWidth = window.innerWidth * 0.05;
    const imageHeight = window.innerHeight * 0.05;
    imgElement.style.position = 'absolute';
    imgElement.style.top = '0';
    imgElement.style.right = '0';  
    imgElement.style.width = `${imageWidth}px`;
    imgElement.style.height = `${imageHeight}px`;
    document.body.appendChild(imgElement); 
  })
  .catch(error => console.error('Error fetching image:', error));

document.addEventListener("DOMContentLoaded", () => {
  let ciblesDetruites = 0;
  let clicsTotal = 0;
  const cibleMax = 35;
  const viseur = document.querySelector(".viseur");
  const precisionDiv = document.querySelector(".precision");
  const replayButton = document.querySelector(".rejouer");
  let cibleIdCounter = 1;
  let precision = 0;

  const chrono = new Chrono(); 

  replayButton.addEventListener("click", () => {
    location.reload();
  });

  document.addEventListener("mousemove", (event) => {
    let sourisX = event.clientX;
    let sourisY = event.clientY;
    viseur.style.left = `${sourisX - 3.5}px`;
    viseur.style.top = `${sourisY - 3.5}px`;
  });

  document.addEventListener("click", () => {
    clicsTotal++;
    precision = (ciblesDetruites / clicsTotal) * 100;
    precision = precision.toFixed(2);

    precisionDiv.textContent = `Précision : ${precision}%`;
  });

  function creerCible() {
    const elementCible = document.createElement("div");
    elementCible.classList.add("cible");

    elementCible.id = `cible-${cibleIdCounter}`;
    cibleIdCounter++;

    const largeurCible = 50;
    const hauteurCible = 50;

    const x = Math.floor(Math.random() * (window.innerWidth - largeurCible));

    const hauteurDisponible =
      window.innerHeight - hauteurCible - precisionDiv.offsetHeight;
    const y =
      Math.floor(Math.random() * (hauteurDisponible * 0.90)) +
      window.innerHeight * 0.05;

    const cible = new Cible(elementCible, x, y, largeurCible, hauteurCible);
    cible.mettreAJourDOM();

    document.body.appendChild(elementCible);

    elementCible.addEventListener("click", (event) => {
      const rect = elementCible.getBoundingClientRect();
      const clicX = event.clientX;
      const clicY = event.clientY;

      if (
        clicX >= rect.left &&
        clicX <= rect.right &&
        clicY >= rect.top &&
        clicY <= rect.bottom
      ) {
        ciblesDetruites++;
        elementCible.remove();
        console.log(
          `Cible détruite. Nombre de cibles détruites: ${ciblesDetruites}`
        );
      }

      if (ciblesDetruites === cibleMax) {
        console.log("Jeu terminé! Tu as détruit toutes les cibles.");
        const tempsFinal = chrono.formatTime(chrono.centiseconds);

        alert(`Bravo, vous avez gagné avec ${precision}% de précision en ${tempsFinal}.`);
        replayButton.style.display = "block";

        chrono.stop();
      }

      if (ciblesDetruites < cibleMax - 1) {
        creerCible();
      }

      precision = (ciblesDetruites / clicsTotal) * 100;
      precision = precision.toFixed(2);

      precisionDiv.textContent = `Précision: ${precision}%`;
    });
  }

  setTimeout(() => {
    creerCible();
    creerCible();
  }, 1000);
});


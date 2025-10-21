document.addEventListener("DOMContentLoaded", function () {
    const toggleRulesBtn = document.getElementById("toggleRulesBtn");
    const reglesSection = document.getElementById("regles");
    const rulesText = document.getElementById("rulesText");
    const frenchFlag = document.getElementById("frenchFlag");
    const englishFlag = document.getElementById("englishFlag");
  
    const rulesContentFr = `
        L'objectif principal est de viser et tirer sur les cibles qui apparaissent
        aléatoirement ou selon un schéma défini à l'écran. Chaque cible touchée
        rapporte des points, tandis qu'une cible manquée peut réduire le score ou
        n'avoir aucun effet selon le mode de jeu. Les sessions sont généralement
        chronométrées, et le joueur doit maximiser sa précision et sa vitesse
        avant la fin du temps imparti. Certaines cibles peuvent disparaître si
        elles ne sont pas touchées rapidement. Le joueur ne doit pas utiliser de
        macros ou de logiciels d'aide pour garantir une expérience d'entraînement
        authentique. Les performances sont mesurées en fonction du score, de la
        précision et de la réactivité.
      `;
  
    const rulesContentEn = `
        The main objective is to aim and shoot at targets that appear
        randomly or according to a defined pattern on the screen. Each target hit
        earns points, while a missed target may reduce the score or have no effect
        depending on the game mode. Sessions are usually timed, and the player
        must maximize their accuracy and speed before time runs out. Some targets
        may disappear if not hit quickly. The player must not use macros or
        assistance software to ensure an authentic training experience. Performance
        is measured based on score, accuracy, and responsiveness.
      `;
  
    let i = 0;
    let typingInProgress = false;
    let currentContent = "";
  
    function typeWriter(rulesContent) {
      if (!typingInProgress) return;
      if (i < rulesContent.length) {
        rulesText.innerHTML += rulesContent.charAt(i);
        i++;
        setTimeout(() => typeWriter(rulesContent), 30);
      } else {
        typingInProgress = false;
      }
    }
  
    function resetText(rulesContent) {
      if (frenchFlag.addEventListener || englishFlag.addEventListener) {
          stopWriting();
      }  
    }
  
    function stopWriting() {
      typingInProgress = false;
      i = 0;
      rulesText.innerHTML = "";
    }
  
    toggleRulesBtn.addEventListener("click", function () {
      reglesSection.classList.toggle("visible");
  
      if (reglesSection.classList.contains("visible")) {
        const currentRules =
          rulesText.dataset.language === "fr" ? rulesContentFr : rulesContentEn;
        stopWriting();
        i = 0;
        typingInProgress = true;
        typeWriter(currentRules);
        toggleRulesBtn.textContent =
          rulesText.dataset.language === "fr"
            ? "Masquer les règles"
            : "Hide Rules";
      } else {
        toggleRulesBtn.textContent =
          rulesText.dataset.language === "fr"
            ? "Afficher les règles"
            : "Show Rules";
        stopWriting();
      }
    });
  
    rulesText.dataset.language = "fr";
    toggleRulesBtn.textContent = "Afficher les règles";
  
    frenchFlag.addEventListener("click", function () {
      if (typingInProgress) return;
  
      rulesText.dataset.language = "fr";
      toggleRulesBtn.textContent = reglesSection.classList.contains("visible")
        ? "Masquer les règles"
        : "Afficher les règles";
      if (reglesSection.classList.contains("visible")) {
        stopWriting();
        currentContent = rulesContentFr;
        i = 0;
        typingInProgress = true;
        typeWriter(currentContent);
      }
    });
  
    englishFlag.addEventListener("click", function () {
      if (typingInProgress) return;
  
      rulesText.dataset.language = "en";
      toggleRulesBtn.textContent = reglesSection.classList.contains("visible")
        ? "Hide Rules"
        : "Show Rules";
      if (reglesSection.classList.contains("visible")) {
        stopWriting();
        currentContent = rulesContentEn;
        i = 0;
        typingInProgress = true;
        typeWriter(currentContent);
      }
    });
  });
  
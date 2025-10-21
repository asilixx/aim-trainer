
const langBtn = document.getElementById("langBtn");
const ruleBtn = document.getElementById("ruleBtn");
const ruleText = document.getElementById("ruleText");


let isFrench = true;

langBtn.addEventListener("click", () => {
  if (isFrench) {

    langBtn.innerText = "Change Language";
    ruleBtn.innerText = "Rules";
    ruleText.innerHTML =
      "<p>Here are the rules... You can personalize this text as you wish.</p>";
    isFrench = false;
  } else {

    langBtn.innerText = "Changer Langue";
    ruleBtn.innerText = "Règle";
    ruleText.innerHTML =
      "<p>Voici le texte des règles... Tu peux personnaliser ce texte comme tu veux.</p>";
    isFrench = true;
  }
});


ruleBtn.addEventListener("click", () => {
  ruleText.classList.add("show-rule");
  ruleText.style.display = "block";
});

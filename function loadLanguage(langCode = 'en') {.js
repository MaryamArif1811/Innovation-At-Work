function loadLanguage(langCode = 'en') {
  fetch(`lang/lang-${langCode}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelector('h1').innerText = data.welcome;
      document.querySelectorAll("nav button")[0].innerText = data.activities;
      document.querySelectorAll("nav button")[1].innerText = data.learnCode;
      document.querySelectorAll("nav button")[2].innerText = data.certificates;
      document.querySelectorAll("nav button")[3].innerText = data.events;
      document.querySelectorAll("nav button")[4].innerText = data.leaderboard;
      document.querySelectorAll("nav button")[5].innerText = data.login;
      document.querySelector("section.highlight h2").innerText = data.featuredChallenge;
      document.querySelector("section.highlight p").innerText = data.challengeDesc;
    });
}
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("languageSelect");
  loadLanguage(select.value);
  select.addEventListener("change", () => loadLanguage(select.value));
});
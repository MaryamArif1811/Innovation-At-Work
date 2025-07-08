// DARK MODE TOGGLE (optional)
document.addEventListener('DOMContentLoaded', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.body.classList.add('dark');
  }
  // Example XP system (basic demo)
  window.userXP = 0;
  window.addXP = function(points) {
    userXP += points;
    alert(`🎉 You earned ${points} XP! Total XP: ${userXP}`);
  }
});
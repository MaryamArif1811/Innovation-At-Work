// Create TechAI penguin assistant
document.addEventListener('DOMContentLoaded', () => {
  const techAI = document.createElement('div');
  techAI.id = 'techAI';
  techAI.innerHTML = `
    <div class="bubble">Hi! I'm TechAI 🐧 — your coding buddy! Need help?</div>
    <img src="images/techai.png" alt="TechAI Penguin" />
  `;
  document.body.appendChild(techAI);
  // Click to expand or chat
  techAI.addEventListener('click', () => {
    alert("🧠 TechAI: I'm always here to help! You can explore coding lessons, submit activities, and earn XP!");
  });
});
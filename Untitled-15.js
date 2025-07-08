// Load users or empty object
let users = JSON.parse(localStorage.getItem('users')) || {};
function generateSecretCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const registerMsg = document.getElementById('registerMsg');
  const loginMsg = document.getElementById('loginMsg');
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim().toLowerCase();
    registerMsg.style.color = 'red';
    if (username.length < 3) {
      registerMsg.innerText = "Username must be at least 3 characters.";
      return;
    }
    if (users.hasOwnProperty(username)) {
      registerMsg.innerText = "Username already exists, please choose another.";
      return;
    }
    const secretCode = generateSecretCode();
    users[username] = {
      secretCode,
      xp: 0,
      badges: [],
      certificates: []
    };
    localStorage.setItem('users', JSON.stringify(users));
    registerMsg.style.color = 'green';
    registerMsg.innerHTML = `Account created! Your secret 6-digit code is:<br><strong>${secretCode}</strong><br><small>Please save it safely. It cannot be recovered.</small>`;
    usernameInput.value = '';
  });
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value.trim();
    loginMsg.style.color = 'red';
    if (!users.hasOwnProperty(username)) {
      loginMsg.innerText = "User not found.";
      return;
    }
    if (users[username].secretCode !== password) {
      loginMsg.innerText = "Incorrect secret code.";
      return;
    }
    loginMsg.style.color = 'green';
    loginMsg.innerText = "Login successful! Redirecting...";
    sessionStorage.setItem('currentUser', username);
    setTimeout(() => {
      window.location.href = 'index.html'; // Your homepage or dashboard
    }, 1500);
  });
});
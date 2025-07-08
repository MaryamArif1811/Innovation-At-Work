document.addEventListener('DOMContentLoaded', () => {
  const eventsList = document.getElementById('eventsList');
  const eventSelect = document.getElementById('eventSelect');
  const submitSection = document.getElementById('submitSection');
  const submitForm = document.getElementById('submitForm');
  const submitMsg = document.getElementById('submitMsg');
  // Sample events data (add/change events here)
  const eventsData = [
    { id: 'innovation_leader', title: 'Innovation Leader for a Day', xp: 100 },
    { id: 'poster_presentation', title: 'Create a Poster or Presentation', xp: 50 },
    { id: 'paragraph_innovation', title: 'Write about Innovation', xp: 30 },
    { id: 'environment_invention', title: 'Draw Environment Invention', xp: 40 },
    { id: 'innovate_acronym', title: 'INNOVATE Acronym', xp: 20 },
    { id: 'code_invention', title: 'Code Your Invention', xp: 60 }
  ];
  // Load events into page and select
  function loadEvents() {
    eventsList.innerHTML = '';
    eventSelect.innerHTML = '<option value="">-- Select event --</option>';
    eventsData.forEach(ev => {
      const li = document.createElement('li');
      li.textContent = `${ev.title} (Earn ${ev.xp} XP)`;
      eventsList.appendChild(li);
      const option = document.createElement('option');
      option.value = ev.id;
      option.textContent = ev.title;
      eventSelect.appendChild(option);
    });
  }
  // Check if user is logged in
  const currentUser = sessionStorage.getItem('currentUser');
  if (!currentUser) {
    submitSection.style.display = 'none';
    eventsList.insertAdjacentHTML('afterend', '<p>Please login to submit your work and earn XP.</p>');
  } else {
    submitSection.style.display = 'block';
  }
  loadEvents();
  submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const eventId = eventSelect.value;
    const submission = document.getElementById('submissionText').value.trim();
    if (!eventId || !submission) {
      submitMsg.textContent = 'Please select an event and write your submission.';
      return;
    }
    // Load users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[currentUser]) {
      submitMsg.textContent = 'User data not found. Please login again.';
      return;
    }
    // Store submission
    users[currentUser].submissions = users[currentUser].submissions || [];
    users[currentUser].submissions.push({
      eventId,
      submission,
      date: new Date().toISOString()
    });
    // Add XP for event
    const eventObj = eventsData.find(ev => ev.id === eventId);
    if (eventObj) {
      users[currentUser].xp = (users[currentUser].xp || 0) + eventObj.xp;
    }
    localStorage.setItem('users', JSON.stringify(users));
    submitMsg.textContent = `Work submitted! You earned ${eventObj.xp} XP. Keep innovating!`;
    submitForm.reset();
  });
});
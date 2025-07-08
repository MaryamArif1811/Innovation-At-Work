document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('certForm');
  const canvas = document.getElementById('certificateCanvas');
  const downloadLinks = document.getElementById('downloadLinks');
  const downloadPNG = document.getElementById('downloadPNG');
  const downloadJPG = document.getElementById('downloadJPG');
  const downloadPDF = document.getElementById('downloadPDF');
  // Certificate background image (add your own in images folder)
  const certBg = new Image();
  certBg.src = 'images/certificate_bg.png'; // Put your certificate background here
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    const event = document.getElementById('eventSelect').value;
    if (!name || !event) {
      alert('Please fill out all fields!');
      return;
    }
    certBg.onload = () => {
      const ctx = canvas.getContext('2d');
      canvas.width = certBg.width;
      canvas.height = certBg.height;
      // Draw certificate background
      ctx.drawImage(certBg, 0, 0);
      // Write name
      ctx.font = 'bold 36px Arial';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.fillText(name, canvas.width / 2, canvas.height / 2 - 30);
      // Write event
      ctx.font = '24px Arial';
      ctx.fillText(`For: ${eventNameMap[event]}`, canvas.width / 2, canvas.height / 2 + 20);
      downloadLinks.style.display = 'block';
    };
    // If already loaded, trigger onload
    if (certBg.complete) {
      certBg.onload();
    }
  });
  // Map event values to nicer display names
  const eventNameMap = {
    innovation_leader: "Innovation Leader for a Day",
    poster_presentation: "Create a Poster or Presentation",
    paragraph_innovation: "Write about Innovation",
    environment_invention: "Draw Environment Invention",
    innovate_acronym: "INNOVATE Acronym",
    code_invention: "Code Your Invention",
    coding_lesson: "Coding Lesson Completion",
    submit_work: "Submit Your Work"
  };
  downloadPNG.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    downloadFile(dataURL, 'certificate.png');
  });
  downloadJPG.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/jpeg', 0.9);
    downloadFile(dataURL, 'certificate.jpg');
  });
  downloadPDF.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('certificate.pdf');
  });
  function downloadFile(uri, filename) {
    const link = document.createElement('a');
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
});
function countdown(
) {
  const piDay = new Date('2025-03-14'); // Date du Pi Day 2025
const now = new Date(); // Date actuelle
const timeDiff = piDay.getTime() - now.getTime();
  if (timeDiff > 0) {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    const timeString = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    document.getElementById('time').innerHTML = timeString;
    setTimeout(countdown, 1000); // Mise à jour du chronomètre toutes les secondes
} else {
    document.getElementById('time').innerHTML = 'Pi Day 2025 is here!';
  }
}

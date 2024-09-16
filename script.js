const coverElement = document.querySelector('.cover');
const paperElement = document.querySelector('.paper');
const heartElement = document.querySelector('.heart');

let startY = 0;
let isDragging = false;

// Iniciar el deslizamiento
coverElement.addEventListener('mousedown', (event) => {
  startY = event.clientY;
  isDragging = true;
});

coverElement.addEventListener('touchstart', (event) => {
  startY = event.touches[0].clientY;
  isDragging = true;
});

// Detectar el movimiento del mouse o el dedo
document.addEventListener('mousemove', (event) => {
  if (!isDragging) return;
  const currentY = event.clientY;
  const deltaY = currentY - startY;

  // Mover la cubierta conforme se desliza
  if (deltaY > 0 && deltaY < 150) {  // Controlar hasta qué punto puede deslizarse
    coverElement.style.transform = `translateY(${deltaY}px)`;
  }
});

document.addEventListener('touchmove', (event) => {
  if (!isDragging) return;
  const currentY = event.touches[0].clientY;
  const deltaY = currentY - startY;

  if (deltaY > 0 && deltaY < 150) {
    coverElement.style.transform = `translateY(${deltaY}px)`;
  }
});

// Soltar el deslizamiento
document.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  completeOpen();
});

document.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;
  completeOpen();
});

function completeOpen() {
  coverElement.classList.add('open-cover');
  setTimeout(() => {
    coverElement.style.zIndex = -1;
    paperElement.classList.remove('close-paper');
    paperElement.classList.add('open-paper');
    heartElement.style.display = 'block';
  }, 500);
}

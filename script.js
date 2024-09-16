const coverElement = document.querySelector('.cover');
const paperElement = document.querySelector('.paper');
const heartElement = document.querySelector('.heart');

let startY = 0;
let isDragging = false;

// Función para iniciar el deslizamiento
function startDrag(event) {
  event.preventDefault();
  
  if (event.type === 'mousedown') {
    startY = event.clientY;
  } else if (event.type === 'touchstart') {
    startY = event.touches[0].clientY;
  }
  
  isDragging = true;
}

// Función para mover la carta durante el deslizamiento
function onDrag(event) {
  if (!isDragging) return;

  let currentY;
  if (event.type === 'mousemove') {
    currentY = event.clientY;
  } else if (event.type === 'touchmove') {
    currentY = event.touches[0].clientY;
  }

  const deltaY = currentY - startY;

  if (deltaY > 0 && deltaY < 200) {  // Controlar cuánto se puede deslizar
    coverElement.style.transform = `translateY(${deltaY}px)`;
  }
}

// Función para terminar el deslizamiento y abrir la carta
function stopDrag(event) {
  if (!isDragging) return;
  isDragging = false;

  // Finalizar la apertura cuando el deslizado ha sido suficiente
  const deltaY = parseInt(coverElement.style.transform.replace('translateY(', '').replace('px)', ''), 10);

  if (deltaY > 100) {  // Si se ha deslizado más de 100px, se abre la carta
    coverElement.style.transform = 'translateY(200px)';  // Completar el deslizamiento
    setTimeout(completeOpen, 300);  // Completar la animación después de un corto retraso
  } else {
    coverElement.style.transform = 'translateY(0px)';  // Si no se deslizó lo suficiente, vuelve a la posición inicial
  }
}

function completeOpen() {
  coverElement.classList.add('open-cover');
  setTimeout(() => {
    coverElement.style.zIndex = -1;
    paperElement.classList.remove('close-paper');
    paperElement.classList.add('open-paper');
    heartElement.style.display = 'block';
  }, 500);
}

// Eventos de mouse y touch
coverElement.addEventListener('mousedown', startDrag);
coverElement.addEventListener('mousemove', onDrag);
coverElement.addEventListener('mouseup', stopDrag);

coverElement.addEventListener('touchstart', startDrag);
coverElement.addEventListener('touchmove', onDrag);
coverElement.addEventListener('touchend', stopDrag);

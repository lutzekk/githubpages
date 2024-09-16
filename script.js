const coverElement = document.querySelector('.cover');
const paperElement = document.querySelector('.paper');
const heartElement = document.querySelector('.heart');

// Función para abrir la carta al hacer clic
coverElement.addEventListener('click', () => {
  coverElement.classList.add('open-cover');
  
  setTimeout(() => {
    coverElement.style.zIndex = -1;
    paperElement.classList.remove('close-paper');
    paperElement.classList.add('open-paper');
    heartElement.style.display = 'block';
  }, 500);
});

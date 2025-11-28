const container = document.getElementById('sliderContainer');
const thumb = document.getElementById('sliderThumb');
const valueDisplay = document.getElementById('valueDisplay');

const minValue = 1;
const maxValue = 5;
const steps = maxValue - minValue + 1;

const topPadding = thumb.clientHeight;
const containerHeight = container.offsetHeight - topPadding;
const stepSize = containerHeight / (steps - 1);
let selectedTexture = "none";
let isDragging = false;
let step = 3;
function setThumbPosition(step) {
  const relativeStep = step - minValue;
  const y = containerHeight - relativeStep * stepSize - thumb.offsetHeight / 2;
  thumb.style.top = `${y + topPadding / 2}px`;
  valueDisplay.textContent = `Товщина: ${step} мм`;
  updatePlateImage(selectedTexture, step);
}

let currentStep = 3;
setThumbPosition(currentStep);

function handleMove(clientY) {
  const rect = container.getBoundingClientRect();
  let offsetY = clientY - rect.top;
  offsetY = Math.max(0, Math.min(containerHeight, offsetY));

  const relativeStep = Math.round((containerHeight - offsetY) / stepSize);
  step = relativeStep + minValue;

  if (step !== currentStep && step >= minValue && step <= maxValue) {
    currentStep = step;
    setThumbPosition(step);
  }
}

thumb.addEventListener('mousedown', (e) => {
  isDragging = true;
  e.preventDefault();
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    handleMove(e.clientY);
  }
});

// Для сенсорних екранів
thumb.addEventListener('touchstart', (e) => {
  isDragging = true;
  e.preventDefault();
}, { passive: false });

document.addEventListener('touchend', () => {
  isDragging = false;
});

document.addEventListener('touchmove', (e) => {
  if (isDragging) {
    handleMove(e.touches[0].clientY);
  }
}, { passive: false });



const textureButtons = document.querySelectorAll('.texture-btn');

textureButtons[0].classList.add('selected');

textureButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    textureButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedTexture = btn.dataset.texture;
    updatePlateImage(selectedTexture, currentStep);
    // Дія при виборі текстури:
    console.log('Обрана текстура:', selectedTexture);
    // applyTexture(selectedTexture); // приклад
  });
});
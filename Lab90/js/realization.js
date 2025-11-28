//Ініціалізація світлоіндікаторів

const ledPower = document.getElementById("led-power");
const ledAlpha = document.getElementById("led-alpha");
const ledBeta = document.getElementById("led-beta");
const ledCount = document.getElementById("led-count");
const btnPower = document.getElementById("btn-power");

let onOffState = false;
// об'єкт семисегментного дисплея (beta випромінювань)

const sevenSegmentDisplay = (displayElement) => {
  let updateTimeoutId = null;
  let valShown = 0;          // Те, що бачить користувач на дисплеї
  let valStep = 0;
  let running = false;

  let durationSec = 180;
  const absorptionCoefficients = {
    none: 0,
    iron: 0.13,
    lead: 0.19
  };

  const getRandomDelay = () => {
    const min = 500; // Середній інтервал оновлення дисплея (мс)
    const max = 1200;
    return Math.floor((Math.random() * (max - min) + min));
  };

  const updateDisplayRandomly = () => {
    if (!running) return;
    print(displayElement, String(valShown));
    updateTimeoutId = setTimeout(updateDisplayRandomly, getRandomDelay());
  };

  const linearTick = () => {
    if (!running) return;
    valShown += valStep;
    setTimeout(linearTick, 1000);
  };

  const start = () => {
    stop();

    valShown = 0;
    running = true;
    let j;
    let fluctuation;

    if (selectedTexture === "none") {
      fluctuation = 5;
      j = 85 * 3;
    } else {
      fluctuation = 10;
      const k = absorptionCoefficients[selectedTexture] ?? 0;
      j = 8000 * Math.exp(-k * step);
    }

    const expected = Math.round(j + (Math.random() * fluctuation * 2 - fluctuation));
    valStep = expected / durationSec;


    console.log({
      "обраховане": j,
      "очікуване": expected,
      "матеріал": selectedTexture,
      "товщина": step,
      "valStep": valStep
    });

    updateDisplayRandomly();
    setTimeout(() => {
      linearTick();
    }, 1000);
  };

  const stop = () => {
    if (updateTimeoutId) {
      clearTimeout(updateTimeoutId);
      updateTimeoutId = null;

      if (running) {
        print(displayElement, String(valShown));
        running = false;
      } else {
        reset();
      }
    } else {
      reset();
    }
  };

  const reset = () => {
    running = false;
    valShown = 0;
    print(displayElement, "0000");
  };

  const print = (display, text, length = 4) => {

    if (!display) return;

    if (!onOffState) {
      const digits = display.querySelectorAll('.digit-text');
      digits.forEach(d => d.textContent = " ");
      return;
    }
    text = text.split(".")[0];
    text = (text.length > 4) ? "9999" : text;

    const digits = display.querySelectorAll('.digit-text');
    const paddedText = text.padStart(length, '0');

    paddedText.split('').forEach((char, index) => {
      if (digits[index]) {
        digits[index].textContent = char;
      }
    });
  };

  return { start, stop, reset, print };
};

// об'єкт дисплея секундоміра

const stopWatch = (displayElement, soundElement) => {
  let seconds = 0;
  let setIntervalId = null;

  const update = () => {
    const secs =(onOffState)? String(seconds).padStart(4, '0'):"";
    
    displayElement.textContent = secs;
  };

  const tick = () => {
    seconds++;
    update();
    if (soundElement) {
      soundElement.currentTime = 0;
      soundElement.play();
    }
  };

  const start = () => {
    clearInterval(setIntervalId);
    running = true;
    seconds = 0;
    ledCount.classList.add("active");
    update();
    setIntervalId = setInterval(tick, 1000);
  };

  const stop = () => {
    ledCount.classList.remove("active");
    if (setIntervalId) {
      clearInterval(setIntervalId);
      setIntervalId = null;
    } else {
      reset();
    }
  };

  const reset = () => {
    clearInterval(setIntervalId);
    running = false;
    seconds = 0;
    update();
  };

  return { start, stop };
};

const updateFontSize = () => {
  const display = document.getElementById('betaDisplay');
  const displayWidth = display.offsetWidth; // Отримуємо ширину контейнера
  const fontSize = displayWidth * 0.35; // Наприклад, 15% від ширини елемента
  document.documentElement.style.setProperty('--digit-font-size', `${fontSize}px`);
}

window.addEventListener('resize', updateFontSize);
window.addEventListener('load', updateFontSize);

//Ініціалізація дисплея beta випромінювань

const betaDisplayElement = document.getElementById("betaDisplay");
const betaDisplay = sevenSegmentDisplay(betaDisplayElement);

//*****/

//Ініціалізація дисплея секундоміра

const stopwatchDisplayElement = document.querySelector('#stopwatchDisplay p');
const tickSound = document.getElementById('tick-sound');
const stopWatchDisplay = stopWatch(stopwatchDisplayElement, tickSound);

//*****/

//Ініціалізація кнопок стоп/пуск

document.querySelectorAll('.umf-button').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'start') {
      if (onOffState) {
        betaDisplay.start();
        stopWatchDisplay.start();
      }
    } else if (action === 'stop') {
      betaDisplay.stop();
      stopWatchDisplay.stop();
    }
  });
});

//*****/




btnPower.addEventListener("click", () => {
  onOffState = !onOffState;
  if (onOffState) {
    ledPower.classList.add("active");
    ledBeta.classList.add("active");
  } else {
    ledPower.classList.remove("active");
    ledBeta.classList.remove("active");
  }
  betaDisplay.stop();
  stopWatchDisplay.stop();
  betaDisplay.print(betaDisplayElement, "");
  stopWatchDisplay.stop();
});

// betaDisplay.print(betaDisplayElement, "");
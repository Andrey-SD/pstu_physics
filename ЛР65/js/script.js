let isOn = false;
let isModal1Shown = false;
let isModal2Shown = false;
let filter;
let Lcoeff = 0.4;
let Mcoeff = 8960;
let frequency;
const onOffButton = document.querySelector('.slider-btn, .button.slider');
const image = document.querySelector('.slider-img');
const rangeInput = document.querySelector('.range');

// Получаем ссылку на элементы изображения и кнопки
const stringButton = document.querySelector('.button-string, .string-btn');
// Получаем ссылку на элемент <img> с классом "string"
const stringImage = document.querySelector('.modal2 .string');

// обработчик для переменных material и long
$(document).ready(function() {
  
  let previousSelectOptionMaterial;
  $(".material").on("change", function () {
    if (isOn) {
      alert("Спочатку вимкніть прилад");
      $(this).val(previousSelectOptionMaterial);
    } else {
      const value = $(this).val();

      switch (value) {
        default:
        case "мідь":
          Mcoeff = 8960;
          break;
        case "срібло":
          Mcoeff = 10490;
          break;
        case "сталь":
          Mcoeff = 7860;
          break;
      }

      console.log("Коэффициент:", Mcoeff);

      // Далее можно использовать переменную "coeff" для нужных действий
    }
  });
  
  let previousSelectOptionLong;
  $(".long").on("change", function () {
    if (isOn) {
      alert("Спочатку вимкніть прилад");
      $(this).val(previousSelectOptionLong);
    } else {  
      const value = $(this).val();

      switch (value) {
        default:
        case "0.4":
          Lcoeff = 0.4;
          break;
        case "0.5":
          Lcoeff = 0.5;
          break;
        case "0.6":
          Lcoeff = 0.6;
          break;
      }

      console.log("Коэффициент для long:", Lcoeff);

      // Далее можно использовать переменную "longCoeff" для нужных действий
    }
  });
});


// меняет название кнопки включения
$(".slider-btn, .button.slider").on("click", function() {
  toggleSlider();
  toggleStringImage();
});

function toggleSlider() {
  if (isOn) {
    image.src = "./img/modif-off-transp2.png";
    onOffButton.innerHTML = "Увімкнути пристрій";
    document.getElementById("ampvalue").innerHTML = "000.0";
    document.getElementById("ampvalue").style.color = "rgb(101, 143, 101)";
  } else {
    image.src = "./img/modif-on-transp2-00.png";
    onOffButton.innerHTML = "Вимикнути пристрій";
    frequency = document.getElementById("ampvalue").textContent;
    document.getElementById("ampvalue").style.color = "rgb(0, 255, 0)";
    frequencyIndex = 0; // Сбрасываем индекс частоты до 0
    changeFrequency(); // Вызываем функцию для обновления частоты
  }
  isOn = !isOn;
}

// Функция для обновления значения частоты и вывода в консоль
function changeFrequency() {
  frequency = document.getElementById("ampvalue").textContent;
  console.log('Выбранная частота: ' + parseFloat(frequency));
}

// Обновление значения частоты при изменении ползунка
function updateAmpValue(value) {
  var roundedValue = parseFloat(value).toFixed(1).toString().padStart(5, '0');
  if (!isOn) {
    roundedValue = "000.0";
  }
  document.getElementById("ampvalue").textContent = roundedValue;
}

// Получение элемента ползунка
var bar = document.getElementById("oms");

// Обработчик события при изменении ползунка
bar.addEventListener("input", function() {
  if (isOn) {
    updateAmpValue(this.value);
    changeFrequency();
    toggleStringImage();
  }
});

// Индекс текущей частоты
let frequencyIndex = 0;

let newFrequency;
let imagePath;

rangeInput.addEventListener('input', () => {
  const tensionValue = rangeInput.value;
  console.log('Выбранное значение: ' + tensionValue);
  
  newFrequency = parseFloat(((4702.8 / Lcoeff) * Math.sqrt(tensionValue / Mcoeff)).toFixed(1));
  console.log("Новая частота:", newFrequency);

});

//-----------------------------------------------------------------------

stringButton.addEventListener('click', () => {
  toggleStringImage();
});

function toggleStringImage() {
  
  if (!isOn) {
    imagePath = 'string-off.png';
  } else if ((newFrequency - 0.5) <= frequency && frequency <= (newFrequency + 0.5)) {
    imagePath = 'string-on-1.png';
  } else if (newFrequency - 0.5 <= frequency) {
    imagePath = 'string-on-0.png';
  } else if (frequency <= newFrequency + 0.5) {
    imagePath = 'string-on-0.png';
  } else {
    imagePath = 'string-on-0.png';
  }

  // Обновляем атрибут src изображения
  stringImage.src = `./img/${imagePath}`;

  // Здесь вы можете использовать переменную imagePath для обновления изображения
  console.log('Путь к изображению:', imagePath);
}

// кнопка силы натяжения
$(".close-btn1, .button-ruler, .ruler-btn").on("click", toggleModal1);

function toggleModal1() {
         $(".scaleRange").val(0);
         $(".scale").css("margin-right", "0%");

         if (!isOn) {
           alert("Спочатку увімкніть прилад");
           return;
         }

    if (isModal1Shown) {
        $(".modal1").css("display", "none");
    } else {
        $(".modal1").css("display", "flex");
    }
    isModal1Shown = !isModal1Shown;
}

$(".modal1").on("click", function (e) {
    if (e.target !== e.currentTarget) {
        return;
    }
    toggleModal1();
});


// кнопка посмотреть на струну
$(".close-btn2, .button-string, .string-btn").on("click", toggleModal2);

function toggleModal2() {

    if (isModal2Shown) {
        $(".modal2").css("display", "none");
    } else {
        $(".modal2").css("display", "flex");
    }
    isModal2Shown = !isModal2Shown;
}

$(".modal2").on("click", function (e) {
    if (e.target !== e.currentTarget) {
        return;
    }

    toggleModal2();
});
let isOn = false;
let isModalShown = false;
let previousSelectOption = "null";
const filter = $(".filter-img");

$(".filter").on("change", function () {
  /*if (isOn) {
    alert("Сначала выключите установку");
    $(this).val(previousSelectOption);
  }*/

  const value = $(this).val();
  const index = $(".range").val();
  previousSelectOption = value;
  let coeff = 1;

  switch (value) {
    default:
    case "white":
      coeff = 1;
      break;
    case "blue":
      coeff = 1.111;
      break;
    case "green":
      coeff = 1.39;
      break;
    case "red":
      coeff = 1.722;
      break;
  }

  if (value === "white") {
    filter.prop("src", `../img/interference-${index}.jpg`);
  } else if (value == null) {
    return;
  } else {
    filter.prop("src", `../img/interference-${index}-${value}.png`);
  }
  filter.css("transform", "scaleX(" + coeff + ")");
});

$(".range").on("input", function () {
  const value = $(this).val();
  const color = $(".filter").val();

  let coeff = 1; //0.9 1 1.25 1.55
  //1 1.111 1.390 1.722
  console.log(color);
  switch (color) {
    case "white":
      coeff = 1;
      break;
    case "blue":
      coeff = 1.111;
      break;
    case "green":
      coeff = 1.39;
      break;
    case "red":
      coeff = 1.722;
      break;
    default:
      break;
  }

  if (color == "white") {
    filter.prop("src", `../img/interference-${value}.jpg`);
  } else if (color == null) {
    return;
  } else {
    filter.prop("src", `../img/interference-${value}-${color}.png`);
  }
  filter.css("transform", `scaleX(${coeff})`);
});

$(".slider-btn, .button.slider").on("click", toggleSlider);

function toggleSlider() {
  if (isOn) {
    $(".slider-img").prop("src", "../img/slider-modif-transp.png");
    filter.css("opacity", 0);
    $(".button.slider").html("Включить установку");
  } else {
    $(".slider-img").prop("src", "../img/slider-modif-on-transp.png");
    filter.css("opacity", 1);
    $(".button.slider").html("Выключить установку");
  }
  isOn = !isOn;
}

$(".close-btn, .button-ocular, .ocular-btn").on("click", toggleModal);

function toggleModal() {
  /*$(".scaleRange").val(0);
  $(".scale").css("margin-right", "0%");

  if (!isOn) {
    alert("Сначала включите установку");
    return;
  }
  if ($(".filter").val() == null) {
    alert("Сначала выберите фильтр");
    return;
  }*/

  if (isModalShown) {
    $(".modal").css("display", "none");
  } else {
    $(".modal").css("display", "flex");
  }
  isModalShown = !isModalShown;
}

$(".scaleRange").on("input", function (e) {
  const percentage = parseInt($(this).val());

  $(".scale").css("margin-left", percentage + "%");
});

$(".modal").on("click", function (e) {
  if (e.target !== e.currentTarget) {
    return;
  }

  toggleModal();
});

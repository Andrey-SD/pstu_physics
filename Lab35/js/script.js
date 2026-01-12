let isOn = false;
let yik;
let x;
const image = document.querySelector('.slider-img');

$(".slider-btn, .button.slider").on("click", function() {
  toggleSlider();
});

$(".anod-btn").on("click", function() {
  btn_anod();
  yg();
});

$(".footer-info").on("click", function() {
  author();
});
function author() {
	alert( "Про автора:" + "\n"
		+ "Віртуальну лабораторну роботу розробив" + "\n"
		+ "студент групи КН-21 Зінзіков А.Р" + "\n"
		+ "Науковий керівник проєкту - Цветкова Олена Валентинівна.");
}


function toggleSlider() {
  if (isOn) {
    image.src = "./images/main--off.png";
    document.getElementById("p1_value").innerHTML = "00.00";
    document.getElementById("p1_value").style.color = "rgb(45, 55, 45)";
	
	document.getElementById("p2_value").innerHTML = "00.00";
    document.getElementById("p2_value").style.color = "rgb(45, 55, 45)";
	
	document.getElementById("Bvalue").innerHTML = "0.0";
	document.getElementById("Bvalue").style.color = "rgb(73, 52, 30)";
	
  } else {
    image.src = "./images/main-on-60.png";
	document.getElementById("Bvalue").innerHTML = "60.0";
	document.getElementById("Bvalue").style.color = "rgb(191, 99, 0)";
	
    document.getElementById("p1_value").style.color = "rgb(0, 255, 0)";
	document.getElementById("p2_value").style.color = "rgb(0, 255, 0)";
	yg();
  }
  isOn = !isOn;
}

function btn_anod() {
  if (isOn) {
	  if (document.getElementById("Bvalue").innerHTML == "60.0") {
		  document.getElementById("Bvalue").innerHTML = "70.0";
		  image.src = "./images/main-on-70.png";
	  } else if (document.getElementById("Bvalue").innerHTML == "70.0") {
		  document.getElementById("Bvalue").innerHTML = "80.0";
		  image.src = "./images/main-on-80.png";
	  } else {
		 document.getElementById("Bvalue").innerHTML = "60.0"; 
		 image.src = "./images/main-on-60.png";
	  }
  } else {
	alert("Спочатку включіть установку!");
  }
}

function yg() {
  if (document.getElementById("Bvalue").innerHTML == "60.0") {
	  
	      x = document.getElementById("p1_value").innerHTML;
		  yik = -331.96 * Math.pow(x, 6) + 321.28 * Math.pow(x, 5) - 100.42 * Math.pow(x, 4) +
		  10.797 * Math.pow(x, 3) - 0.465 * Math.pow(x, 2) - 0.0177*x + 0.032;
		  var value = parseFloat(yik).toFixed(3).toString();
		  if (Math.sign(value) == -1) {
			  document.getElementById("p2_value").innerHTML = "0.001";
		  } else {
	      document.getElementById("p2_value").innerHTML = value;
		  }
		 
		 
		  
	  } else if (document.getElementById("Bvalue").innerHTML == "70.0") {
		  
		  x = document.getElementById("p1_value").innerHTML;
		  yik = -472.7 * Math.pow(x, 6) + 488.51 * Math.pow(x, 5) - 173.07 * Math.pow(x, 4) +
		  25.074 * Math.pow(x, 3) - 1.8201 * Math.pow(x, 2) + 0.0272 * x + 0.041;
		  
		  var value = parseFloat(yik).toFixed(3).toString();
		  
		  
		  if (Math.sign(value) == -1) {
			  document.getElementById("p2_value").innerHTML = "0.001";
		  } else {
	      document.getElementById("p2_value").innerHTML = value;
		  }
		 
		  
	  } else if (document.getElementById("Bvalue").innerHTML == "80.0") {
		  
		 
		 x = document.getElementById("p1_value").innerHTML;
		 
		 yik = -736.54 * Math.pow(x, 6) + 785.52 * Math.pow(x, 5) - 289.6 * Math.pow(x, 4) +
	     43.142 * Math.pow(x, 3) - 2.6969 * Math.pow(x, 2) + 0.0278 * x + 0.048;
	     var value = parseFloat(yik).toFixed(3).toString();
		 
		 if (Math.sign(value) == -1) {
			  document.getElementById("p2_value").innerHTML = "0.001";
		  } else {
	      document.getElementById("p2_value").innerHTML = value;
		  }
		
	  }
}

// зміна значень при русі повзунка
function update_p1value(value) {
  var roundedValue = parseFloat(value).toFixed(2).toString().padStart(5, '0');
  if (!isOn) {
    roundedValue = "00.00";
  }
  document.getElementById("p1_value").textContent = roundedValue;
  yg();
}


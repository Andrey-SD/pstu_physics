$(".material").on("change", function() {
  const selectedValue = $(this).val();
  $(this).css("width", selectedValue.length + 3 + "ch");
});

$(".long").on("change", function() {
  const selectedValue = $(this).val();
  $(this).css("width", selectedValue.length + 5 + "ch");
});

window.addEventListener('resize', function() {
  var sliderImgWidth = document.querySelector('.scoreboard').offsetWidth;
  var amperageValueBlock = document.querySelector('.amperage-value-block');
  var amperageRangeBlock = document.querySelector('.amperage-range-block');

  var initialHeight = amperageValueBlock.offsetHeight;
  var rangeBlockHeight = amperageRangeBlock.offsetHeight;
  var scaleRatio = sliderImgWidth / 104;

  amperageValueBlock.style.width = '100%';
  amperageValueBlock.style.transform = 'scale(' + scaleRatio + ')';
  amperageValueBlock.style.transformOrigin = 'top left';
  amperageValueBlock.style.height = initialHeight * scaleRatio + 'px';

});
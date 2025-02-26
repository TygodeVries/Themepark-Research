
const slider = document.getElementById('eftelingSlider');
const sliderValue = document.getElementById('sliderValue');

slider.oninput = function() {
    sliderValue.textContent = this.value;
};
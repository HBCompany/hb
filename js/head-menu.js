filterSelection("animals");
function filterSelection(c) {
  let x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c === "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}


let btnContainer = document.getElementById("myBtnContainer");
let btns = btnContainer.getElementsByClassName("btn");
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(){
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,5000);


var next = document.getElementById('next');
var previous = document.getElementById('previous');

next.onclick = function() {
  pauseSlideshow();
  nextSlide();
};
previous.onclick = function() {
  pauseSlideshow();
  previousSlide();
};

function nextSlide() {
  goToSlide(currentSlide+1);
}

function previousSlide() {
  goToSlide(currentSlide-1);
}

function goToSlide(n) {
  slides[currentSlide].className = 'slide';
  currentSlide = (n+slides.length)%slides.length;
  slides[currentSlide].className = 'slide showing';
}

function getPosition(element) {
  var xPosition = 0;
  var yPosition = 0;

  while (element) {
      xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
      yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
      element = element.offsetParent;
  }

  return { x: window.scrollX, y: window.scrollY };
}

var hiddenDiv = document.getElementById("hiddenDiv");
var hiddenDiv2 = document.getElementById("hiddenDiv2");
hiddenDiv.style.top = "120vh";
hiddenDiv2.style.top = "120vh";

document.addEventListener("DOMContentLoaded", function() {
  function autoResize() {
    var mobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    var styleElement = document.getElementById("style-link");
  
    var newStyleElement = document.createElement("link");
    newStyleElement.rel = "stylesheet";
    newStyleElement.type = "text/css";
    newStyleElement.id = "style-link";

    if (mobile) {
      newStyleElement.href = "styles_mobile.css";
      styleElement.parentNode.replaceChild(newStyleElement, styleElement);
    }
    else {
      if (960 <= window.innerWidth) {
        var paragraphs = document.querySelectorAll("p");
  
        paragraphs.forEach(function(paragraph) {
            paragraph.style.fontSize = "1.5rem";
        });
  
  
        document.getElementById("title").style.fontSize = "3rem";
        document.getElementById("infos").style.fontSize = "1.2rem";
  
        var buttons = document.querySelectorAll("a");
  
        buttons.forEach(function(button) {
            button.style.fontSize = "1.5rem";
        });
  
        document.querySelector(".card").style.width = "300px";
        document.querySelector(".card").style.height = "300px";
        document.querySelector(".card").style.top = "40%";
        document.querySelector(".card").style.left = "50%";
      } else {
        var paragraphs = document.querySelectorAll("p");
  
        paragraphs.forEach(function(paragraph) {
            paragraph.style.fontSize = "1rem";
        });
  
  
        document.getElementById("title").style.fontSize = "2rem";
        document.getElementById("infos").style.fontSize = "0.85rem";
  
        var buttons = document.querySelectorAll("a");
  
        buttons.forEach(function(button) {
            button.style.fontSize = "1rem";
        });
  
        document.querySelector(".card").style.width = "200px";
        document.querySelector(".card").style.height = "200px";
        document.querySelector(".card").style.top = "50%";
        document.querySelector(".card").style.left = "60%";
      }
    }
  }
  
  window.addEventListener("load", autoResize);
  window.addEventListener("resize", autoResize);

  var titleElement = document.getElementById("title");
  var myDiv = document.getElementById("leftDiv");
  var button = document.getElementById("ap");
  var hiddenDiv = document.getElementById("hiddenDiv");
  var hiddenDiv2 = document.getElementById("hiddenDiv2");
  var rightDiv = document.getElementById("rightDiv");
  var leftX = getPosition(myDiv).x;
  var rightX = getPosition(rightDiv).x;

  button.addEventListener("click", function() {
    if (button.innerText === "Accueil") {
      myDiv.style.left = leftX+"px";
      rightDiv.style.left = rightX+"px";
      hiddenDiv.style.top = '120vh';
      hiddenDiv2.style.top = '120vh';
      button.innerText = "A propos de moi";
      titleElement.innerText = "\u2728Portfolio de Joris\u2728\u{1F5FF}";
  
    }
    else {
      /*myDiv.style.left = -(myDiv.offsetLeft + myDiv.offsetWidth)+"px";
      hiddenDiv.style.top = -4*(myDiv.offsetWidth+myDiv.offsetHeight)/7+"px";
      hiddenDiv2.style.top = -4*(myDiv.offsetWidth+myDiv.offsetHeight)/7+"px";
      rightDiv.style.left = rightDiv.offsetWidth+"px";*/
      myDiv.style.left = "-50vw";
      rightDiv.style.left = "110vw";
      hiddenDiv.style.top = "-90vh";
      hiddenDiv2.style.top = "-90vh";
      button.innerText = "Accueil";
      titleElement.innerText = "\u{1F393} Mon parcours \u{1F393}\u{1F5FF}";
    }
  });
});
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
hiddenDiv.style.top = "1000px";
hiddenDiv2.style.top = "1000px";

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM chargé");
  var titleElement = document.getElementById("title");
  var apElement = document.getElementById("ap");
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
      hiddenDiv.style.top = '1000px';
      hiddenDiv2.style.top = '1000px';
      button.innerText = "A propos de moi";
      titleElement.innerText = "\u2728Portfolio de Joris\u2728\u{1F5FF}";
  
    }
    else {
      myDiv.style.left = -(myDiv.offsetLeft + myDiv.offsetWidth)+"px";
      hiddenDiv.style.top = -4*(myDiv.offsetWidth+myDiv.offsetHeight)/7+"px";
      hiddenDiv2.style.top = -4*(myDiv.offsetWidth+myDiv.offsetHeight)/7+"px";
      rightDiv.style.left = rightDiv.offsetWidth+"px";
      button.innerText = "Accueil";
      titleElement.innerText = "\u{1F393} Mon parcours \u{1F393}";
    }
  });
});
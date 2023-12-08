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

            var buttons = document.querySelectorAll("a");
    
            buttons.forEach(function(button) {
                button.style.fontSize = "1.5rem";
            });
            document.getElementById("title").style.fontSize = "3rem";
            document.getElementById("container").style.width = "30%";
            document.querySelector(".imgLeft").style.height = "33vh";
            document.querySelector(".imgRight").style.height = "33vh";
          }
          else {
            var paragraphs = document.querySelectorAll("p");
    
            paragraphs.forEach(function(paragraph) {
                paragraph.style.fontSize = "1rem";
            });

            var buttons = document.querySelectorAll("a");
  
            buttons.forEach(function(button) {
                button.style.fontSize = "1rem";
            });
            document.getElementById("title").style.fontSize = "2rem";
            document.getElementById("container").style.width = "inherit";
            document.querySelector(".imgLeft").style.height = "20vh";
            document.querySelector(".imgRight").style.height = "20vh";
          }
        }
      }
      
      window.addEventListener("load", autoResize);
      window.addEventListener("resize", autoResize);
});
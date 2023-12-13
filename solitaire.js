function shuffleList(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
}

var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var cards = [];
values.forEach(function(elt, id) {
  cards.push("diamond"+elt);
  cards.push("heart"+elt);
  cards.push("spade"+elt);
  cards.push("club"+elt);
});

for(let i = 0; i<50; i++) shuffleList(cards);

var zIndexCounter = 1;
var columns = [[], [], [], [], [], [], []];
var lastDraw = "";

function backcardMode(element) {
  element.className = "backcard";
  for(let i=0; i<3; i++) {
    element.children[i].style.display = "none";
  }
}

function frontcardMode(element) {
  element.className = "draggable";
  for(let i=0; i<3; i++) {
    element.children[i].style.display = "";
  }
}

var isDragging = false;
var draggedElement = null;
var offsetX, offsetY;
var subcard = [];
var dstack = [];
var hstack = [];
var sstack = [];
var cstack = [];
var x, y;

var moves = [];

function cancelMove() {
  var move = moves.pop();
  var lefts = ["12vw", "23vw", "34vw", "45vw", "56vw", "67vw", "78vw"];
  if (move.to == 7) {
    var card = document.getElementById(move.moved[0]);
    card.style.transition = "top 0.3s ease, left 0.3s ease";
    card.style.transform = "none";
    if (move.from == -1) {
      card.style.left = "0.5vw";
      card.style.top = "20vw";
      cards.push(move.moved[0]);
    }
    else {
      card.style.left = lefts[move.from];
      card.style.top = finalPosTop(move.from);
      if (move.flipped) {
        backcardMode(document.getElementById(columns[move.from].at(-1)));
      }
      columns[move.from].push(move.moved[0]);
    }
  }
  else {
    if (move.from == -1) {
      var card = document.getElementById(move.moved[0]);
      card.style.transition = "top 0.3s ease, left 0.3s ease";
      card.style.left = "0.5vw";
      card.style.top = "20vw";
      cards.push(move.moved[0]);
    }
    else if (move.from == 7) {
      var card = document.getElementById(move.moved[0]);
      card.style.transition = "top 0.3s ease, left 0.3s ease";
      var finalTop;
      card.style.zIndex = valueNcolor(card.id).value;
      if (card.id[0] == "d") {
        finalTop = "-4vh";
        dstack.push(card.id);
      }
      else if (card.id[0] == "h") {
        finalTop = "20.55vh";
        hstack.push(card.id);
      }
      else if (card.id[0] == "s") {
        finalTop = "45.55vh";
        sstack.push(card.id);
      }
      else {
        finalTop = "70.55vh";
        cstack.push(card.id);
      }
      card.style.transform = "rotate(-90deg)";
      card.style.top = finalTop;
      card.style.left = "95vw";
      columns[move.to].pop();
    }
    else {
      for(let i = 0; i<move.moved.length; i++) columns[move.to].pop();
      var finalLeft = lefts[move.from];
      var finalTop = finalPosTop(move.from);
      move.moved.forEach(function(elt, id) {
        document.getElementById(elt).style.transition = "top 0.3s ease, left 0.3s ease";
        document.getElementById(elt).style.left = finalLeft;
        document.getElementById(elt).style.top = parseInt(finalTop)+3.25*id + "vw";
        columns[move.from].push(elt);
      })
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("diamondstack").style.top = "-5vh";
    document.getElementById("diamondstack").style.left = "95vw";
    document.getElementById("heartstack").style.top = "20vh";
    document.getElementById("heartstack").style.left = "95vw";
    document.getElementById("spadestack").style.top = "45vh";
    document.getElementById("spadestack").style.left = "95vw";
    document.getElementById("clubstack").style.top = "70vh";
    document.getElementById("clubstack").style.left = "95vw";

    function createCard(color, value) {
      var card = document.createElement("div");
      card.id = color+value; 
      card.className = "draggable";
      var toptext = document.createElement("p");
      toptext.innerText = value;
      toptext.className = (color == "diamond" || color == "heart") ? "topred" : "topblack";
      var bottext = document.createElement("p");
      bottext.innerText = value;
      bottext.className = (color == "diamond" || color == "heart") ? "endred" : "endblack";
      var suit = document.createElement("img");
      suit.src = color+".svg";
      suit.className = "suit";
      card.appendChild(toptext);
      card.appendChild(bottext);
      card.appendChild(suit);

      return card;
    }

    values.forEach(function(elt, id) {
      document.getElementById("body").appendChild(createCard("diamond", elt));
      document.getElementById("body").appendChild(createCard("heart", elt));
      document.getElementById("body").appendChild(createCard("club", elt));
      document.getElementById("body").appendChild(createCard("spade", elt));
    });

    var lefts = ["12vw", "23vw", "34vw", "45vw", "56vw", "67vw", "78vw"];

    for(let i=0; i<7; i++) {
      for(let j=0; j<i; j++) {
        var card = document.getElementById(cards.pop());
        card.style.left = lefts[i];
        card.style.top = finalPosTop(i)+"vw";
        card.style.zIndex = j;
        backcardMode(card);
        columns[i].push(card.id);
      }
      var card = document.getElementById(cards.pop());
      card.style.left = lefts[i];
      card.style.top = finalPosTop(i)+"vw";
      card.style.zIndex = i;
      columns[i].push(card.id);
    }

    var back = document.createElement("button");
    back.className = "backcard";
    back.innerText = "Cartes restantes :\n" + cards.length;
    back.addEventListener("click", function() {
        if (cards.length == 1) {
          back.innerText = "Dernière carte";
          back.disabled = true;
        }
  
        else {
          var firstID = cards.at(-1);
          if (firstID == lastDraw) {
            cards.unshift(cards.pop());
            firstID = cards.at(-2);
          }
          lastDraw = firstID;
          var first = document.getElementById(firstID);
          first.style.top = "20vw";
          first.style.left = "0.5vw";
          first.style.zIndex = zIndexCounter++;
          back.innerText = cards.length;
        }
    });
    document.getElementById("body").appendChild(back);
    document.getElementById("reload").addEventListener("click", function() {location.reload()});
    document.getElementById("cancel").addEventListener("click", function() {cancelMove()});
});

document.addEventListener("mousedown", function(e) {
    if (e.target.className == "draggable") {
      isDragging = true;
      draggedElement = e.target;
      offsetX = e.clientX - draggedElement.getBoundingClientRect().left;
      offsetY = e.clientY - draggedElement.getBoundingClientRect().top;
      var c = getColumn(draggedElement.style.left);
      x = draggedElement.style.left;
      y = draggedElement.style.top;
      if (c >= 0) {
        var index = columns[c].indexOf(draggedElement.id);
        var n = columns[c].length;
        for (let i = index; i<n; i++) {
          subcard.push(columns[c][index]);
          columns[c].splice(index, 1);
        }
      }
      else {
        subcard.push(draggedElement.id);
      }
    }
});

document.addEventListener("mousemove", function(e) {
    if (isDragging && draggedElement) {
      var x = e.clientX - offsetX;
      var y = e.clientY - offsetY;

      draggedElement.style.transition = "none";
      for(let i = 0; i < subcard.length; i++) {
        document.getElementById(subcard[i]).style.transition = "none";
        document.getElementById(subcard[i]).style.left = x + "px";
        document.getElementById(subcard[i]).style.top = y+60*i + "px";
      }
    }
});

function getPixels(percent) {
  return percent*window.innerWidth/100;
}

function finalPosLeft(left) {
  var center = (parseInt(left)+5)*100/window.innerWidth;
  if (center <= 12) return 0.5;
  else if (center <= 23) return 12;
  else if (center <= 34) return 23;
  else if (center <= 45) return 34;
  else if (center <= 56) return 45;
  else if (center <= 67) return 56;
  else if (center <= 78) return 67;
  else if (center <= 89) return 78;
  else return 89;
};

function finalPosTop(column) {
  return 1+3.25*columns[column].length;
}

function valueNcolor(id) {
  var value = 0;
  var color = "";

  if (id.at(-1) == "A") value = 1;
  else if (id.at(-1) == "0") value = 10;
  else if (id.at(-1) == "J") value = 11;
  else if (id.at(-1) == "Q") value = 12;
  else if (id.at(-1) == "K") value = 13;
  else value = parseInt(id.at(-1));

  if (id[0] == "d" || id[0] == "h") color = "red";
  else color = "black";

  return { color: color, value: value};
}

function canDrop(dragged, last) {
  var vncd = valueNcolor(dragged);
  var vncl = valueNcolor(last);
  return (vncd.color != vncl.color) && (vncd.value == vncl.value-1);
}

function getColumn(left) {
  var lefts = ["12vw", "23vw", "34vw", "45vw", "56vw", "67vw", "78vw"];
  if (left == "0.5vw") {
    return -1;
  }
  return lefts.indexOf(left);
}

document.addEventListener("mouseup", function() {
    if (isDragging && draggedElement) {
      isDragging = false;

      var finalLeft = finalPosLeft(draggedElement.style.left)+"vw";
      var finalTop;
      
      if (finalLeft == "0.5vw") { // Move on the leftest column : no effect
        finalLeft = x;
        finalTop = y;
        for(let i = 0; i < subcard.length; i++) {
          document.getElementById(subcard[i]).style.transition = "top 0.3s ease, left 0.3s ease";
          document.getElementById(subcard[i]).style.left = finalLeft;
          document.getElementById(subcard[i]).style.top = parseInt(finalTop)+3.25*i + "vw";
        }
      }

      else if (finalLeft == "89vw") {
        // Move on the rightest column : pack the card if it's alone and right value&color
        // Otherwise, replace it or them on their column
        finalLeft = x;
        finalTop = y;
        if (subcard.length == 1) {
          var k = valueNcolor(draggedElement.id).value;
          var l;
          if (draggedElement.id[0] == "d") l = dstack.at(-1) ? valueNcolor(dstack.at(-1)).value : 0;
          else if (draggedElement.id[0] == "h") l = hstack.at(-1) ? valueNcolor(hstack.at(-1)).value : 0;
          else if (draggedElement.id[0] == "s") l = sstack.at(-1) ? valueNcolor(sstack.at(-1)).value : 0;
          else l = cstack.at(-1) ? valueNcolor(cstack.at(-1)).value : 0;

          if (k === l+1) {
            finalLeft = "95vw";
            draggedElement.style.zIndex = k;
            if (draggedElement.id[0] == "d") {
              finalTop = "-4vh";
              dstack.push(draggedElement.id);
            }
            else if (draggedElement.id[0] == "h") {
              finalTop = "20.55vh";
              hstack.push(draggedElement.id);
            }
            else if (draggedElement.id[0] == "s") {
              finalTop = "45.55vh";
              sstack.push(draggedElement.id);
            }
            else {
              finalTop = "70.55vh";
              cstack.push(draggedElement.id);
            }
            var index = cards.indexOf(draggedElement.id);
            if (index !== -1) {
              cards.splice(index, 1);
            }
            draggedElement.style.transform = "rotate(-90deg)";
            draggedElement.style.transition = "top 0.3s ease, left 0.3s ease";
            draggedElement.style.top = finalTop;
            draggedElement.style.left = finalLeft;

            var index = cards.indexOf(draggedElement.id);
            if (index !== -1) {
              cards.splice(index, 1);
            }

            var move = {
              from: getColumn(x),
              to: 7,
              moved: subcard,
              flipped: false
            };

            if (getColumn(x)>=0) {
              var toflip = columns[getColumn(x)].at(-1);
              if (toflip) frontcardMode(document.getElementById(toflip));
              move.flipped = true;
            }

            moves.push(move);
          }

          else {
            finalLeft = x;
            finalTop = y;
            columns[getColumn(finalLeft)].push(draggedElement.id);
          }
        }
      }

      else { 
        // From column to column
        // If can't be placed, return to former column
        finalTop = finalPosTop(getColumn(finalLeft))+"vw";
        if (columns[getColumn(finalLeft)].length > 0) {
          var lastID = columns[getColumn(finalLeft)].at(-1);
          if (canDrop(draggedElement.id, lastID)) {
            var move = {
              from: getColumn(x),
              to: getColumn(finalLeft),
              moved: subcard,
              flipped: false
            };

            if (getColumn(x)>=0) {
              var toflip = columns[getColumn(x)].at(-1);
              if (toflip) frontcardMode(document.getElementById(toflip));
              move.flipped = true;
            }

            moves.push(move);

            subcard.forEach(function(elt, id) {
              columns[getColumn(finalLeft)].push(elt);
              document.getElementById(elt).style.zIndex = document.getElementById(lastID).style.zIndex +1+id;
            });
            if(subcard.length == 1) {
              if (x == "95vw") {
                draggedElement.style.transform = "none";
              }
              var index = cards.indexOf(draggedElement.id);
              if (index !== -1) {
                cards.splice(index, 1);
              }
            }
          }
          else {
            finalLeft = x;
            finalTop = y;
            if (finalLeft == "0.5vw") {
              finalLeft = x;
              finalTop = y;
              for(let i = 0; i < subcard.length; i++) {
                document.getElementById(subcard[i]).style.transition = "top 0.3s ease, left 0.3s ease";
                document.getElementById(subcard[i]).style.left = finalLeft;
                document.getElementById(subcard[i]).style.top = parseInt(finalTop)+3.25*i + "vw";
              }
            }
            else {
              subcard.forEach(function(elt, id) {
                columns[getColumn(finalLeft)].push(elt);
                document.getElementById(elt).style.zIndex = document.getElementById(lastID).style.zIndex +1+id;
              });
            }
          }
        }
        else {
          if(draggedElement.id.at(-1) == "K") {
            var move = {
              from: getColumn(x),
              to: getColumn(finalLeft),
              moved: subcard,
              flipped: false
            };

            if (getColumn(x)>=0) {
              var toflip = columns[getColumn(x)].at(-1);
              if (toflip) frontcardMode(document.getElementById(toflip));
              move.flipped = true;
            }

            moves.push(move);

            if(subcard.length == 1) {
              if (x == "95vw") {
                draggedElement.style.transform = "none";
              }
              var index = cards.indexOf(draggedElement.id);
              if (index !== -1) {
                cards.splice(index, 1);
              }
            }
            subcard.forEach(function(elt, id) {
              columns[getColumn(finalLeft)].push(elt);
            });
          }
          else {
            finalLeft = x;
            finalTop = y;
            if (finalLeft == "0.5vw") {
              finalLeft = x;
              finalTop = y;
              for(let i = 0; i < subcard.length; i++) {
                document.getElementById(subcard[i]).style.transition = "top 0.3s ease, left 0.3s ease";
                document.getElementById(subcard[i]).style.left = finalLeft;
                document.getElementById(subcard[i]).style.top = parseInt(finalTop)+3.25*i + "vw";
              }
            }
            else {
              var lastID = columns[getColumn(finalLeft)].at(-1);
              subcard.forEach(function(elt, id) {
              columns[getColumn(finalLeft)].push(elt);
              document.getElementById(elt).style.zIndex = document.getElementById(lastID).style.zIndex +1+id;
            });
            }
          }
        }
        
        for(let i = 0; i < subcard.length; i++) {
          document.getElementById(subcard[i]).style.transition = "top 0.3s ease, left 0.3s ease";
          document.getElementById(subcard[i]).style.left = finalLeft;
          document.getElementById(subcard[i]).style.top = parseInt(finalTop)+3.25*i + "vw";
        }
      }
    }

    subcard = [];
    draggedElement = null;
});
var dragItem = document.getElementsByClassName("block");
var container = document.querySelector("#container");
var lines;
var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;
var selected;
var dconnected;
var uconnected;

function dragStart(e) {
    for (i = 0; i < dragItem.length; i++) {

        if (e.target.parentNode == dragItem[i]) {
            active = true;
            console.log("으아아")
            selected = dragItem[i];
            xOffset = dragItem[i].style.left.slice(0, -2);
            yOffset = dragItem[i].style.top.slice(0, -2);
        }
    }
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }
}

function dragEnd(e) {
    if (dconnected != undefined && dconnected.id != "end-block" && selected.id != 'head-block') {
        if (dconnected.lastChild.class != 'block') {
            selected.style.top = '0px';
            selected.style.left = '0px';
            selected.style.position = 'relative';
            dconnected.appendChild(selected);
        }
    }
    if (uconnected != undefined && uconnected.id != "head-block" && selected.id != 'end-block') {
        uconnected.style.top = '0px';
        uconnected.style.position = 'relative';
        uconnected.style.left = '0px';
        selected.appendChild(uconnected);
    }
    if (selected.parentNode.id != "container" && (selected.style.top != '0px' || selected.style.left != '0px')) {
        selected.style.top = "0px";
        selected.style.left = "0px";
    }
    dragItem = document.getElementsByClassName("block");
    active = false;
    dconnected = undefined;
    uconnected = undefined;
}

function drag(e) {
    if (!active) {
        return;
    }
    e.preventDefault();
    if (selected.parentNode.id != 'container' && selected != dragItem[i]) {
        if (Math.abs(selected.style.left.slice(0, -2)) > 50 ||
            Math.abs(selected.style.top.slice(0, -2)) > 50
        ) {
            var x = selected.getBoundingClientRect().left;
            var y = selected.getBoundingClientRect().top;
            console.log(x, y);

            currentX = x;
            currentY = y;
            console.log(currentX, currentY);
            console.log(currentX, currentY);
            container.appendChild(selected);
            selected.style.position = 'absolute';
        }
    }
    if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
    } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
    }
    xOffset = currentX;
    yOffset = currentY;

    for (i = 0; i < dragItem.length; i++) {
        otherLeft = Number(dragItem[i].getBoundingClientRect().left);
        otherTop = Number(dragItem[i].getBoundingClientRect().top);
        if (selected != dragItem[i] &&
            otherLeft + 30 > currentX &&
            otherLeft - 30 < currentX) {
            if (otherTop - 60 < currentY &&
                otherTop - 40 > currentY) {
                uconnected = dragItem[i];
            }
            if (otherTop + 40 < currentY &&
                otherTop + 60 > currentY) {
                dconnected = dragItem[i];
            }

        }
    }
    setTranslate(currentX, currentY, selected);


}

function setTranslate(xPos, yPos, el) {
    el.style.top = yPos + "px";
    el.style.left = xPos + "px";
}

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);
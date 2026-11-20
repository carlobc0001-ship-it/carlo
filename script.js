const room = document.getElementById("room");

const pullArea = document.getElementById("pullArea");

const pullHandle = document.getElementById("pullHandle");

const pullString = document.getElementById("pullString");


let dragging = false;

let startY = 0;

let currentPull = 0;

const MAX_PULL = 60;

const ACTIVATION_DISTANCE = 35;


/* =========================================
   START PULL
========================================= */

pullArea.addEventListener("pointerdown", function (event) {

    dragging = true;

    startY = event.clientY;

    pullArea.setPointerCapture(event.pointerId);

});


/* =========================================
   DRAG STRING
========================================= */

pullArea.addEventListener("pointermove", function (event) {

    if (!dragging) return;


    let distance =
        event.clientY - startY;


    /*
       Don't allow the user
       to pull upward.
    */

    if (distance < 0) {

        distance = 0;

    }


    /*
       Limit maximum pull.
    */

    if (distance > MAX_PULL) {

        distance = MAX_PULL;

    }


    currentPull = distance;


    /*
       Move the handle.
    */

    pullHandle.style.top =
        `${96 + distance}px`;


    /*
       Stretch the string.
    */

    pullString.style.height =
        `${100 + distance}px`;

});


/* =========================================
   RELEASE STRING
========================================= */

pullArea.addEventListener("pointerup", function () {

    if (!dragging) return;

    dragging = false;


    /*
       If pulled far enough,
       toggle the light.
    */

    if (currentPull >= ACTIVATION_DISTANCE) {

        toggleLight();

    }


    /*
       Return string to original position.
    */

    resetString();

});


/* =========================================
   CANCEL
========================================= */

pullArea.addEventListener("pointercancel", function () {

    dragging = false;

    resetString();

});


/* =========================================
   TOGGLE LIGHT
========================================= */

function toggleLight() {

    room.classList.toggle("light-on");

}


/* =========================================
   RESET STRING
========================================= */

function resetString() {

    currentPull = 0;

    pullHandle.style.top = "96px";

    pullString.style.height = "100px";

}
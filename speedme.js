
// DEBUG: <div id="speedifyMain" style="position: fixed; z-index: 10000; top: 75px; /*! width: 100%; */ text-align: center;border: 3px solid #eaeaea;/*! left: 50%; */color: white;background: #828282E3;padding: 20px;font-size: 60px;margin: auto;left: 0;right: 0;width: 300px;border-radius: 20px;">1.75x</div>

let userSettings = {
    speed: 1,
    increment: 0.25,
    slowKey: '-',
    fastKey: '=',
}

let box;

let timers = {
    wait: null,
    fade: null,
};


function keyDown(event) {

    let eventTriggered = false;

    if (event.key === userSettings.slowKey && userSettings.speed > 0) {
        userSettings.speed -= userSettings.increment;
        eventTriggered = true;
    }

    if (event.key === userSettings.fastKey && userSettings.speed < 16) {
        userSettings.speed += userSettings.increment;
        eventTriggered = true;
    }

    if (eventTriggered) {
        updateSpeed();
    }
    
}

function fadeOut() {

    if (!box.style.opacity) {
        box.style.opacity = 1;
    }

    if (box.style.opacity > 0) {
        box.style.opacity -= 0.2;
    } else {
        // Reset values.
        box.style.display = 'none';
        clearInterval(timers.fade);
    }

}

function intervalSet() {
    timers.fade = setInterval(fadeOut, 100);
}

function updateSpeed() {
    
    // Clear any callbacks scheduled.
    clearTimeout(timers.timeout);
    clearInterval(timers.fade);
    // Set the timer for the box to be displayed.
    timers.wait = setTimeout(intervalSet , 100);

    box.innerText = userSettings.speed + 'x'; // Updates box's information.
    // Updates video speed to the changed speed.
    document.getElementsByTagName('video')[0].playbackRate = userSettings.speed;

    box.style.display = "inline";
    box.style.opacity = 1;
    
}

function docStartup () {

    document.addEventListener('keydown', keyDown);

    box = document.createElement ("div");
    box.id = "speedify";
    box.style.display = "none";
    box.innerText = '1x';
    
    document.body.prepend(box);
}

docStartup();
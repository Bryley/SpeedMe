/*
 * Main inject script for SpeedMe addon.
 */

 // The user's settings for the app.
let userSettings = {
    speed: 1,
    increment: 0.25,
    slowKey: '-',
    fastKey: '=',
}

let box; // This is the fixed DOM element to display the current speed.

// This is object with the timers for displaying the box for a certain amount of time.
let timers = {
    wait: null,
    fade: null,
};

/*
 * Function gets called when a key is pressed.
 */
function keyDown(event) {

    let eventTriggered = false; // Becomes true if speed gets updated.

    // If video is slowed down.
    if (event.key === userSettings.slowKey && userSettings.speed > 0) {
        userSettings.speed -= userSettings.increment;
        eventTriggered = true;
    }

    // If video is sped up.
    if (event.key === userSettings.fastKey && userSettings.speed < 16) {
        userSettings.speed += userSettings.increment;
        eventTriggered = true;
    }

    // Update the speed if a valid key was pressed.
    if (eventTriggered) {
        updateSpeed();
    }
    
}

/*
 * Function handles fading out animation and will get called at intervals.
 */
function fadeOut() {

    // If the opacity is not set then reset.
    if (!box.style.opacity) {
        box.style.opacity = 1;
    }

    // This will be like a while loop
    if (box.style.opacity > 0) {
        box.style.opacity -= 0.2;
    } else {
        // Reset values.
        box.style.display = 'none';
        clearInterval(timers.fade);
    }

}

/*
 * Function will update and display the updated playback speed.
 */
function updateSpeed() {
    
    // Clear any callbacks scheduled.
    clearTimeout(timers.timeout);
    clearInterval(timers.fade);
    // Set the timer for the box to be fadedOut.
    timers.wait = setTimeout(() => {
        timers.fade = setInterval(fadeOut, 100);
    } , 100);

    box.innerText = userSettings.speed + 'x'; // Updates box's information.
    // Updates the youtube video speed.
    document.getElementsByTagName('video')[0].playbackRate = userSettings.speed;

    // Displays the box.
    box.style.display = "inline";
    box.style.opacity = 1;
    
}

/*
 * Function gets called when the page gets loaded.
 */
function docStartup () {

    // Add key press event listener.
    document.addEventListener('keydown', keyDown);

    // Create the div.
    box = document.createElement ("div");
    box.id = "speedify";
    box.style.display = "none";
    box.innerText = '1x';

    // Prepend the box to the body.
    document.body.prepend(box);
}

docStartup();
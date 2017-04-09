// Give the canvas context and image objects.  Draw the image to
// the context, no return value.
function draw(ctx, img) {
    // Check that the image is loaded before writing.  Keep
    // checking every 50 milliseconds.
    if (!img.complete) {
        setTimeout( function() {
            draw(ctx, img);
        }, 50);
    }

    // Clear the current image and draw the new.
    ctx.clearRect(0,0, 300,300);
    ctx.drawImage(img, 0,0, 300,300);
}

// Give the string canvas id and string base-name, create the
// canvas object and draw the first image to the canvas.
function slideShow(canId) {
    var can = document.getElementById(canId);
    can.width = 300;
    can.height = 300;

    var ctx = can.getContext('2d');
    var img = new Image();
    img.src = canId.split("_")[1] + "_" + 1 + ".png";
    draw(ctx, img);
}

// Next button function.  Give the name of the canvas, draw the
// next image or cycle to the start.
function next(button) {
    var name = button.getAttribute("name").split("_");
    var n = name[0];
    var bound = parseInt(name[1]);
    // Find the appropriate canvas element.
    for (i = 0; i < canStates.length; i++) {
        var id = canStates[i][0].getAttribute("id");
        id = id.split("_")[1];
        if (id == n) {
            // Use the states to produce an image, and update the
            // states.
            canStates[i][1] += 1;
            if (canStates[i][1] > bound) {
                canStates[i][1] = 1;
            }
            var img = new Image();
            img.src = n + "_" + canStates[i][1] + ".png";
            // Draw to the canvas.
            draw(canStates[i][0].getContext('2d'), img);
        }
    }
}

// Create a global variable tracking all states of "Next" buttons.
// Stored as a list, each element is a list, the left coordinate is
// a canvas and the right coordinate is its state (image index).
// Also initialize all slide shows.
// The variable r stores the canvases and states, initialized
// outside the function in order to pass-by-reference so as to act
// as a global variable.
var canStates = new Array();
window.onload = function() {
    var cans = document.getElementsByTagName("canvas");

    for (i=0; i < cans.length; i++) {
        var c = cans[i];
        c.innerHTML = "Your browser doesn't support canvas elements.  :("
        var n = c.getAttribute("id").split("_").slice(1,3);
        n = n.join("_");
        slideShow("can_"+n);
    }

    for (i = 0; i < cans.length; i++) {
        canStates[i] = [cans[i],1];
    }
}

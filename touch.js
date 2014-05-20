var touchArea = document.getElementById("imageWrapper");
var elemImage = document.getElementById("image");

var posX=0, posY=0, 
    lastPosX=0, lastPosY=0, 
    bufferX=0, bufferY=0, 
    scale=1, last_scale, scale_limit=10, 
    rotation=1, last_rotation, dragReady=0;

var options = {
    transform_always_block: true,
    preventDefault: true,
    transform_min_scale: 1,
    drag_block_horizontal: true,
    drag_block_vertical: true,
    drag_min_distance: 0
};

var hammertime = Hammer(touchArea, options).on("touch drag dragend transform transformend", function(event) {
    manageMultiTouch(event);
});

function manageMultiTouch(event) {
    switch(event.type) {
	case "touch":
	     last_scale = scale;
	     last_rotation = rotation;
	     break;

	case "transform":
	    rotation = last_rotation + event.gesture.rotation;
	    scale = event.gesture.scale * last_scale;
	    break;

	case "transformend":
	    event.gesture.stopDetect();
	    break;

	case "drag":
                 posX = event.gesture.deltaX + lastPosX;
                 posY = event.gesture.deltaY + lastPosY;

        break;

	case "dragend":
	    lastPosX = posX;
	    lastPosY = posY;
	    break;
    }

    var transform = 
	"translate3d(" + posX + "px, " + posY + "px, 0)" +
	"scale3d(" + scale + ", " + scale + ", 0)" +
	"rotate(" + rotation + "deg)";

    elemImage.style.transform = transform;
    elemImage.style.oTransform = transform;
    elemImage.style.msTransform = transform;
    elemImage.style.mozTransform = transform;
    elemImage.style.webkitTransform = transform;
};

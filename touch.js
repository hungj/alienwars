var posX=0, posY=0,
	lastPosX=0, lastPosY=0,
	bufferX=0, bufferY=0,
    scale=1, last_scale,
    rotation= 1, last_rotation, dragReady=0;

var image = document.getElementById('image');

var hammertime = Hammer(image).on('touch drag transform', function(event) {
	elemImage = document.getElementById('image');
	manageMultitouch(event);
});

function manageMultitouch(event){
	switch(event.type) {
		case 'touch':
            last_scale = scale;
            last_rotation = rotation;
            break;
 
        case 'drag':
            posX = ev.gesture.deltaX + lastPosX;
			posY = ev.gesture.deltaY + lastPosY;
            break;
 
        case 'transform':
            rotation = last_rotation + ev.gesture.rotation;
            scale = Math.max(1, Math.min(last_scale * ev.gesture.scale, 10));
            break;
 
        case 'dragend':
            lastPosX = posX;
            lastPosY = posY;
            break;
        }
	}
	
	var transform =
        "translate3d("+posX+"px,"+posY+"px, 0) " +
        "scale3d("+scale+","+scale+", 0) " +
        "rotate("+rotation+"deg) ";
 
    elemImage.style.transform = transform;
    elemImage.style.oTransform = transform;
    elemImage.style.msTransform = transform;
    elemImage.style.mozTransform = transform;
    elemImage.style.webkitTransform = transform;
}
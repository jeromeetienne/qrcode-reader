var overlay = new Overlay()


//////////////////////////////////////////////////////////////////////////////
//		create canvasEl
//////////////////////////////////////////////////////////////////////////////
var canvasEl = document.createElement('canvas')
canvasEl.id = 'qr-canvas'	// KLUDGE by jsqrcode.js - forced to have this domID
canvasEl.style.display = 'none'
document.body.appendChild(canvasEl)

//////////////////////////////////////////////////////////////////////////////
//		init video
//////////////////////////////////////////////////////////////////////////////
var videoEl = document.querySelector('#camsource');
var options = {
	"audio": false,
	"video": true
};
// Replace the source of the video element with the stream from the camera
console.assert(navigator.getUserMedia, 'navigator.getUserMedia not defined')
navigator.getUserMedia(options, function(stream) {
	videoEl.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
}, function(error) {
	console.log(error)
});

//////////////////////////////////////////////////////////////////////////////
//		init qrcode callback to received scanned result
//////////////////////////////////////////////////////////////////////////////
qrcode.callback = function read(qrCodeValue){
	// console.log('read value', qrCodeValue)
	
	overlay.updateQRCodeValue(qrCodeValue)
	overlay.show()
};

/**
 * to scan the video now
 */
function scanVideoNow(){
	// dont scan if videoEl isnt yet initialized
	if( videoEl.videoWidth === 0 )	return
	
	var scale = 0.5
	// console.time('capture');
	var canvasEl = document.querySelector('#qr-canvas')
	var context = canvasEl.getContext('2d');
	// resize canvasEl
	canvasEl.width = videoEl.videoWidth * scale;
	canvasEl.height = videoEl.videoHeight * scale;
	// draw videoEl on canvasEl
	context.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
	// decode the canvas content
	try {
		qrcode.decode();
		var foundResult = true
	} catch(error) {
		// console.log('jsqrcode:', error);
		var foundResult = false
	}	
	return foundResult
}

//////////////////////////////////////////////////////////////////////////////
//		start scanning
//////////////////////////////////////////////////////////////////////////////
scanVideoNow()
setInterval(function() {
	scanVideoNow()
}, 100);

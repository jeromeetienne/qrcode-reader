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
var userMediaConstraints = {
	audio: false,
	video: {
		facingMode: 'environment',
		width: {
			ideal: 640,
			// min: 1024,
			// max: 1920
		},
		height: {
			ideal: 480,
			// min: 776,
			// max: 1080
		}
  	}
}
// Replace the source of the video element with the stream from the camera
navigator.mediaDevices.getUserMedia(userMediaConstraints).then(function(stream) {
	var ua = navigator.userAgent.toLowerCase(); 
	if (ua.indexOf('safari') != -1 && ua.indexOf('chrome') === -1) { 
	  videoEl.srcObject = stream;
	} else {
		if(window.URL) {
			var objUrl = window.URL.createObjectURL(stream);
			videoEl.src = objUrl;
			videoEl.srcObject = objUrl;
		} else {
			videoEl.srcObject = stream;
		}
	}
	videoEl.play();
}).catch(function(error) {
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

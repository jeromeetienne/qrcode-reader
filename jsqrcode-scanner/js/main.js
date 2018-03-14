    
qrcode.callback = function read(qrCodeValue){
	console.log('read value', qrCodeValue)
};

//////////////////////////////////////////////////////////////////////////////
//		Code Separator
//////////////////////////////////////////////////////////////////////////////
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

// Assign the <video> element to a variable
var videoEl = document.querySelector('#camsource');
var options = {
	"audio": false,
	"video": true
};
// Replace the source of the video element with the stream from the camera
console.assert(navigator.getUserMedia, 'navigator.getUserMedia not defeined')
navigator.getUserMedia(options, function(stream) {
	videoEl.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
}, function(error) {
	console.log(error)
});

function scanVideo(){
	// dont scan if videoEl isnt yet initialized
	if( videoEl.videoWidth === 0 )	return
	
	var scale = 0.5
	// console.time('capture');
	var canvasEl = document.querySelector('#qr-canvas')
	var context = canvasEl.getContext('2d');
	// resize canvasEl
	canvasEl.width = videoEl.videoWidth * scale;
	canvasEl.height = videoEl.videoHeight * scale;

	context.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
	try {
		qrcode.decode();
	} catch(error) {
    		console.error(error);
	}	
}

scanVideo()
setInterval(function() {
	scanVideo()
}, 100);

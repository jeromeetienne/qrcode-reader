//////////////////////////////////////////////////////////////////////////////
//                init scanner
//////////////////////////////////////////////////////////////////////////////
var scanner = new Instascan.Scanner({
        video: document.querySelector('#video'),
        // scanPeriod: 1
});
scanner.refractoryPeriod = 500

scanner.addListener('scan', function (content, image) {
        console.log('content', content)
});


//////////////////////////////////////////////////////////////////////////////
//                init camera
//////////////////////////////////////////////////////////////////////////////

WebrtcCamera.getCameras().then(cameras => {
        if (cameras.length > 0) {
                console.log(`start camera '${cameras[0].name}'`)
                console.dir(cameras)
                this.scanner.start(cameras[0]);
        } else {
                console.error('No cameras found.');
        }
}).catch(function (e) {
        console.error(e);
});

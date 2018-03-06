;(function(exports){
	function cameraName(label) {
	        let clean = label.replace(/\s*\([0-9a-f]+(:[0-9a-f]+)?\)\s*$/, '');
	        return clean || label || null;
	}

	class MediaError extends Error {
	        constructor(type) {
	                super(`Cannot access video stream (${type}).`);
	                this.type = type;
	        }
	}

	class Camera {
	        constructor(id, name) {
	                this.id = id;
	                this.name = name;
	                this._stream = null;
	        }
	        
	        async start() {
	                let constraints = {
	                        audio: false,
	                        video: {
	                                mandatory: {
	                                        // TODO yuck the video is hardcoded...
	                                        sourceId: this.id,
	                                        minWidth: 600,
	                                        maxWidth: 800,
	                                        minAspectRatio: 1.6
	                                },
	                                optional: []
	                        }
	                };
	                
	                this._stream = await Camera._wrapErrors(async () => {
	                        return await navigator.mediaDevices.getUserMedia(constraints);
	                });
	                
	                return this._stream;
	        }
	        
	        stop() {
	                if (!this._stream) {
	                        return;
	                }
	                
	                for (let stream of this._stream.getVideoTracks()) {
	                        stream.stop();
	                }
	                
	                this._stream = null;
	        }
	        
	        static async getCameras() {
	                await this._ensureAccess();
	                
	                let devices = await navigator.mediaDevices.enumerateDevices();

	                return devices
				.filter(device => device.kind === 'videoinput')
	                	.map(device => new Camera(device.deviceId, cameraName(device.label)));
	        }
	        
	        static async _ensureAccess() {
	                return await this._wrapErrors(async () => {
	                        let access = await navigator.mediaDevices.getUserMedia({ video: true });
	                        for (let stream of access.getVideoTracks()) {
	                                stream.stop();
	                        }
	                });
	        }
	        
	        static async _wrapErrors(fn) {
	                try {
	                        return await fn();
	                } catch (e) {
	                        if (e.name) {
	                                throw new MediaError(e.name);
	                        } else {
	                                throw e;
	                        }
	                }
	        }
	}
	// export the class
	exports.WebrtcCamera = Camera
})(window)

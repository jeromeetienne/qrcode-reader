watch: build
	fswatch -0 js/*.js vendor/jsqrcode/*.js | xargs -0 -n 1 -I {} make build
	
build:
	echo > build/jsqrcode.js

	cat js/_prefix.js >> build/jsqrcode.js
	cat vendor/jsqrcode/grid.js >> build/jsqrcode.js
	cat vendor/jsqrcode/version.js >> build/jsqrcode.js
	cat vendor/jsqrcode/detector.js >> build/jsqrcode.js
	cat vendor/jsqrcode/formatinf.js >> build/jsqrcode.js
	cat vendor/jsqrcode/errorlevel.js >> build/jsqrcode.js
	cat vendor/jsqrcode/bitmat.js >> build/jsqrcode.js
	cat vendor/jsqrcode/datablock.js >> build/jsqrcode.js
	cat vendor/jsqrcode/bmparser.js >> build/jsqrcode.js
	cat vendor/jsqrcode/datamask.js >> build/jsqrcode.js
	cat vendor/jsqrcode/rsdecoder.js >> build/jsqrcode.js
	cat vendor/jsqrcode/gf256poly.js >> build/jsqrcode.js
	cat vendor/jsqrcode/gf256.js >> build/jsqrcode.js
	cat vendor/jsqrcode/decoder.js >> build/jsqrcode.js
	cat vendor/jsqrcode/QRCode.js >> build/jsqrcode.js
	cat vendor/jsqrcode/findpat.js >> build/jsqrcode.js
	cat vendor/jsqrcode/alignpat.js >> build/jsqrcode.js
	cat vendor/jsqrcode/databr.js >> build/jsqrcode.js
	cat js/_suffix.js >> build/jsqrcode.js

.PHONY: build

minify: build
	uglifyjs build/jsqrcode.js > build/jsqrcode.min.js

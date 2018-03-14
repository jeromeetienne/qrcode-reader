class Overlay {
	constructor(){
		this.lastValue = null
		
		document.querySelector('#content-overlay .close-overlay').addEventListener('click', () => {
			this.hide()
		})
		document.querySelector('#content-overlay .open-browser').addEventListener('click', () => {
			location.href= this.lastValue
		})

		document.querySelector('#content-overlay .copy-clipboard').addEventListener('click', (event) => {
			event.preventDefault();
			var text = document.querySelector('#content-overlay .qrcode-value').innerHTML
			copyToClipboard(text)
			return
			function copyToClipboard(text){
				// create a temporary input element
				var input = document.createElement('input')
				input.type = 'text'
				input.value = text
				document.body.appendChild(input)
				// select input
	        		input.select();
				// copy it to clipboard
	        		document.execCommand("copy");
				// remove it from the dom
				document.body.removeChild(input)				
			}
		})

	}
	updateQRCodeValue(qrCodeValue){
		this.lastValue = qrCodeValue
		document.querySelector('#content-overlay .qrcode-value').innerHTML = qrCodeValue
	}
	show(){
		document.querySelector('#content-overlay').style.display = 'inherit'
	}
	hide(){
		document.querySelector('#content-overlay').style.display = 'none'
	}
}

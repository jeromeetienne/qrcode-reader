class Overlay {
	constructor(){
		this.lastValue = null
		
		document.querySelector('#content-overlay .close-overlay').addEventListener('click', () => {
			console.log('click closed')
			this.hide()
		})
		document.querySelector('#content-overlay .open-browser').addEventListener('click', () => {
			// console.log('click closed')
			location.href= this.lastValue
		})

		document.querySelector('#content-overlay .copy-clipboard').addEventListener('click', (event) => {
			event.preventDefault();
			var text = document.querySelector('#content-overlay .qrcode-value').innerHTML
			copyToClipboard(text)
			return
			function copyToClipboard(text){
				var input = document.createElement('input')
				input.type = 'text'
				input.value = text
				document.body.appendChild(input)
	        		input.select();
	        		document.execCommand("copy");
				document.body.removeChild(input)				
			}
		})

		// document.querySelector('#content-overlay .copy-clipboard').addEventListener('click', () => {
		// 
		// 	var emailLink = document.querySelector('#content-overlay .qrcode-value');  
		// 	var range = document.createRange();  
		// 	range.selectNode(emailLink);  
		// 	window.getSelection().addRange(range);  
		// 
		// 	try {  
		// 		// Now that we've selected the anchor text, execute the copy command  
		// 		var successful = document.execCommand('copy');  
		// 		var msg = successful ? 'successful' : 'unsuccessful';  
		// 		console.log('Copy email command was ' + msg);  
		// 	} catch(err) {  
		// 		console.log('Oops, unable to copy');  
		// 	}  
		// 
		// 	// Remove the selections - NOTE: Should use
		// 	// removeRange(range) when it is supported  
		// 	window.getSelection().removeAllRanges();  
		// 
		// })
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

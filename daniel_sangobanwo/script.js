$("form").submit(function(event) {
	event.preventDefault()

	var input = $(this).serializeArray()[0].value
	input = input.split(" ").join("+")

		var rootURL = "https://www.rijksmuseum.nl/api/en/collection"
		var artist = "?q=" + input
		var key = '&key=wlplw3pe'
		var format = '&format=json'

	$.ajax({
		url: rootURL + artist + key + format,
		success: function(data) {
			var art = data.artObjects
			// console.log(art)
			for (var i = 0; i < art.length; i++) {
				if(art[i].hasImage){
					var imgURL = art[i].webImage.url
					var img = document.createElement('img')
					img.setAttribute('src', imgURL)
					$('body').append(img)
				}
			}
		},
		error: function(data) {
			if (data === 404) {
				alert("The name of the Artist cannot be found. Please try again.")
			}
		}
	})


})
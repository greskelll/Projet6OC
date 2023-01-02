fetch(`http://localhost:5678/api/works`)
	.then(function (res) {
		if (res.ok) {
			return res.json();
		}
	})
	.then(function (value) {
		const newProject = document.createElement('figure');
		newProject.innerHTML = `<img crossorigin="anonymous" src="${value[0].imageUrl}" alt="${value[0].title}">
				<figcaption>${value[0].title}</figcaption>`;
		console.log(newProject);

		const gallery = document.getElementsByClassName('gallery').item(0);
		console.log(gallery);
		gallery.appendChild(newProject);
	})

	.catch(function (err) {
		console.log('erreur fetch api');
	});

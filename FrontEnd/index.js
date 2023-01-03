fetch(`http://localhost:5678/api/works`)
	.then(function (res) {
		if (res.ok) {
			return res.json();
		}
	})
	.then(function (value) {
		console.log(value);
		for (let i = 0; i < value.length; i++) {
			const newProject = document.createElement('figure');
			newProject.innerHTML = `<img crossorigin="anonymous" src="${value[i].imageUrl}" alt="${value[i].title}">
				<figcaption>${value[i].title}</figcaption>`;
			console.log(newProject);

			const gallery = document.getElementsByClassName('gallery').item(0);

			console.log(gallery);
			gallery.appendChild(newProject);
		}
		return fetch(`http://localhost:5678/api/categories`);
	})
	.then(function (cat) {
		if (cat.ok) {
			return cat.json();
		}
	})
	.then(function (categories) {
		console.log(categories);
	})

	.catch(function (err) {
		console.log('erreur fetch api');
	});

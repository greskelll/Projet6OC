fetch(`http://localhost:5678/api/works`)
	.then(function (res) {
		if (res.ok) {
			return res.json();
		}
	})
	.then(function (value) {
		for (let i = 0; i < value.length; i++) {
			const newProject = document.createElement('figure');
			newProject.innerHTML = `<img crossorigin="anonymous" src="${value[i].imageUrl}" alt="${value[i].title}">
				<figcaption>${value[i].title}</figcaption>`;
			const gallery = document.getElementsByClassName('gallery').item(0);
			gallery.appendChild(newProject);
		}

		return fetch(`http://localhost:5678/api/works`);
	})
	.then(function (res) {
		if (res.ok) {
			return res.json();
		}
	})
	.then(function (res) {
		let newArray = [];
		for (i in res) {
			newArray.push(res[i].categoryId);
		}
		console.log(newArray);
		let figure = document.querySelectorAll('.gallery figure');
		console.log(figure);

		const objets = document.getElementById('objets');
		console.log(objets);
		objets.addEventListener('click', function () {
			for (let i = 0; i < newArray.length; i++) {
				if (newArray[i] == 1) {
					figure[i].remove();
				}
			}
		});
	})

	.catch(function (err) {
		console.log('erreur fetch api');
	});

export function updateGallery() {
	fetch(`http://localhost:5678/api/works`)
		.then(function (response) {
			if (response.ok) {
				return response.json();
			}
		})
		.then(function (project) {
			for (let i = 0; i < project.length; i++) {
				const newProject = document.createElement('figure');
				newProject.innerHTML = `<img crossorigin="anonymous" title=${project[i].id} src="${project[i].imageUrl}" alt="${project[i].title}">
				<figcaption>${project[i].title} </figcaption> `;
				const gallery = document
					.getElementsByClassName('gallery')
					.item(0);
				gallery.appendChild(newProject);
			}

			galleryPick(project);
		})
		.catch(function () {
			console.log('erreur fetch api update gallery');
		});
}
function setCategory(categoryId, newArray, figure) {
	for (let i = 0; i < newArray.length; i++) {
		if (newArray[i] !== categoryId) {
			figure[i].style.display = 'none';
		} else if (newArray[i] == categoryId) {
			figure[i].style.display = 'initial';
		}
	}
}

function galleryPick(id) {
	let newArray = [];
	for (let i in id) {
		newArray.push(id[i].categoryId);
	}
	console.log(newArray);
	let figure = document.querySelectorAll('.gallery figure');
	console.log(figure);

	const objets = document.getElementById('objets');
	const apparts = document.getElementById('apparts');
	const hotelresto = document.getElementById('hotelresto');
	const tous = document.getElementById('tous');

	console.log(objets);
	objets.addEventListener('click', () => setCategory(1, newArray, figure));
	apparts.addEventListener('click', () => setCategory(2, newArray, figure));
	hotelresto.addEventListener('click', () =>
		setCategory(3, newArray, figure)
	);
	tous.addEventListener('click', function () {
		for (let i = 0; i < newArray.length; i++) {
			if (newArray[i] !== 0) {
				figure[i].style.display = 'initial';
			}
		}
	});
}

/* modal gallery*/
fetch(`http://localhost:5678/api/works`)
	.then(function (response) {
		if (response.ok) {
			return response.json();
		}
	})
	.then(function (project) {
		const modalContent = document
			.getElementsByClassName('modalContent')
			.item(0);
		const newDiv = document.createElement('div');
		newDiv.className = 'projectImg';
		modalContent.appendChild(newDiv);
		for (let i = 0; i < project.length; i++) {
			const actualProject = document.createElement('figure');
			actualProject.innerHTML = `<img class=modImg title=${project[i].id} crossorigin="anonymous" src="${project[i].imageUrl}" alt="${project[i].title}">
			<i class="fa-regular fa-trash-can"></i><p>éditer</p>`;
			newDiv.appendChild(actualProject);
		}
	})
	.catch(function () {
		console.log('erreur fetch api modal gallery');
	});

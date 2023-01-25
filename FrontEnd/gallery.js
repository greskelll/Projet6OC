export function updateGallery() {
	fetch(`http://localhost:5678/api/works`)
		.then(function (res) {
			if (res.ok) {
				return res.json();
			}
		})
		.then(function (value) {
			for (let i = 0; i < value.length; i++) {
				const newProject = document.createElement('figure');
				newProject.innerHTML = `<img crossorigin="anonymous" title=${value[i].id} src="${value[i].imageUrl}" alt="${value[i].title}">
				<figcaption>${value[i].title} </figcaption> `;
				const gallery = document
					.getElementsByClassName('gallery')
					.item(0);
				gallery.appendChild(newProject);
			}

			galleryPick(value);
		})
		.catch(function () {
			console.log('erreur fetch api');
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

function galleryPick(res) {
	let newArray = [];
	for (let i in res) {
		newArray.push(res[i].categoryId);
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
	.then(function (res) {
		if (res.ok) {
			return res.json();
		}
	})
	.then(function (value) {
		const modalContent = document
			.getElementsByClassName('modalContent')
			.item(0);
		const newDiv = document.createElement('div');
		newDiv.className = 'projectImg';
		modalContent.appendChild(newDiv);
		for (let i = 0; i < value.length; i++) {
			const actualProject = document.createElement('figure');
			actualProject.innerHTML = `<img class=modImg title=${value[i].id} crossorigin="anonymous" src="${value[i].imageUrl}" alt="${value[i].title}">
			<i class="fa-regular fa-trash-can"></i><p>éditer</p>`;
			newDiv.appendChild(actualProject);
		}
	})
	.catch(function () {
		console.log('erreur fetch api');
	});

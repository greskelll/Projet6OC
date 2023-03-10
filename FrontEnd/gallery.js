export function updateGallery() {
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
function setCategory(categoryId, newArray) {
	let figure = document.querySelectorAll('.gallery figure');
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

	const object = document.getElementById('object');
	const flats = document.getElementById('flats');
	const hostel = document.getElementById('hostel');
	const allProject = document.getElementById('allProject');
	object.addEventListener('click', () => setCategory(1, newArray));
	flats.addEventListener('click', () => setCategory(2, newArray));
	hostel.addEventListener('click', () => setCategory(3, newArray));
	allProject.addEventListener('click', function () {
		let figure = document.querySelectorAll('.gallery figure');
		for (let i = 0; i < newArray.length; i++) {
			if (newArray[i] !== 0) {
				figure[i].style.display = 'initial';
			}
		}
	});
}

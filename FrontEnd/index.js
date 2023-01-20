const myHeaders = new Headers();
const formData = new FormData();

const updateGallery = () => {
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
};

function galleryPick(res) {
	let newArray = [];
	for (i in res) {
		newArray.push(res[i].categoryId);
	}
	console.log(newArray);
	let figure = document.querySelectorAll('.gallery figure');
	console.log(figure);

	const objets = document.getElementById('objets');
	const apparts = document.getElementById('apparts');
	const hotelresto = document.getElementById('hotelresto');
	const tous = document.getElementById('tous');

	function setCategory(categoryId) {
		for (let i = 0; i < newArray.length; i++) {
			if (newArray[i] !== categoryId) {
				figure[i].style.display = 'none';
			} else if (newArray[i] == categoryId) {
				figure[i].style.display = 'initial';
			}
		}
	}

	console.log(objets);
	objets.addEventListener('click', () => setCategory(1));
	apparts.addEventListener('click', () => setCategory(2));
	hotelresto.addEventListener('click', () => setCategory(3));

	tous.addEventListener('click', function () {
		for (let i = 0; i < newArray.length; i++) {
			if (newArray[i] !== 0) {
				figure[i].style.display = 'initial';
			}
		}
	});
}

let myToken;

const form = document.getElementById('loginForm');
if (form === null) {
	console.log('you are not on logged in or in the login page');
} else {
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		let userEmail = document.getElementById('email').value;
		let userPassword = document.getElementById('password').value;

		fetch('http://localhost:5678/api/users/login', {
			method: 'POST',
			body: JSON.stringify({
				email: userEmail,
				password: userPassword,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then(function (response) {
				if (response.ok) {
					return response.json();
				} else {
					alert('Erreur dans l’identifiant ou le mot de passe');
				}
			})
			.then((data) => {
				myToken = data.token;
			})
			.then(() => {
				console.log(myToken);
				localStorage.setItem('token', myToken);
				document.location = `index.html`;
			});
	});
}

const editHeader = document.getElementById('editHeader');
const log = document.getElementById('log');
const modifyProject = document.getElementById('modifyProject');
const header = document.getElementById('classicHeader');
console.log(editHeader);
if (localStorage.getItem('token') === null) {
	editHeader.style.display = 'none';
	modifyProject.style.display = 'none';
} else {
	editHeader.style.display = 'flex';
	modifyProject.style.display = 'flex';
	header.style.margin = '100px 0';
	log.innerHTML = '<a href="login.html" >logout</a>';
	log.addEventListener('click', function (e) {
		e.preventDefault();
		localStorage.clear();
		location.reload();
	});
}

let openModify = document.getElementById('openModify');
openModify.addEventListener('click', () => {
	let modal = document.getElementById('modal');
	modal.style.display = 'flex';
});

let closeModify = document.getElementById('closeModify');
closeModify.addEventListener('click', () => {
	let modal = document.getElementById('modal');
	modal.style.display = 'none';
});

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

function closeModal() {
	modal.style.display = 'none';
}
function closeModalFunction() {
	document.addEventListener('click', function (event) {
		if (
			event.target.matches('#closeModify') ||
			event.target.matches('#modal')
		) {
			closeModal();
		}
	});
}

closeModalFunction();

const listToDelete = [];

document.addEventListener('click', function (event) {
	if (event.target.matches('.fa-trash-can')) {
		/* click += 1;
		let deleteFigure = event.target.closest('figure');
		localStorage.setItem(`id${click}`, deleteFigure.firstChild.title); */
		let deleteFigure = event.target.closest('figure');

		listToDelete.push(deleteFigure.firstChild.title);
		deleteFigure.style.display = 'none';
		console.log(listToDelete);
	}
});

function validateChanges() {
	const publishChanges = document.getElementById('publishChanges');
	publishChanges.addEventListener('click', (e) => {
		e.preventDefault();
		if (confirm('êtes vous sûre de vouloir publier vos modifications?')) {
			myToken = localStorage.getItem('token');
			myHeaders.append('Authorization', `Bearer ${myToken}`);
			for (i of listToDelete) {
				fetch(`http://localhost:5678/api/works/${i}`, {
					method: 'DELETE',
					headers: myHeaders,
				}).then((response) => {
					if (response.ok) {
						console.log('ok');
						const gallery = document
							.getElementsByClassName('gallery')
							.item(0);
						gallery.innerHTML = '';
						updateGallery();
						listToDelete.shift();
					}
				});
			}
		} else {
			alert(`vos modifications n'ont pas été envoyé`);
		}
	});
}

const addProjectForm =
	document.getElementById('addProject'); /* à utliser pour reset form ? */

function addProject() {
	addProjectForm.addEventListener('submit', function (e) {
		e.preventDefault();
		const photo = document.getElementById('photo').files[0];
		const title = document.getElementById('title').value;
		const category = document.getElementById('category').value;
		formData.append('image', photo);
		formData.append('title', title);
		formData.append('category', category);
		myToken = localStorage.getItem('token');
		myHeaders.append('Authorization', `Bearer ${myToken}`);
		fetch('http://localhost:5678/api/works', {
			method: 'POST',
			body: formData,
			headers: myHeaders,
		})
			.then(() => {
				output.src = '';
				outputSize(0.1, 0.1);
				document.querySelector('.photoSubmit label').style.display =
					'flex';
			})
			.catch(() => {
				alert(`échec de l'envoi`);
				output.src = '';
				outputSize(0.1, 0.1);
				document.querySelector('.photoSubmit label').style.display =
					'flex';
			});
	});
}

function outputSize(width, height) {
	const output = document.getElementById('output');
	output.style.width = `${width}px`;
	output.style.height = `${height}px`;
}
const loadFile = function (event) {
	output.src = URL.createObjectURL(event.target.files[0]);
	outputSize(100, 150);
	document.querySelector('.photoSubmit label').style.display = 'none';
};

function openAddNewProject() {
	document.getElementById('addImg').addEventListener('click', () => {
		document.getElementById('addProjectModal').style.visibility = 'visible';
		document.getElementById('delProjectModal').style.visibility =
			'collapse';
	});
}

function backToDeleteProject() {
	document.getElementById('backModal').addEventListener('click', () => {
		document.getElementById('addProjectModal').style.visibility =
			'collapse';
		document.getElementById('delProjectModal').style.visibility = 'visible';
	});
}

backToDeleteProject();
openAddNewProject();
addProject();
updateGallery();
validateChanges();

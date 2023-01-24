import { updateGallery } from './gallery.js';

const myHeaders = new Headers();
const formData = new FormData();

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

function adminVisibility() {
	const editHeader = document.getElementById('editHeader');
	const log = document.getElementById('log');
	const modifyProject = document.getElementById('modifyProject');
	const header = document.getElementById('classicHeader');
	const gallerySelector = document.querySelector('.categories');
	console.log(editHeader);
	if (localStorage.getItem('token') === null) {
		editHeader.style.display = 'none';
		modifyProject.style.display = 'none';
		gallerySelector.style.display = 'flex';
	} else {
		editHeader.style.display = 'flex';
		modifyProject.style.display = 'flex';
		gallerySelector.style.display = 'none';
		header.style.margin = '100px 0';
		log.innerHTML = '<a href="login.html" >logout</a>';
		log.addEventListener('click', function (e) {
			e.preventDefault();
			localStorage.clear();
			location.reload();
		});
	}
}

function openModal() {
	let openModify = document.getElementById('openModify');
	openModify.addEventListener('click', () => {
		let modal = document.getElementById('modal');
		modal.style.display = 'flex';
	});
}

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

const listToDelete = [];

function ProjectToBeDel() {
	document.addEventListener('click', function (event) {
		if (event.target.matches('.fa-trash-can')) {
			let deleteFigure = event.target.closest('figure');
			listToDelete.push(deleteFigure.firstChild.title);
			deleteFigure.style.display = 'none';
			console.log(listToDelete);
		}
	});
}
deleteGallery();
function deleteGallery() {
	const deleteGallery = document.getElementById('deleteGallery');
	deleteGallery.addEventListener('click', () => {
		if (confirm('êtes vous sûre de vouloir supprimer la gallerie?')) {
			const gallery = document.getElementsByClassName('gallery').item(0);
			console.log;
			myToken = localStorage.getItem('token');
			myHeaders.append('Authorization', `Bearer ${myToken}`);
			const galleryChildren = gallery.children;
			let galleryArray = [];

			for (let i = 0; i < galleryChildren.length; i++) {
				galleryArray.push(galleryChildren[i].firstChild.title);
			}
			for (let b of galleryArray) {
				fetch(`http://localhost:5678/api/works/${b}`, {
					method: 'DELETE',
					headers: myHeaders,
				}).then((response) => {
					if (response.ok) {
						console.log('ok');
						galleryArray.shift();
						if (galleryArray.length === 0) {
							const gallery = document
								.getElementsByClassName('gallery')
								.item(0);
							gallery.innerHTML = '';
							updateGallery();
						}
					}
				});
			}

			/* fetch(`http://localhost:5678/api/works/2`, {
				method: 'DELETE',
				headers: myHeaders,
			}); */
		}
	});
}

function validateChanges() {
	const publishChanges = document.getElementById('publishChanges');
	publishChanges.addEventListener('click', (e) => {
		e.preventDefault();
		if (confirm('êtes vous sûre de vouloir publier vos modifications?')) {
			myToken = localStorage.getItem('token');
			myHeaders.append('Authorization', `Bearer ${myToken}`);

			for (let i of listToDelete) {
				fetch(`http://localhost:5678/api/works/${i}`, {
					method: 'DELETE',
					headers: myHeaders,
				}).then((response) => {
					if (response.ok) {
						console.log('ok');
						listToDelete.shift();
						if (listToDelete.length === 0) {
							const gallery = document
								.getElementsByClassName('gallery')
								.item(0);
							gallery.innerHTML = '';
							updateGallery();
						}
					}
				});
			}
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
				const gallery = document
					.getElementsByClassName('gallery')
					.item(0);
				gallery.innerHTML = '';
				updateGallery();
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
const output = document.getElementById('output');
function outputSize(width, height) {
	output.style.width = `${width}px`;
	output.style.height = `${height}px`;
}

function openAddNewProject() {
	document.getElementById('addImg').addEventListener('click', () => {
		document.getElementById('addProjectModal').style.visibility = 'visible';
		document.getElementById('delProjectModal').style.visibility =
			'collapse';
		resetForm();
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
adminVisibility();
openModal();
closeModalFunction();
ProjectToBeDel();

output.addEventListener('click', resetForm);

function resetForm() {
	addProjectForm.reset();
	document.querySelector('.photoSubmit label').style.display = 'flex';
	output.src = URL.revokeObjectURL;
	outputSize(0.1, 0.1);
}

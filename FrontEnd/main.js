import { updateGallery } from './gallery.js';

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

backToDeleteProject();
openAddNewProject();
addProject();
updateGallery();
validateChanges();
adminVisibility();
openModal();
closeModal();
ProjectToBeDel();
deleteGallery();

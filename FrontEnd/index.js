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
		const apparts = document.getElementById('apparts');
		const hotelresto = document.getElementById('hotelresto');
		const tous = document.getElementById('tous');
		console.log(objets);
		objets.addEventListener('click', function () {
			for (let i = 0; i < newArray.length; i++) {
				if (newArray[i] !== 1) {
					figure[i].style.display = 'none';
				} else if (newArray[i] == 1) {
					figure[i].style.display = 'initial';
				}
			}
		});
		apparts.addEventListener('click', function () {
			for (let i = 0; i < newArray.length; i++) {
				if (newArray[i] !== 2) {
					figure[i].style.display = 'none';
				} else if (newArray[i] == 2) {
					figure[i].style.display = 'initial';
				}
			}
		});
		hotelresto.addEventListener('click', function () {
			for (let i = 0; i < newArray.length; i++) {
				if (newArray[i] !== 3) {
					figure[i].style.display = 'none';
				} else if (newArray[i] == 3) {
					figure[i].style.display = 'initial';
				}
			}
		});
		tous.addEventListener('click', function () {
			for (let i = 0; i < newArray.length; i++) {
				if (newArray[i] !== 0) {
					figure[i].style.display = 'initial';
				}
			}
		});
	})

	.catch(function (err) {
		console.log('erreur fetch api');
	});

/* login */

let myToken;
let form = document.getElementById('form2');
if (form === null) {
	console.log('you are not on logged in');
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
					alert('erreur email / mot de passe');
				}
			})
			.then((data) => {
				myToken = data.token;
			})
			.then(() => {
				console.log(myToken);
				localStorage.setItem('token', myToken);
				document.location = `index.html?jwt=${myToken}`;
			});
	});
}
let editHeader = document.getElementById('editHeader');
let log = document.getElementById('log');
let modifyProject = document.getElementById('modifyProject');
console.log(editHeader);
if (localStorage.getItem('token') === null) {
	editHeader.style.display = 'none';
	modifyProject.style.display = 'none';
} else {
	editHeader.style.display = 'flex';
	modifyProject.style.display = 'flex';
	log.innerHTML = '<a href="login.html" >logout</a>';
	log.addEventListener('click', function (e) {
		e.preventDefault();
		localStorage.clear();
		location.reload();
	});
}

const loadFile = function (event) {
	output.src = URL.createObjectURL(event.target.files[0]);
	output.style.width = `120px`;
	output.style.height = `160px`;
	document.querySelector('.photoSubmit label').style.display = 'none';
};

function openModal() {
	let openModify = document.getElementById('openModify');
	openModify.addEventListener('click', () => {
		let modal = document.getElementById('modal');
		modal.style.display = 'flex';
	});
}
function ModalNoDisplay() {
	modal.style.display = 'none';
}
function closeModal() {
	document.addEventListener('click', function (event) {
		if (
			event.target.matches('#closeModify') ||
			event.target.matches('#modal')
		) {
			ModalNoDisplay();
		}
	});
}
const output = document.getElementById('output');
function outputSize(width, height) {
	output.style.width = `${width}px`;
	output.style.height = `${height}px`;
}

const addProjectForm = document.getElementById('addProject');

function resetForm() {
	addProjectForm.reset();
	document.querySelector('.photoSubmit label').style.display = 'flex';
	output.src = URL.revokeObjectURL;
	outputSize(0.1, 0.1);
	document.getElementById('addValid').style.backgroundColor = '#A7A7A7';
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

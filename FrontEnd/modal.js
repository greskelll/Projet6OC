const loadFile = function (event) {
	output.src = URL.createObjectURL(event.target.files[0]);
	outputSize(140, 200);
	document.querySelector('.photoSubmit label').style.display = 'none';
};

function openModal() {
	let openModify = document.getElementById('openModify');
	openModify.addEventListener('click', () => {
		let modalContouring = document.getElementById('modalContouring');
		modalContouring.style.display = 'flex';
	});
}
function ModalNoDisplay() {
	modalContouring.style.display = 'none';
}
function closeModal() {
	document.addEventListener('click', function (event) {
		if (
			event.target.matches('#closeModify') ||
			event.target.matches('#modalContouring')
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

let addProjectForm = document.getElementById('addProject');

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
const selectElement = document.getElementById('addProject');
const validButton = document.getElementById('addValid');

selectElement.addEventListener('change', () => {
	validButton.style.backgroundColor = '#1D6154';
});

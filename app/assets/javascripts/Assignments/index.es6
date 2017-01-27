$(document).ready(() => {
  new ModalMarkus('#upload_dialog', '#uploadModal');
  new ModalMarkus('#download_dialog', '#downloadModal');
});

function choose_upload(value) {
  document.getElementById('file_format').value = value;
}

function toggleElem(id) {
  let elem = document.getElementById(id);
  let elem_display = elem.style.display;

  elem.style.display = (elem_display === 'none') ? 'block' : 'none';
}

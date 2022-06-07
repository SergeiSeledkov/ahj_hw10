import AddPost from './AddPost';
import CheckValid from './CheckValid';

const inputField = document.querySelector('.input-field');
const modal = document.querySelector('.modal');
const modalInput = document.querySelector('.modal-input');
const modalButtonCancel = document.querySelector('.modal-button-cancel');
const modalButtonOk = document.querySelector('.modal-button-ok');
const modalError = document.querySelector('.modal-error');

inputField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    if (inputField.value !== '') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const addPost = new AddPost(inputField.value, `[${latitude}, ${longitude}]`);

          addPost.createPost();
          inputField.value = '';
        }, () => {
          modal.classList.remove('hidden');
          modalInput.select();
        });
      }
    }
  }
});

function clearFieldAndHideModal() {
  modalInput.value = '';
  inputField.value = '';
  modal.classList.add('hidden');
}

modalButtonCancel.addEventListener('click', () => {
  clearFieldAndHideModal();

  if (!modalError.classList.contains('hidden')) {
    modalError.classList.add('hidden');
    modalError.textContent = '';
  }
});

modalButtonOk.addEventListener('click', () => {
  const checkValid = new CheckValid(modalInput.value);
  const returnValidator = checkValid.validator();

  if ((typeof returnValidator) === 'object') {
    const addPost = new AddPost(inputField.value, `[${returnValidator.latitude}, ${returnValidator.longitude}]`);

    addPost.createPost();
    clearFieldAndHideModal();
  } else {
    modalError.textContent = returnValidator;
    modalError.classList.remove('hidden');
  }
});

import formValid from './modules/validation';
import btnAnim from './modules/button';
import validInputs from './modules/valid-inputs';

// Form Validation
if (document.getElementsByClassName('index-form').length > 0) {
  btnAnim();
  const form = document.querySelector('.index-form');
  const submitForm = formValid();
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    btnAnim().animInit(submitForm);
  });
  form.addEventListener('blur', e => validInputs(e.target), true);
}

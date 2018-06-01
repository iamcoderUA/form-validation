export const errorMessage = {
  email: 'Указанный Вами e-mail имеет неверный формат',
  password: 'Пароль должен быть не менее 4 символов',
  network: 'Подключение к интернету нарушено',
  error: 'Произошла ошибка на сервере',
  success: 'Регистрация прошла успешно, проверьте почту',
}
export const errorInputText = document.querySelector('.login-form__error-text');
export const errorPopup = document.querySelector('.login-form__error');

export default function validInputs(input) {
  let flag;
  let checkEmail;
  const passwordError = document.querySelector('.login-form__password-error');
  const regexp = /^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  const removeClasses = (value) => {
    value.classList.remove('js-invalid');
    value.classList.remove('js-checked');
    passwordError.classList.remove('js-active');
    errorPopup.classList.remove('js-active');
  };
  const addInvalidClasses = (value) => {
    value.classList.add('js-invalid');
    value.classList.remove('js-checked');
    flag = false;
  };
  const addCheckedClass = (value) => {
    value.classList.add('js-checked');
    value.classList.remove('js-invalid');
    flag = true;
  };

  if (!input.value) {
    removeClasses(input);
    flag = false;
  } else {
    switch (input.getAttribute('name')) {
      case 'email':
        checkEmail = regexp.test(input.value);
        if (!checkEmail)  {
          addInvalidClasses(input);
          errorInputText.textContent = errorMessage.email;
          errorPopup.classList.add('js-active');
        }
        else {
          addCheckedClass(input);
          errorPopup.classList.remove('js-active');
        }
        break;
      case 'password':
        if (input.value.length < 4) {
          addInvalidClasses(input);
          passwordError.classList.add('js-active');
          errorPopup.classList.add('js-active');
          errorInputText.textContent = errorMessage.password
        }
        else {
          addCheckedClass(input);
          passwordError.classList.remove('js-active');
          errorPopup.classList.remove('js-active');
        }
        break;
      case 'checkbox':
        if (!input.checked) addInvalidClasses(input);
        else addCheckedClass(input);
        break;
      default:
        console.error('No Inputs found');
    }
  }
  return flag;
}

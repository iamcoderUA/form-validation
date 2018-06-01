import validInputs from './valid-inputs';
import { errorMessage, errorInputText, errorPopup } from './valid-inputs';

import getRadioBtnValue from './valid-radio-btns';

export default function formValid() {
  const form = document.querySelector('.index-form');
  const inputs = form.getElementsByClassName('login-form__input');

  function sendEmail(url, data) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      const jsonData = JSON.stringify(data);
      request.open('POST', url, true);
      request.setRequestHeader('Content-Type', 'application/json');
      request.addEventListener('load', () => {
        if (request.status < 400) {
          resolve(errorMessage.success);
        }
        else {
          errorInputText.textContent = errorMessage.error;
          errorPopup.classList.add('js-active');
          reject(errorMessage.error);
        }
      });
      request.addEventListener('error', () => {
        reject(errorMessage.network);
      });
      request.send(jsonData);
      form.reset();
    });
  }

  function valid() {
    const flag = [].map.call(inputs, val => validInputs(val));
    if (flag.every(value => value)) {
      const data = {};
      for (let j = 0; j < inputs.length; j++) {
        if (inputs[j].getAttribute('name') === 'email') data.email = inputs[j].value;
        if (inputs[j].getAttribute('name') === 'password') data.password = inputs[j].value;
        if (inputs[j].getAttribute('name') === 'checkbox') data.agreenment = inputs[j].checked;
      }
      data.currency = getRadioBtnValue();
      sendEmail('http://localhost:55800/send-mail', data).then((text) => {
        errorInputText.textContent = text;
        errorPopup.classList.add('js-active', 'js-success');
      }, (error) => {
        errorInputText.textContent = error;
        errorPopup.classList.add('js-active');
      });
    }
  }
  return {
    submitInit() {
      valid();
    },
  };
}

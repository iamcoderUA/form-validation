export default function btnAnim() {
  const buttons = document.getElementsByClassName('login-form__submit-btn');

  function anim(e) {
    const addDiv = document.createElement('div');
    const mValue = Math.max(this.clientWidth, this.clientHeight);
    const rect = this.getBoundingClientRect();
    const sDiv = addDiv.style;
    const px = 'px';

    [sDiv.width, sDiv.height] = [mValue + px, mValue + px];
    sDiv.left = `${e.clientX - rect.left - (mValue / 2)}px`;
    sDiv.top = `${e.clientY - rect.top - (mValue / 2)}px`;

    addDiv.classList.add('pulse');
    this.appendChild(addDiv);
  }

  [].forEach.call(buttons, (e) => {
    e.addEventListener('click', anim);
  });

  return {
    animInit(valid) {
      valid.submitInit();
    },
  };
}

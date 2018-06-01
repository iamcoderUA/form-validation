export default function getRadioBtnValue() {
  let currency;
  const radioBtns = document.getElementsByName('currency');

  for (let i = 0; i < radioBtns.length; i++) {
    if (radioBtns[i].checked) {
      currency = radioBtns[i].value;
    }
  }
  return currency;
}

import "./style.css";

const elements = [
  document.querySelector('.switch'),
  document.querySelector('#component'),
  document.querySelector('#options'),
  document.querySelector('#prononciation'),
  document.querySelector('#finder'),
  document.querySelector('#suggestion'),
  document.querySelector('#serif'),
  document.querySelector('#sans-serif'),
  document.querySelector('#inter'),
  document.body
];

const toggleDarkTheme = (isChecked) => {
  const classAction = isChecked ? 'add' : 'remove';
  elements.forEach(element => element.classList[classAction]('dark-theme'));
};

elements[0].addEventListener('click', (e) => {
  toggleDarkTheme(e.target.checked);
});

const fontschange = [
  document.body,
  document.querySelector('#serif'),
  document.querySelector('#sans-serif'),
  document.querySelector('#inter'),
  document.querySelector('h1'),
  document.querySelector('#finder'),
  document.querySelector('#prononciation'),
  ...document.querySelectorAll('h2')
];

function changeFontFamily(font) {
  fontschange.forEach(element => {
    element.style.fontFamily = font;
  });
}

document.querySelector('#serif').addEventListener('click', () => changeFontFamily('serif'));
document.querySelector('#sans-serif').addEventListener('click', () => changeFontFamily('sans-serif'));
document.querySelector('#inter').addEventListener('click', () => changeFontFamily('monospace'));

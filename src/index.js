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

const serif = document.querySelector('#serif');
const sansserif = document.querySelector('#sans-serif');
const inter =  document.querySelector('#inter');

serif.addEventListener('click', (e) => {
  document.body.style.fontFamily = 'serif';
});

sansserif.addEventListener('click', (e) => {
  document.body.style.fontFamily = 'sans-serif';
});

inter.addEventListener('click', (e) => {
  document.body.style.fontFamily = 'monospace';
});
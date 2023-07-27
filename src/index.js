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
  document.querySelector('#resultat'),
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
  document.querySelector('#resultat'),
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

let form = document.querySelector('#searchbar');
form.addEventListener('submit', function (e) {
  e.preventDefault();
});

function search() {
  const resultat = document.querySelector('#resultat');
  const word = document.querySelector('#finder').value.toLowerCase();

  if (!word) {
    resultat.textContent = "Veuillez remplir ce champ !";
    return;
  }

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayWordData(data))
    .catch(error => {
      resultat.textContent = "Aucune définition trouvée !";
    });
}

function displayWordData(data) {
  const word = document.querySelector('#finder').value.toLowerCase();
  const textLists = Array.from(document.querySelectorAll('ul > li'));
  const nomdumot = document.querySelector('#nom_mot');
  const prononciation = document.querySelector('#prononciation');
  const audioelement = document.querySelector('#audioprono');
  const synonymous = document.querySelector('#synonymous');
  const synonymousTitle = document.querySelector('h2 > #synonymous-title');

  for (let words of data) {
    const { meanings, phonetics } = words;
    const definitions = meanings.map(meaning => meaning.definitions[0].definition);
    const syn = meanings[0].synonyms;
    const prononcia = phonetics[0].text;
    const audioprononciation = phonetics[0].audio;

    textLists.forEach((textList, index) => {
      textList.textContent = definitions[index] || '';
      textList.style.display = definitions[index] ? 'block' : 'none';
    });

    synonymous.textContent = syn.join(', ');
    nomdumot.textContent = word;
    prononciation.textContent = "[" + prononcia + "]";
    audioelement.src = audioprononciation;
    audioelement.style.display = audioprononciation ? 'block' : 'none';
    synonymousTitle.style.display = syn.length > 0 ? 'block' : 'none';
  }
}

document.querySelector('#loupe-recherche').addEventListener('click', search);




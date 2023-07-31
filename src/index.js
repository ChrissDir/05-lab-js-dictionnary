import "./style.scss";

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
  const textLists = document.querySelector('ul');
  const nomdumot = document.querySelector('#nom_mot');
  const prononciation = document.querySelector('#prononciation');
  const audioelement = document.querySelector('#audioprono');
  const synonymous = document.querySelector('#synonymous');
  const synonymousTitle = document.querySelector('#synonymous-title');

  for (let words of data) {
    const { meanings, phonetics } = words;
    const wordDefinitions = [];
    meanings.forEach(meaning => {
      meaning.definitions.forEach(definition => {
        wordDefinitions.push(definition.definition);
      });
    });
    console.log(wordDefinitions);
    const syn = meanings[0]?.synonyms ?? [];
    const prononcia = phonetics[0]?.text ?? '';
    const audioprononciation = phonetics[0]?.audio ?? '';

    textLists.textContent = "";
    wordDefinitions.forEach((definition) => {
      textLists.innerHTML += `<li>${definition}</li>`;
    });

    synonymous.textContent = syn.join(', ');
    nomdumot.textContent = word;
    prononciation.textContent = "[" + prononcia + "]";
    prononciation.style.display = prononcia ? 'inline' : 'none';
    audioelement.src = audioprononciation;
    audioelement.style.display = audioprononciation ? 'block' : 'none';
    synonymousTitle.style.display = syn.length > 0 ? 'block' : 'none';
    resultat.textContent = "";
  }
}

document.querySelector('#loupe-recherche').addEventListener('click', search);



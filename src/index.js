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

function search() {
  let word = document.querySelector('#finder').value;
  let resultat = document.querySelector('#resultat');
  let textlist = document.querySelector('ul.texte');
  let nomdumot = document.querySelector('#nom_mot');
  let prononciation = document.querySelector('#prononciation');

  if (word.length != 0) {
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;

    fetch(url).then(response => response.json().then(data => {
      console.log(data);
      try {

        for (let words of data) {
          let definition = words.meanings[0].definitions[0].definition;
          let syn = words.meanings[0].synonyms[0];
          let prononcia = words.phonetics[0].text;

          textlist.textContent = definition;
          synonymous.textContent = syn;
          nomdumot.textContent = word;
          prononciation.textContent = "["+ prononcia +"]";

        }
// mettre suggestion en display none
      } catch (error) {
        resultat.textContent = "Aucune définition trouvée !";
      }

    }));

  }else{

    resultat.textContent = "Veuillez remplir ce champ !";

  }
}

document.querySelector('#loupe-recherche').addEventListener('click', search);


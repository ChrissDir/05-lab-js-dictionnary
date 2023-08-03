import "./style.scss";

// Préparation des div à changer lors du click dans un array
let ligne = document.querySelectorAll('li');
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
  elements.forEach(element => {
    element.classList[classAction]('dark-theme')
  });
  ligne.forEach(li => {
    li.classList[classAction]('dark-theme')
  });
};

elements[0].addEventListener('click', function (e) {
  if (e.target.tagName === 'INPUT') {
    toggleDarkTheme(e.target.checked);
  }

});


// Préparation des div à changer lors du click dans un array
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

// Fonction appelée sur chaque bouton
function changeFontFamily(font) {
  fontschange.forEach(element => {
    element.style.fontFamily = font;
  });
}

// Assignation de chaque bouton en fonction de son nom et ce qu'il doit faire
document.querySelector('#serif').addEventListener('click', () => changeFontFamily('serif'));
document.querySelector('#sans-serif').addEventListener('click', () => changeFontFamily('sans-serif'));
document.querySelector('#inter').addEventListener('click', () => changeFontFamily('monospace'));

// Pour empêcher le formulaire d'agir par défaut lors du submit
let form = document.querySelector('#searchbar');
form.addEventListener('submit', function (e) {
  e.preventDefault();
});

// Fonction utilisée pour l'envoi de la requête
function search() {
  const resultat = document.querySelector('#resultat');

  // Utilisation de la fonction toLowerCase pour éviter les erreurs de majuscule dans l'URL
  const word = document.querySelector('#finder').value.toLowerCase();

  // Messages d'erreur lorsqu'aucun mot a été marqué dans la recherche
  if (!word) {
    resultat.textContent = "Veuillez remplir ce champ !";
    return;
  }
  // Appel de l'API en fonction de la constante url et de la constante appelée word
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayWordData(data))
    .catch(error => {
      resultat.textContent = "Aucune définition trouvée !";
      console.log(error);
    });
}

function displayWordData(data) {

  // Préparation des constantes essentielles pour la suite
  const word = document.querySelector('#finder').value.toLowerCase();
  const textLists = document.querySelector('ul');
  const nomdumot = document.querySelector('#nom_mot');
  const prononciation = document.querySelector('#prononciation');
  const audioelement = document.querySelector('#audioprono');
  const synonymous = document.querySelector('#synonymous');
  const synonymousTitle = document.querySelector('#synonymous-title');

  // boucle pour les datas récupérées avec le fetch de la fonction search
  for (let words of data) {
    const { meanings, phonetics } = words;
    const wordDefinitions = [];

    // Pour chaque meaning, push sa définition
    meanings.forEach(meaning => {
      meaning.definitions.forEach(definition => {
        wordDefinitions.push(definition.definition);
      });
    });

    // Recherche dans la première définition les synonymes présents, sa prononciation et son audio
    const syn = meanings[0]?.synonyms ?? [];
    const prononcia = phonetics[0]?.text ?? '';
    let audioprononciation = phonetics[0]?.audio ?? '';

    // S'arrete au premier audio trouvé parmi les 5 premiers
    if (audioprononciation === '') {
      audioprononciation = phonetics[1]?.audio ?? '';
    }

    if (audioprononciation === '') {
      audioprononciation = phonetics[2]?.audio ?? '';
    }

    if (audioprononciation === '') {
      audioprononciation = phonetics[3]?.audio ?? '';
    }

    if (audioprononciation === '') {
      audioprononciation = phonetics[4]?.audio ?? '';
    }

    if (audioprononciation === '') {
      audioprononciation = phonetics[5]?.audio ?? '';
    }

    // Reset ce qu'il y a dans textLists et crée une ligne pour chaque définition trouvée dans wordDefinitions
    textLists.textContent = "";
    if (!resultat.classList.contains('dark-theme')) {
      wordDefinitions.forEach((definition) => {
        textLists.innerHTML += `<li>${definition}</li>`;
      })
    } else {
      wordDefinitions.forEach((definition) => {
        textLists.innerHTML += `<li class="dark-theme">${definition}</li>`;
      })
    };

    // Enlève et affiche ce qu'il faut lorsqu'un contenu est vide
    synonymous.textContent = syn.join(', ');
    nomdumot.textContent = word;
    prononciation.textContent = "[" + prononcia + "]";
    prononciation.style.display = prononcia ? 'inline' : 'none';
    audioelement.src = audioprononciation;
    audioelement.style.display = audioprononciation ? 'block' : 'none';
    synonymousTitle.style.display = syn.length > 0 ? 'block' : 'none';
    resultat.textContent = "";

  }

  ligne = document.querySelectorAll('li');
}


document.querySelector('#loupe-recherche').addEventListener('click', search);



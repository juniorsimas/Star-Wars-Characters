let currentPageUrl = 'https://swapi.dev/api/people/';

window.onload =  async () => {
  try {
    await loadCharacters(currentPageUrl);
  } catch (error) {
    console.log('Erro ao carregar cards' + error);
    alert('Erro ao carregar cards');
  }

  const nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', loadNextPage);
  
  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', loadPreviousPage);
};

async function loadCharacters(url){
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ' '; // limpar os resultados anteriores

  try {
    const response = await fetch(url);
    const responseJson =  await response.json();

    responseJson.results.forEach((character) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
      card.className = "cards";

      const characterNameBg = document.createElement("div");
      characterNameBg.className = "character-name-bg";

      const characterName = document.createElement("span");
      characterName.className = "character-name";
      characterName.innerText = `${character.name}`;

      characterNameBg.appendChild(characterName);
      card.appendChild(characterNameBg);
      
      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = '';

        const characterImage = document.createElement("div");
        characterImage.style.backgroundImage = 
        `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
        characterImage.className = "character-image";

        const name = document.createElement("span");
        name.className = "character-details";
        name.innerText = `Nome: ${character.name}`;

        const characterHeight = document.createElement("span");
        characterHeight.className = "character-details";
        characterHeight.innerText = `Altura: ${converHeight(character.height)}`;

        const mass = document.createElement("span");
        mass.className = "character-details";
        mass.innerText = `Peso: ${convertMass(character.mass)}`;

        const eyeColor = document.createElement("span");
        eyeColor.className = "character-details";
        eyeColor.innerText = `olhos: ${convertEyeColor(character.eye_color)}`;
      
        const birthYear = document.createElement("span");
        birthYear.className = "character-details"
        birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`; 
      
        modalContent.appendChild(characterImage);
        modalContent.appendChild(name);
        modalContent.append(characterHeight);
        modalContent.appendChild(mass);
        modalContent.appendChild(eyeColor);
        modalContent.appendChild(birthYear);
      };

      mainContent.appendChild(card);
    });

    // Habilita ou desabilita os botões de acordo com a presença de URLs de próxima e página anterior
    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    nextButton.disabled = !responseJson.next;
    backButton.disabled = !responseJson.previous;

    backButton.style.visibility = responseJson.previous? "visible" : "hidden";
    nextButton.style.visibility = responseJson.next? "visible" : "hidden";
    currentPageUrl = url;

  } catch (error) {
    console.log('Erro ao carregar os personagens '+ error);
    alert('Erro ao carregar os personagens ');
  }
}

async function loadNextPage(){
  if(!currentPageUrl) return;
  
  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

   await loadCharacters(responseJson.next);
 } catch (error){
   console.log('Erro ao carregar a próxima pagina ' +error);
   alert('Erro ao carregar a próxima pagina');
 }
}

async function loadPreviousPage(){
  if(!currentPageUrl) return

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();
    
    await loadCharacters(responseJson.previous);
  }catch (error){
    console.log('Erro ao carregar a pagina anterior ' +error);
   alert('Erro ao carregar a pagina anterior');
  }
}

function hideModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}

function convertEyeColor(eyeColor){
  const cores = {
    blue: "azul",
    brown: "castanho",
    green: "verde",
    yellow: "amarelo",
    black: "preto",
    pink: "rosa",
    red: "vermelho",
    orange: "laranja",
    hazel: "avela",
    gray: "cinza",
    ["blue-gray"]: "cinza azulado",
    ["red, blue"]:"vermelho, azul",
    ["green, yellow"]: "verde, amarelo",
    gold: "ouro",
    white: "branco",
    unknown: "desconhecida"
  };

  return cores[eyeColor.toLowerCase()] || eyeColor;
}

function converHeight(height){
  if (height === "unknown"){
    return "desconhecida";
  }

  return `${(height / 100).toFixed(2)}m`;
}

function convertMass(mass){
  if (mass === "unknown"){
    return "desconhecido";
  }

  return `${mass} kg`;
}

function convertBirthYear(birthYear){
  if (birthYear === "unknown"){
    return "desconhecido";
  }
   
  return birthYear;
}

// Função para manipular o menu mobile

function meuMenu(){
  const x = document.getElementById("myLinks");
  if (x.style.display === "block"){
      x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


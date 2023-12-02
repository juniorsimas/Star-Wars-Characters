let currentPageUrl = 'https://swapi.dev/api/starships/';

window.onload =  async () => {
  try {
    await loadStarships(currentPageUrl);
  } catch (error) {
    console.log('Erro ao carregar cards' + error);
    alert('Erro ao carregar cards');
  }

  const nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', loadNextPage);
  
  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', loadPreviousPage);
};

async function loadStarships(url){
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ' '; // limpar os resultados anteriores

  try {
    const response = await fetch(url);
    const responseJson =  await response.json();

    responseJson.results.forEach((starships) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/starships/${starships.url.replace(/\D/g, "")}.jpg'),
                                    url('./assets/big-placeholder2.webp')`;
      card.className = "cards";

      const starshipNameBg = document.createElement("div");
      starshipNameBg.className = "character-name-bg";

      const starshipName = document.createElement("span");
      starshipName.className = "character-name";
      starshipName.innerText = `${starships.name}`;

      starshipNameBg.appendChild(starshipName);
      card.appendChild(starshipNameBg);
      
      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = '';

        const starshipsImage = document.createElement("div");
        starshipsImage.style.backgroundImage = 
        `url('https://starwars-visualguide.com/assets/img/starships/${starships.url.replace(/\D/g, "")}.jpg'),
         url('./assets/big-placeholder2.webp')`;
         starshipsImage.className = "character-image";
11
        const starshipsName = document.createElement("span");
        starshipsName.className = "character-details";
        starshipsName.innerText = `Nome: ${starships.name}`;

        const starshipsLength = document.createElement("span");
        starshipsLength.className = "character-details";
        starshipsLength.innerText = `Comprimento: ${converteStarshipsHeight(starships.length)}`;
        
        const starshipsSpeed = document.createElement("span");
        starshipsSpeed.className = "character-details";
        starshipsSpeed.innerText = `Velocidade: ${converteStarshipsSpeed(starships.max_atmosphering_speed)}`;

        const starshipCrew = document.createElement("span");
        starshipCrew.className = "character-details";
        starshipCrew.innerText = `Tripulantes: ${converteStarshipsPassengers(starships.crew)}`;

        const starshipsPassengers = document.createElement("span");
        starshipsPassengers.className = "character-details";
        starshipsPassengers.innerText = `Passageiros: ${converteStarshipsPassengers(starships.passengers)}`;
        
        
        modalContent.appendChild(starshipsImage);
        modalContent.appendChild(starshipsName);
        modalContent.appendChild(starshipsLength);
        modalContent.appendChild(starshipsSpeed);
        modalContent.appendChild(starshipCrew);
        modalContent.appendChild(starshipsPassengers);
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

   await loadStarships(responseJson.next);
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
    
    await loadStarships(responseJson.previous);
  }catch (error){
    console.log('Erro ao carregar a pagina anterior ' +error);
   alert('Erro ao carregar a pagina anterior');
  }
}

function hideModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}


// Função de conversão de altura
function converteStarshipsHeight(height){
    if (height === "unknown" || height === "n/a"){
      return "desconhecida";
    }
    return `${(height)}m`;
}


// função de converção da velocidade
function converteStarshipsSpeed(speed){
  if (speed === "unknown" || speed === "n/a"){
    return "desconhecida";
  }
  return `${(speed / 100).toFixed(2)}km/h`;
}

// função de conversão de pessoas
function converteStarshipsPassengers(passengers){
  if (passengers === "unknown" || passengers === "n/a"){
    return "desconhecida";
  }else{
    if (passengers === "0"){
      return "nenhuma pessoa";
    }else if (passengers === "1"){
      return `${passengers} pessoa`;
    }
  }
  return `${passengers} pessoas`;
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


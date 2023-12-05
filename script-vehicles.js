let currentPageUrl = 'https://swapi.dev/api/vehicles/';

window.onload =  async () => {
  try {
    await loadVehicles(currentPageUrl);
  } catch (error) {
    console.log('Erro ao carregar cards' + error);
    alert('Erro ao carregar cards');
  }

  const nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', loadNextPage);
  
  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', loadPreviousPage);
};

async function loadVehicles(url){
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ' '; // limpar os resultados anteriores

  try {
    const response = await fetch(url);
    const responseJson =  await response.json();

    responseJson.results.forEach((vehicles) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/vehicles/${vehicles.url.replace(/\D/g, "")}.jpg'),
                                    url('./assets/big-placeholder2.webp')`;
      card.className = "cards";

      const vehicleNameBg = document.createElement("div");
      vehicleNameBg.className = "character-name-bg";

      const vehicleName = document.createElement("span");
      vehicleName.className = "character-name";
      vehicleName.innerText = `${vehicles.name}`;

      vehicleNameBg.appendChild(vehicleName);
      card.appendChild(vehicleNameBg);
      
      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = '';

        const vehiclesImage = document.createElement("div");
        vehiclesImage.style.backgroundImage = 
        `url('https://starwars-visualguide.com/assets/img/vehicles/${vehicles.url.replace(/\D/g, "")}.jpg'),
         url('./assets/big-placeholder2.webp')`;
         vehiclesImage.className = "character-image";
11
        const vehiclesName = document.createElement("span");
        vehiclesName.className = "character-details";
        vehiclesName.innerText = `Nome: ${vehicles.name}`;

        const vehiclesLength = document.createElement("span");
        vehiclesLength.className = "character-details";
        vehiclesLength.innerText = `Comprimento: ${converteStarshipsHeight(vehicles.length)}`;
        
        const vehiclesSpeed = document.createElement("span");
        vehiclesSpeed.className = "character-details";
        vehiclesSpeed.innerText = `Velocidade: ${converteStarshipsSpeed(vehicles.max_atmosphering_speed)}`;

        const vehicleCrew = document.createElement("span");
        vehicleCrew.className = "character-details";
        vehicleCrew.innerText = `Tripulantes: ${converteStarshipsPassengers(vehicles.crew)}`;

        const vehiclesPassengers = document.createElement("span");
        vehiclesPassengers.className = "character-details";
        vehiclesPassengers.innerText = `Passageiros: ${converteStarshipsPassengers(vehicles.passengers)}`;
        
        
        modalContent.appendChild(vehiclesImage);
        modalContent.appendChild(vehiclesName);
        modalContent.appendChild(vehiclesLength);
        modalContent.appendChild(vehiclesSpeed);
        modalContent.appendChild(vehicleCrew);
        modalContent.appendChild(vehiclesPassengers);
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

   await loadVehicles(responseJson.next);
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
    
    await loadVehicles(responseJson.previous);
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


let currentPageUrl = 'https://swapi.dev/api/planets/';

window.onload =  async () => {
  try {
    await loadPlanets(currentPageUrl);
  } catch (error) {
    console.log('Erro ao carregar cards' + error);
    alert('Erro ao carregar cards');
  }

  const nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', loadNextPage);
  
  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', loadPreviousPage);
};

async function loadPlanets(url){
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ' '; // limpar os resultados anteriores

  try {
    const response = await fetch(url);
    const responseJson =  await response.json();

    responseJson.results.forEach((planets) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg'),
                                    url('./assets/big-placeholder2.webp')`;
      card.className = "cards";

      const planetNameBg = document.createElement("div");
      planetNameBg.className = "character-name-bg";

      const planetName = document.createElement("span");
      planetName.className = "character-name";
      planetName.innerText = `${planets.name}`;

      planetNameBg.appendChild(planetName);
      card.appendChild(planetNameBg);
      
      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = '';

        const planetsImage = document.createElement("div");
        planetsImage.style.backgroundImage = 
        `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg'),
         url('./assets/big-placeholder2.webp')`;
         planetsImage.className = "character-image";

        const planetsName = document.createElement("span");
        planetsName.className = "character-details";
        planetsName.innerText = `Nome: ${planets.name}`;

        const planetsRotationPeriod = document.createElement("span");
        planetsRotationPeriod.className = "character-details";
        planetsRotationPeriod.innerText = `Periodo de Rotacao: ${convertePlanetsSpeed(planets.rotation_period)}`;
        
        const planetsPeriodOrbital = document.createElement("span");
        planetsPeriodOrbital.className = "character-details";
        planetsPeriodOrbital.innerText = `Periodo orbital: ${convertPlanetPeriodOrbital(planets.orbital_period)}`;

        const planetsDiameter = document.createElement("span");
        planetsDiameter.className = "character-details";
        planetsDiameter.innerText = `Diametro: ${convertePlanetsSpeed((planets.diameter/100).toFixed(2))}`;

        const planetsClimate = document.createElement("span");
        planetsClimate.className = "character-details";
        planetsClimate.innerText = `Clima: ${convertePlanetsClimate(planets.climate)}`;
        
        
        modalContent.appendChild(planetsImage);
        modalContent.appendChild(planetsName);
        modalContent.appendChild(planetsRotationPeriod);
        modalContent.appendChild(planetsPeriodOrbital);
        modalContent.appendChild(planetsDiameter);
        modalContent.appendChild(planetsClimate);
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

   await loadPlanets(responseJson.next);
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
    
    await loadPlanets(responseJson.previous);
  }catch (error){
    console.log('Erro ao carregar a pagina anterior ' +error);
   alert('Erro ao carregar a pagina anterior');
  }
}

function hideModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}


// // Função de conversão de altura
// function convertePlanetsHeight(height){
//     if (height === "unknown" || height === "n/a"){
//       return "desconhecida";
//     }
//     return `${(height)}m`;
// }


// função de converção da velocidade
function convertePlanetsSpeed(speed){
  if (speed === "unknown" || speed === "n/a" || speed === "nan" || speed == "0" || speed == 0 || speed < 0 || speed === "NAN"){
    return "desconhecida";
  } 
  return `${speed} km/h`;
}

function convertPlanetPeriodOrbital(periodOrbital){
    if (periodOrbital === "unknown" || periodOrbital === "n/a"){
        return "desconhecido";
    }
    return `${periodOrbital} dias`;    
}


function convertePlanetsClimate(climate){
  const climas = {
    arid: "arido",
    temperate: "temperado",
    tropical: "tropical",
    frozen: "congelado",
    murky: "obscuro",
    windy: "ventoso",
    hot: "quente",
    ["artificial temperate"]: "temperatura artificial",
    frigid: "gelado",
    humid: "umido",
    moist: "umido",
    polluted: "poluido",
    unknown: "desconhecido",
    superheated: "superaquecido",
    subartic: "subartico",
    artic: "artico",
    rocky: "rochoso"
  };

  return climas[climate.toLowerCase()] || convertClimates(climate, climas);
}


// Essa função recebe uma cadeia de climas em inglês e converte para português
function convertClimates(climaIngles,climas){
  // Primeiro, eu separo a cadeia de climas em um array, usando a vírgula como separador
  let arrayClimas = climaIngles.split(",");
  // Depois, eu crio um novo array vazio para armazenar as climas em português
  let arrayPortugues = [];
  // Então, eu uso um loop for para percorrer cada clima em inglês e converter para português usando a função anterior
  for (let i = 0; i < arrayClimas.length; i++) {
    // Eu uso a função trim() para remover os espaços em branco antes e depois do clima
    let clima = arrayClimas[i].trim();
    // Eu uso a função inArray() para verificar se o clima existe no array de climas
    if(clima in climas){
      // Eu uso a função convertePlanetsClimate() para obter a clima em português
      let climaPortugues = convertePlanetsClimate(clima);
      // Eu adiciono a clima em português ao novo array
      arrayPortugues.push(climaPortugues);
    }else{
      arrayPortugues.push(clima);
    } 
  }
  // Por fim, eu uso a função join() para juntar o array de climas em português em uma cadeia, usando a vírgula como separador
  let cadeiaPortugues = arrayPortugues.join(", ");
  // Eu retorno a cadeia de climas em português
  return cadeiaPortugues;
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

// Função para corrigig o favicon, caso não carregue do proprio projeto
function colocarPlaceholder(elemento){
  elemento.href = "https://juniorsimas.github.io/Star-Wars-Characters/assets/millennium-falcon.ico"
}


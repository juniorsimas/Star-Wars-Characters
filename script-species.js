let currentPageUrl = 'https://swapi.dev/api/species/';

window.onload =  async () => {
  try {
    await loadSpecies(currentPageUrl);
  } catch (error) {
    console.log('Erro ao carregar cards' + error);
    alert('Erro ao carregar cards');
  }

  const nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', loadNextPage);
  
  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', loadPreviousPage);
};

async function loadSpecies(url){
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ' '; // limpar os resultados anteriores

  try {
    const response = await fetch(url);
    const responseJson =  await response.json();

    responseJson.results.forEach((species) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/species/${species.url.replace(/\D/g, "")}.jpg')`;
      card.className = "cards";

      const specieNameBg = document.createElement("div");
      specieNameBg.className = "character-name-bg";

      const specieName = document.createElement("span");
      specieName.className = "character-name";
      specieName.innerText = `${species.name}`;

      specieNameBg.appendChild(specieName);
      card.appendChild(specieNameBg);
      
      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = '';

        const speciesImage = document.createElement("div");
        speciesImage.style.backgroundImage = 
        `url('https://starwars-visualguide.com/assets/img/species/${species.url.replace(/\D/g, "")}.jpg')`;
        speciesImage.className = "character-image";

        const speciesName = document.createElement("span");
        speciesName.className = "character-details";
        speciesName.innerText = `Nome: ${species.name}`;

        const speciesClassification = document.createElement("span");
        speciesClassification.className = "character-details";
        speciesClassification.innerText = `Classificacao: ${convertClassification(species.classification)}`;
        
        const speciesHeight = document.createElement("span");
        speciesHeight.className = "character-details";
        speciesHeight.innerText = `Altura: ${converteSpeciesHeight(species.average_height)}`;


        const speciesSkinColors = document.createElement("span");
        speciesSkinColors.className = "character-details";
        speciesSkinColors.innerText = `Cores da Pele: ${convertSpeciesSkinColors(species.skin_colors)}`;
        // speciesSkinColors.innerText = `Cores da Pele: ${species.skin_colors}`;
        
        const speciesHairColors = document.createElement("span");
        speciesHairColors.className = "character-details";
        speciesHairColors.innerText = `Cores de Cabelo: ${species.hair_colors}`;

        const speciesEyeColors = document.createElement("span");
        speciesEyeColors.className = "character-details";
        speciesEyeColors.innerText = `Cores dos Olhos: ${species.eye_colors}`;
        
        modalContent.appendChild(speciesImage);
        modalContent.appendChild(speciesName);
        modalContent.appendChild(speciesClassification);
        modalContent.appendChild(speciesHeight);
        modalContent.appendChild(speciesSkinColors);
        modalContent.appendChild(speciesHairColors);
        modalContent.appendChild(speciesEyeColors);
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

   await loadSpecies(responseJson.next);
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
    
    await loadSpecies(responseJson.previous);
  }catch (error){
    console.log('Erro ao carregar a pagina anterior ' +error);
   alert('Erro ao carregar a pagina anterior');
  }
}

function hideModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}


function convertReleaseDate(releaseDate){
  if (releaseDate === "unknown"){
      return "desconhecido";
  }else{
    // separa a data em um array de strings
      let partes = releaseDate.split("-");
      
      // inverte a ordem do array
      let invertido = partes.reverse();

      // junta o array em uma string com o separador "/"
      let resultado = invertido.join("/");
      return resultado;
  }

}


// converter Classificação de Especie
function convertClassification(classification){
  const classificacao = {
    mammal: "mamifero",
    artificial: "artificial",
    sentient: "reptiliano",
    gastropod: "gastropode",
    reptile: "reptil",
    amphibian: "anfibio",
    mammals: "mamifero",
    inspectoid: "inspetoroide",
    reptilian: "reptiliano",
    unknown: "desconhecido(a)"
  };
  return classificacao[classification.toLowerCase()] || classification
}

// Função de conversão de altura
function converteSpeciesHeight(height){
    if (height === "unknown" || height === "n/a"){
      return "desconhecida";
    }

    return `${(height / 100).toFixed(2)}m`;

}

// função de conversçao de cor da pede

function convertSpeciesSkinColors(skinColors){
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
   // ["red, blue"]:"vermelho, azul",
    //["green, yellow"]: "verde, amarelo",
    gold: "ouro",
    white: "branco",
    caucasian: "caucasiano",
    asian: "asiatico(a)",
    hispanic: "hispanico",
    blonde: "loiro(a)",
    tan: "bronzeado",
    pale: "palido",
    unknown: "desconhecida",
    ["n/a"]: "desconhecida",
    dark: "escuro",
    magenta: "magenta"
  };

  return cores[skinColors.toLowerCase()] || convertColors(skinColors, cores);
}



// Essa função recebe uma cadeia de cores em inglês e converte para português
function convertColors(corIngles,cores){
  // Primeiro, eu separo a cadeia de cores em um array, usando a vírgula como separador
  let arrayCores = corIngles.split(",");
  // Depois, eu crio um novo array vazio para armazenar as cores em português
  let arrayPortugues = [];
  // Então, eu uso um loop for para percorrer cada cor em inglês e converter para português usando a função anterior
  for (let i = 0; i < arrayCores.length; i++) {
    // Eu uso a função trim() para remover os espaços em branco antes e depois da cor
    let cor = arrayCores[i].trim();
    // Eu uso a função inArray() para verificar se a cor existe no array de cores
    if(cor in cores){
      // Eu uso a função convertSpeciesSkinColors() para obter a cor em português
      let corPortugues = convertSpeciesSkinColors(cor);
      // Eu adiciono a cor em português ao novo array
      arrayPortugues.push(corPortugues);
    }else{
      arrayPortugues.push(cor);
    } 
    
  }
  // Por fim, eu uso a função join() para juntar o array de cores em português em uma cadeia, usando a vírgula como separador
  let cadeiaPortugues = arrayPortugues.join(", ");
  // Eu retorno a cadeia de cores em português
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


let currentPageUrl = 'https://swapi.dev/api/films/';

window.onload =  async () => {
  try {
    await loadFilmsCharacters(currentPageUrl);
  } catch (error) {
    console.log('Erro ao carregar cards' + error);
    alert('Erro ao carregar cards');
  }

  const nextButton = document.getElementById('next-button');
  nextButton.addEventListener('click', loadNextPage);
  
  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', loadPreviousPage);
};

async function loadFilmsCharacters(url){
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = ' '; // limpar os resultados anteriores

  try {
    const response = await fetch(url);
    const responseJson =  await response.json();

    responseJson.results.forEach((films) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/films/${films.url.replace(/\D/g, "")}.jpg')`;
      card.className = "cards";

      const filmsTitleBg = document.createElement("div");
      filmsTitleBg.className = "character-name-bg";

      const filmsTitle = document.createElement("span");
      filmsTitle.className = "character-name";
      filmsTitle.innerText = `${films.title}`;

      filmsTitleBg.appendChild(filmsTitle);
      card.appendChild(filmsTitleBg);
      
      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = '';

        const filmsImage = document.createElement("div");
        filmsImage.style.backgroundImage = 
        `url('https://starwars-visualguide.com/assets/img/films/${films.url.replace(/\D/g, "")}.jpg')`;
        filmsImage.className = "character-image";

        const title = document.createElement("span");
        title.className = "character-details";
        title.innerText = `Título: ${films.title}`;

        const filmsEpisode = document.createElement("span");
        filmsEpisode.className = "character-details";
        filmsEpisode.innerText = `Epsodio: ${(films.episode_id)}`;

         const director = document.createElement("span");
         director.className = "character-details";
         director.innerText = `Diretor: ${films.director}`;

        const producer = document.createElement("span");
        producer.className = "character-details";
        producer.innerText = `Produtor: ${films.producer}`;
      
        const release_date = document.createElement("span");
        release_date.className = "character-details"
        release_date.innerText = `Data: ${convertReleaseDate(films.release_date)}`; 
      
        modalContent.appendChild(filmsImage);
        modalContent.appendChild(title);
        modalContent.appendChild(filmsEpisode);
        modalContent.append(director);
        modalContent.appendChild(producer);
        modalContent.appendChild(release_date);
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

   await loadFilmsCharacters(responseJson.next);
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
    
    await loadFilmsCharacters(responseJson.previous);
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

// Função para manipular o menu mobile
function meuMenu(){
  const x = document.getElementById("myLinks");
  if (x.style.display === "block"){
      x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


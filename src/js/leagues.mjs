import { fetchTournaments } from "./api.mjs";

export function renderLeaguesTemplate(league) {

    const leagueTemplate = `
        <div class="leagueCarousel">
            <div class="leagueCard">
                <img src="${league.leagueImage}" alt="${league.leagueName}" class="leagueLogo">
                <h3 class="leagueName">${league.leagueName}</h3>
            </div>
        </div>
    `;
    return leagueTemplate;
}

export default class leagSlider {

    constructor(teams) {
        let leaguesArr = {};
      teams.data.leagues.forEach(league => {
        let obj = {};
        obj.leagueName =  league.name;
        obj.leagueImage = league.image;
        obj.leagueRegion = league.region;
        if(!leaguesArr[league.region]) {
            leaguesArr[league.region] = [];
        }
        leaguesArr[league.region].push(obj);
      });
      this.leagues = leaguesArr;
    }

    renderContentSlider() {
        const mainContainer = document.getElementById('leaguescarousel');
        // Iterate over leagues and render each league card
        Object.keys(this.leagues).forEach(region => {

            const carouselContainer = document.createElement('div');
        carouselContainer.classList.add('carousel');

        // Create an inner container for the carousel items
        const carouselInner = document.createElement('div');
        carouselInner.classList.add('carousel-inner');

        // Access the array of leagues for the current region
        const leaguesInRegion = this.leagues[region];

        // Iterate over each league in the current region
        leaguesInRegion.forEach((league, index) => {
            // Create a carousel item for the league
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            // Add 'active' class to the first item
            if (index === 0) {
                carouselItem.classList.add('active');
            }

            // Render the league card HTML using the provided template function
            const leagueCardHTML = renderLeaguesTemplate(league);

            // Append the league card HTML to the carousel item
            const tempElement = document.createElement('div');
                tempElement.innerHTML = leagueCardHTML;

            tempElement.childNodes.forEach(childNode => {
                carouselItem.appendChild(childNode.cloneNode(true));
            });

            // Append the carousel item to the carousel inner container
            carouselInner.appendChild(carouselItem);
        });

        // Append the carousel inner container to the carousel container
        carouselContainer.appendChild(carouselInner);

        // Add carousel controls
        carouselContainer.innerHTML += `
            <button class="carousel-control-prev" type="button" data-bs-target="#${region}-carousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${region}-carousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        `;

        // Append the carousel container to the main container
        mainContainer.appendChild(carouselContainer);

        });

    }
}
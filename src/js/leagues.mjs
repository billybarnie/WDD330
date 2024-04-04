import { fetchAndStoreLeagues } from "./api.mjs";
import { retrieveDataFromLocalStorage } from "./utils.mjs";

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

    constructor () {
        this.loading = true;

        retrieveDataFromLocalStorage()
        .then(leaguesData => {
            this.loading = false; // Hide loading indicator on successful data retrieval
            leaguesData ? this.parseLeaguesData(leaguesData) : fetchAndStoreLeagues();
        })
        .catch(error => {
            console.error('Error retrieving leagues data:', error);
            this.loading = false; // Hide loading indicator on error
        });

    }

    parseLeaguesData(leaguesData) {

        try {
            const leagues = JSON.parse(leaguesData);

            if (leagues && leagues.data && leagues.data.leagues) {
                let leaguesArr = {};
                leagues.data.leagues.forEach(league => {
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
                this.renderContentSlider();
            } else {
                console.error('Invalid leagues data format.');
            }
        } catch (error) {
            console.error('Error fetching and storing leagues data:', error);
        }
    }

    renderContentSlider() {
        const mainContainer = document.getElementById('leaguescarousel');
        mainContainer.innerHTML = '';
        if (this.loading) {
            // Show loading indicator
            mainContainer.innerHTML = '<div class="loading-indicator">Loading...</div>';
            return;
        }
        const regionsContainer = this.createRegionsContainer();
        const toggleButton = this.createToggleButton(regionsContainer);
        Object.entries(this.leagues).forEach(([region, leagues]) => {
            const carouselContainer = this.createCarouselContainer(region, leagues);
            const regionButton = this.createRegionButton(region, carouselContainer);
            mainContainer.appendChild(regionButton);
            mainContainer.appendChild(carouselContainer);
            if (!this.firstCarouselDisplayed) {
                carouselContainer.style.display = 'block';
                this.firstCarouselDisplayed = true;
            } else {
                carouselContainer.style.display = 'none';
            }
            regionsContainer.appendChild(regionButton);
        });
    
        toggleButton.appendChild(regionsContainer);
        mainContainer.appendChild(toggleButton);
    }

    createRegionsContainer() {
        const regionsContainer = document.createElement('div');
        regionsContainer.classList.add('regions-container');
        regionsContainer.style.display = 'none';
        return regionsContainer;
    }

    createToggleButton(regionsContainer) { 

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Regions';
        const toggleButtonId = 'regionsToggleButton';
        toggleButton.id = toggleButtonId;
        toggleButton.addEventListener('click', () => {
            regionsContainer.classList.toggle('show');
            if (regionsContainer.style.display === 'none') {

                regionsContainer.style.display = 'block';

            } else {
                regionsContainer.style.display = 'none';
                
            }
        });
        return toggleButton;
    }

    createCarouselContainer(region) {
        const carouselContainer = document.createElement('div');
        carouselContainer.classList.add('carousel');
        const carouselInner = this.createCarouselInner(region);
        carouselContainer.appendChild(carouselInner);
        if (this.leagues[region].length === 1) {
            carouselContainer.appendChild(this.createPrevButton(region, carouselInner, true));
            carouselContainer.appendChild(this.createNextButton(region, carouselInner, true));
        } else {
        carouselContainer.appendChild(this.createPrevButton(region, carouselInner, false));
        carouselContainer.appendChild(this.createNextButton(region, carouselInner, false));
        }
        return carouselContainer;
    }

    createCarouselInner(region) {
        const carouselInner = document.createElement('div');
        carouselInner.classList.add('carousel-inner');
        this.leagues[region].forEach((league, index) => {
            const carouselItem = this.createCarouselItem(league, index === 0);
            carouselInner.appendChild(carouselItem);
        });
        return carouselInner;
    }

    createCarouselItem(league, isActive) { 
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
            if (isActive) {
                carouselItem.classList.add('active');
            }
        const leagueCardHTML = renderLeaguesTemplate(league);
        const tempElement = document.createElement('div');
        tempElement.innerHTML = leagueCardHTML;
        tempElement.childNodes.forEach(childNode => {
            carouselItem.appendChild(childNode.cloneNode(true));
        });
        return carouselItem;
    }

    createPrevButton(region, carouselInner, hide) {
        const prevButton = document.createElement('button');
        prevButton.classList.add('carousel-control-prev');
        prevButton.type = 'button';
        prevButton.dataset.bsTarget = `#${region}-carousel`;
        prevButton.dataset.bsSlide = 'prev';
        prevButton.innerHTML = `
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">⇦</span>
        `;
        if(hide == true) {
            prevButton.style.display = 'none';
        }
        prevButton.addEventListener('click', () => {
            const slides = carouselInner.querySelectorAll('.carousel-item');
            const currentActiveIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
            const nextIndex = (currentActiveIndex - 1 + slides.length) % slides.length;
            slides[currentActiveIndex].classList.remove('active');
            slides[nextIndex].classList.add('active');
        });
        return prevButton;
    }

    createNextButton(region, carouselInner, hide) {
        const nextButton = document.createElement('button');
        nextButton.classList.add('carousel-control-next');
        nextButton.type = 'button';
        nextButton.dataset.bsTarget = `#${region}-carousel`;
        nextButton.dataset.bsSlide = 'next';
        nextButton.innerHTML = `
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">⇨</span>
        `;
        if(hide == true) {
            nextButton.style.display = 'none';
        }
        nextButton.addEventListener('click', () => {
            const slides = carouselInner.querySelectorAll('.carousel-item');
            const currentActiveIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
            const nextIndex = (currentActiveIndex + 1) % slides.length;
            slides[currentActiveIndex].classList.remove('active');
            slides[nextIndex].classList.add('active');
        });
        return nextButton;
    }

    createRegionButton(region, carouselContainer) {
        const regionButton = document.createElement('button');
        const regionButtonId = `regButton`; 
        regionButton.id = regionButtonId;
            regionButton.textContent = region;
            regionButton.addEventListener('click', () => {
                document.querySelectorAll('.carousel').forEach(carousel => {
                    carousel.style.display = 'none';
                });
                carouselContainer.style.display = 'block';
            });
        return regionButton;
    }
}
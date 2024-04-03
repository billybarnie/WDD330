import { fetchAndStoreVODs } from "./api.mjs";

export function renderVODsTemplate(vod) {

    const VODtemplate = `
        <div class="VSDisplay">
            <div class="VStop"><img src="${vod.team1Image}"/><span>${vod.team1Name}</span></div>
            <span class="VSText">VS</span>
            <div class="VSBottom"><span>${vod.team2Name}</span><img src="${vod.team2Image}"/></div>
        </div>
    `;
    return VODtemplate;
}

export default class VODSlider {

    constructor() {
        // Check if VODs data is in localStorage
        const vodsData = localStorage.getItem('vodsData');

        if (!vodsData) {
            // If data is not in localStorage, fetch and store it
            this.fetchAndStoreVODs();
        } else {
            // Parse the data from localStorage
            this.parseVODsData(vodsData);
        }
    }

    async fetchAndStoreVODs() {
        try {
            // Fetch VODs data
            const vodsData = await fetchAndStoreVODs();

            // Check if data was successfully fetched
            if (vodsData) {
                // Store the fetched data in localStorage
                localStorage.setItem('vodsData', JSON.stringify(vodsData));
                console.log('VODs data stored in localStorage.');
                
                // Parse the data
                this.parseVODsData(JSON.stringify(vodsData));
            } else {
                console.log('Failed to fetch VODs data.');
            }
        } catch (error) {
            console.error('Error fetching and storing VODs data:', error);
        }
    }


    parseVODsData(vodsData) {

        try {

            const vods = JSON.parse(vodsData);

            let vodsArr = [];
            if (vods && vods.data && vods.data.schedule && vods.data.schedule.events) {
                vods.data.schedule.events.forEach(e => {
                    let obj = {};
                    obj.team1Name =  e.match.teams[0].name;
                    obj.team1Image = e.match.teams[0].image;
                    obj.team2Name = e.match.teams[1].name;
                    obj.team2Image = e.match.teams[1].image;
                    e.games.forEach(game => {
                        game.vods.forEach((v) => {
                            obj.vod = v;
                            vodsArr.push(obj);
                        })
                    })
                });
            } else {
                console.error('Invalid VODs data format.');
            }
            
            this.vods = vodsArr;
        } catch (error) {
            console.error('Error fetching and storing VODs data:', error);
        }
    }

    renderSlider() {
        const htmlItems = [];
        const maxItems = document.getElementById('matches').classList.contains('expanded') ? this.vods.length : 6;
        for (let i = 0; i < maxItems; i++)  {
            htmlItems.push(renderVODsTemplate(this.vods[i]));
        };

        document.querySelector('#vods').innerHTML = htmlItems.join(' ');

    }

    expandContent() {
        const button = document.getElementById('expand');
        const content = document.getElementById('matches');
        
        button.addEventListener('click', () => {
            content.classList.toggle('expanded');
            if (content.classList.contains('expanded')) {
                button.textContent = 'Collapse';
            } else {
                button.textContent = 'Expand';
            }

            this.renderSlider();
        });
    }

}
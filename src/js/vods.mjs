import { fetchAndStoreVODs } from "./api.mjs";
import { retrieveVODsDataFromLocalStorage } from "./utils.mjs";

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

        this.loading = true;
        this.initialize();
    }

    async initialize() {
        try {
            const vodsData = await retrieveVODsDataFromLocalStorage();
            if (vodsData) {
                this.loading = false;
                this.parseVODsData(vodsData);

            } else {
                await fetchAndStoreVODs();
                const updatedVODs = await retrieveVODsDataFromLocalStorage();
                this.loading = false;
                this.parseVODsData(updatedVODs);

            }
        } catch (error) {
            console.error('Error initializing TournTable:', error);
            this.loading = false;
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
                
                this.vods = vodsArr;
                this.renderSlider();
            } else {
                console.error('Invalid VODs data format.');
            }
        } catch (error) {
            console.error('Error fetching and storing VODs data:', error);
        }
    }

    renderSlider() {
        if (!this.vods) return;
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
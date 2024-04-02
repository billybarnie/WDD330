import { fetchVODs } from "./api.mjs";

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

    constructor(vods) {
        let vodsArr = [];
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
    }

    renderSlider() {
        const htmlItems = [];
        const maxItems = document.getElementById('matches').classList.contains('expanded') ? this.vods.length : 5;
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
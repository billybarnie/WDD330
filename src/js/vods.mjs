import { fetchVODs } from "./api.mjs";

window.plusSlides = function(n) {
    showSlides(slideIndex += n);
}

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

export function renderCarousel(parameter) {

    const VODCarousel = `
        <div class="carousel">
            <div class="testingCArousel"> ${parameter}
        </div>
    `
    return VODCarousel;
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


    renderCarousels (product) {
        const numImages = product.Images.ExtraImages;
        let div = '';
        if (numImages != null) {
          for (let i = 0; i < numImages.length; i++) {
            const imageSelect = `
                <div class="myImage fade">
                  <div class="numTest">${i + 1}/${numImages.length}</div>
                  <img src="${numImages[i].Src}" alt="${numImages[i].Title}">
                </div>`
              console.log(numImages);
              div += imageSelect;
            } 
          const arrowButtons = `
          <a class="previous" onclick="plusSlides(-1)">&#10094;</a>
          <a class="next" onclick="plusSlides(1)">&#10095;</a>`;
          div += arrowButtons;
        } else {
          return `<img class="divider" src="${product.Images.PrimaryLarge}`
        }
        return div;
      }

    
    renderSlider() {
        const htmlItems = [];
        this.vods.forEach((vod) =>  {
            htmlItems.push(renderVODsTemplate(vod));
        });

        document.querySelector('#vods').innerHTML = htmlItems.join(' ');

    }

    /*renderCarousel() {
        const htmlItems = [];
        this.vods.forEach((vod) => {
            htmlItems.push(renderCarousel(parameter));
        });

        document.querySelector('#vods').innerHTML = htmlItems.join(' ');

    }*/
  }
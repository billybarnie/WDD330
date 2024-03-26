import { fetchVODs } from "./api.mjs";

export function renderVODsTemplate(vods) {
    // Check if vods is not an array or if it's empty
    if (!Array.isArray(vods) || vods.length === 0) {
        return ''; // Return an empty string if vods is not an array or is empty
    }
    // Map each VOD to its corresponding HTML template
    const vodTemplates = vods.map(vod => {
        return `
            <div class="vod">
                <h3>${vod.title}</h3>
                <p>${vod.description}</p>
                <img src="${vod.thumbnailUrl}" alt="${vod.title}">
            </div>
        `;
    });

    // Join all VOD templates into a single string
    return vodTemplates.join('');
}

export class VODSlider {
    constructor(vods, duration) {
      this.vods = vods;
      this.duration = duration;
      this.vodIndex = 0;
      this.MAX_VOD_INDEX = Math.min(4, this.vods.length - 1); // Maximum index for the first five VODs or less if there are fewer than five VODs
      this.intervalId = null; // Interval ID for the setInterval function
    }
  
    start() {
      if (!this.vods || this.vods.length === 0) return;
      this.intervalId = setInterval(() => {
        this.vodIndex++;
        if (this.vodIndex > this.MAX_VOD_INDEX) {
          this.stop(); // Stop iteration when reaching the maximum index
          return;
        }
        this.showVOD(this.vodIndex);
      }, this.duration);
    }
  
    stop() {
      clearInterval(this.intervalId);
    }
  
    showVOD(index) {
      const currentVOD = this.vods[index];
      // Update UI or perform other actions with the current VOD
    }
  }
  
  const vods = fetchVODs();
  const duration = 5000;
  const vodSlider = new VODSlider(vods, duration);
  vodSlider.start(); // Start iterating through VODs
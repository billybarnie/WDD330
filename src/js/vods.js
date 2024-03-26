import { renderVODsTemplate } from './vods.mjs'
import { fetchVODs } from './api.mjs';

export async function renderVODs() {
    const vodsSection = document.getElementById('vods');

    try {
        // Fetch VODs data
        const vods = await fetchVODs();

        // Render VODs HTML and append it to the vods section
        vodsSection.innerHTML = renderVODsTemplate(vods);
    } catch (error) {
        console.error('Failed to fetch VODs:', error);
    }
}
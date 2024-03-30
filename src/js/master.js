import { fetchVODs } from './api.mjs';
import { loadHeaderFooter, loadIntro } from './utils.mjs';
import VODSlider from './vods.mjs';

const vods = await fetchVODs();
const vodSlider = new VODSlider(vods, 30);
loadHeaderFooter();
loadIntro();
vodSlider.renderSlider();
//vodSlider.renderCarousel();

document.addEventListener('DOMContentLoaded', async () => {
    const hamButton = document.getElementById('navToggle');
    const navigation = document.querySelector('.navbar');

    hamButton.addEventListener('click', async function() {
        navigation.classList.toggle('open');

    });
});
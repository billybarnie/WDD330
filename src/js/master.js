import { fetchVODs } from './api.mjs';
import { loadHeaderFooter, loadIntro } from './utils.mjs';
import VODSlider from './vods.mjs';
import { setup } from './utils.js';

const vods = await fetchVODs();
const vodSlider = new VODSlider(vods, 30);
loadHeaderFooter(setup);
loadIntro();
vodSlider.renderSlider();

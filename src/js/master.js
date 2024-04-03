import { fetchTournaments, fetchAndStoreVODs, fetchLeagues, fetchAndStoreTournaments } from './api.mjs';
import { loadHeaderFooter, loadIntro } from './utils.mjs';
import VODSlider from './vods.mjs';
import { setup } from './animatedNav.js';
import leagSlider from './leagues.mjs';

const vods = await fetchAndStoreTournaments();
const vodSlider = new VODSlider(vods, 30);
const league = await fetchLeagues();
const leagueSlider = new leagSlider(league);
loadHeaderFooter(setup);
loadIntro();
vodSlider.renderSlider();
vodSlider.expandContent();
leagueSlider.renderContentSlider();
fetchAndStoreTournaments();

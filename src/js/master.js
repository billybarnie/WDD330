import { fetchAndStoreVODs, fetchAndStoreLeagues, fetchAndStoreTournaments } from './api.mjs';
import { loadHeaderFooter, loadIntro } from './utils.mjs';
import VODSlider from './vods.mjs';
import { setup } from './animatedNav.js';
import leagSlider from './leagues.mjs';
import TournTable from './tournament.mjs';



loadHeaderFooter(setup);
loadIntro();
const vods = await fetchAndStoreVODs();
const vodSlider = new VODSlider(vods, 30);
vodSlider.renderSlider();
vodSlider.expandContent();
const league = await fetchAndStoreLeagues();
const leagueSlider = new leagSlider(league);
leagueSlider.renderContentSlider();
const tournaments = await fetchAndStoreTournaments();
const tourn = new TournTable(tournaments);
tourn.renderTournaments();

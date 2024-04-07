import { fetchAndStoreTournaments } from "./api.mjs";
import { retrieveTournamentDataFromLocalStorage } from "./utils.mjs";

export default class TournTable  {

    constructor () {

        this.loading = true;
        this.tournamentsByLeague = {};
        this.initialize().then(() => {
            this.renderTournaments();
        });

    }

    async initialize() {
        try {
            const tournaments = await retrieveTournamentDataFromLocalStorage();
            if (tournaments) {
                this.loading = false;
                this.parseTournamentsData(tournaments);
            } else {
                await fetchAndStoreTournaments();
                const updatedTournaments = await retrieveTournamentDataFromLocalStorage();
                this.loading = false;
                this.parseTournamentsData(updatedTournaments);
            }
        } catch (error) {
            console.error('Error initializing TournTable:', error);
            this.loading = false;
        }
    }

    parseTournamentsData(tournaments) {
        try {
            const tournData = JSON.parse(tournaments);

            if (tournData && tournData.data && tournData.data.leagues) {
                let tournamentsArr = [];
                let tournamentsByLeague = {};
                tournData.data.leagues.forEach(league => {
                    if (league.tournaments && league.tournaments.length > 0) {
                        league.tournaments.forEach(tournament => {
                            if (tournament.season && tournament.season.name) {
                                let obj = {};
                                obj.leagueName = league.name;
                                obj.season = tournament.season.name;
                                tournamentsArr.push(obj);

                                if (!tournamentsByLeague[league.name]) {
                                    tournamentsByLeague[league.name] = [];
                                }
                                tournamentsByLeague[league.name].push(tournament.season.name);
                            }
                        });
                    }
                });
                this.tournaments = tournamentsArr;
                this.tournamentsByLeague = tournamentsByLeague;
                this.renderTournaments();

                localStorage.setItem('tournaments', JSON.stringify(this.tournaments));
            } else {
                console.error('Invalid tournament data format.');
            }

        } catch (error) {
            console.error('Error fetching and storing tournament data:', error);
        }

    }

    renderTournaments() {
        
        const container = document.getElementById('tournamentTable');
        if (!container) {
            console.error('Container element not found.');
            return;
        }

        const table = this.createTable();
        const tableBody = this.createTableBody();
        const tournamentsByLeague = this.tournamentsByLeague;

        this.createTableHeader(tournamentsByLeague, tableBody);
        this.populateTableBody(tournamentsByLeague, tableBody);

        table.appendChild(tableBody);
        container.innerHTML = ''; 
        container.appendChild(table);

    }

    createTable() {
        const table = document.createElement('table');
        table.className = 'tournamentTable';
        return table;
    }

    createTableBody() {
        return document.createElement('tbody');
    }

    createTableHeader(tournamentsByLeague, tableBody) {
        const seasonsSet = new Set();
        Object.values(tournamentsByLeague).forEach(seasons => {
            seasons.forEach(season => seasonsSet.add(season));
        });
        const seasonsArray = [...seasonsSet];
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `<th>League Name</th>`;
        seasonsArray.forEach(season => {
            headerRow.innerHTML += `<th>${season}</th>`;
        });
        tableBody.appendChild(headerRow);
    }

    populateTableBody(tournamentsByLeague, tableBody) {
        const seasonsArray = [...this.getSeasonsSet(tournamentsByLeague)];
        Object.entries(tournamentsByLeague).forEach(([leagueName, seasons]) => {
            const row = document.createElement('tr');
            row.id = `row`;
            row.innerHTML = `<td id="leagueName">${leagueName}</td>`;
            seasonsArray.forEach(season => {
                row.innerHTML += `<td id="yearid">${seasons.includes(season) ? 'X' : ''}</td>`;
            });
            tableBody.appendChild(row);
        });
    }

    getSeasonsSet(tournamentsByLeague) {
        const seasonsSet = new Set();
        Object.values(tournamentsByLeague).forEach(seasons => {
            seasons.forEach(season => seasonsSet.add(season));
        });
        return seasonsSet;
    }

}
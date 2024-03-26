/*fetching all three API's from the external source and puts them 
inside their respective functions to be manipulated*/
async function fetchLeagues() {
    const url = 'https://valorant-esports.p.rapidapi.com/leagues';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'db0cc0e9d0mshd7f797250995b65p164180jsn10bfc6d09bf1',
            'X-RapidAPI-Host': 'valorant-esports.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchTournaments() {
    const url = 'https://valorant-esports.p.rapidapi.com/tournaments';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'db0cc0e9d0mshd7f797250995b65p164180jsn10bfc6d09bf1',
            'X-RapidAPI-Host': 'valorant-esports.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchVODs() {
    const url = 'https://valorant-esports.p.rapidapi.com/vods';
    const tournamentId = '106994073508509683';
    const limit = 50; // Limiting to the first 50 VODs
    const queryParams = new URLSearchParams({ tournamentId, limit });

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'db0cc0e9d0mshd7f797250995b65p164180jsn10bfc6d09bf1',
            'X-RapidAPI-Host': 'valorant-esports.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(`${url}?${queryParams}`, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { fetchLeagues, fetchTournaments, fetchVODs };
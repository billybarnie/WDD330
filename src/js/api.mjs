//const xRapidAPIKey = import.meta.env.X_RAPIDAPI_KEY;
//const xRapidAPIHost = import.meta.env.X_RAPIDAPI_HOST;

/*fetching all three API's from the external source and puts them 
inside their respective functions to be manipulated*/
export async function fetchLeagues() {
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

export async function fetchTournaments() {
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
    const url = 'https://valorant-esports.p.rapidapi.com/vods?tournamentId=106994073508509683&limit=50';

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

export async function fetchAndStoreVODs() {
    try {
        // Fetch VODs data
        const vodsData = await fetchVODs();

        // Check if data was successfully fetched
        if (vodsData) {
            // Store the fetched data in localStorage
            localStorage.setItem('vodsData', JSON.stringify(vodsData));
            console.log('VODs data stored in localStorage.');
        } else {
            console.log('Failed to fetch VODs data.');
        }
    } catch (error) {
        console.error('Error fetching and storing VODs data:', error);
    }
}

export async function fetchAndStoreTournaments() {
    try {
        // Fetch tournaments
        const tournaments = await fetchTournaments();

        // Check if tournaments were successfully fetched
        if (tournaments) {
            // Store tournaments in localStorage
            localStorage.setItem('tournaments', JSON.stringify(tournaments));
            console.log('Tournaments fetched and stored successfully:', tournaments);
        } else {
            console.log('Failed to fetch tournaments.');
        }
    } catch (error) {
        console.error('Error fetching tournaments:', error);
    }
}
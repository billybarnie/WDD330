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

export async function fetchVODs() {
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
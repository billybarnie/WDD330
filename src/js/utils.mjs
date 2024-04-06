
/*/This is the header and footer call to load the header and footer dynamically from 
the public/partials folder
*/
export async function loadHeaderFooter(callback) {
    const headerTemplate = await loadTemplate('public/partials/header.html');
    const footerTemplate = await loadTemplate('public/partials/footer.html');

    const headerElem = document.getElementById('header');
    headerElem.innerHTML = headerTemplate;
    document.body.prepend(headerElem);

    const footerElem = document.getElementById('footer');
    footerElem.innerHTML = footerTemplate;
    document.body.append(footerElem);

    if (callback) {
        callback();
    }
}

// Function to load a template from a given path
async function loadTemplate(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to fetch template from ${path}`);
    }
    return response.text();
}

//Loading intro message
export async function loadIntro(callback) {
    const introTemplate = await loadIntroTemple('public/partials/intro.html');
    
    const introElem = document.getElementById('intro');
    introElem.innerHTML = introTemplate;
    document.body.prepend(introElem);

    if(callback) {
        callback();
    }
}

async function loadIntroTemple(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to fetch template from ${path}`);
    }
    return response.text();
}

export async function retrieveVODsDataFromLocalStorage() {
    return new Promise((resolve, reject) => {
        const vodsData = localStorage.getItem('vodsData');
        if (vodsData) {
            resolve(vodsData);
        } else {
            reject(new Error('No VODs data found in local storage.'));
        }
    });
}

export async function retrieveLeaguesDataFromLocalStorage() {

    return new Promise((resolve, reject) => {
    const leaguesData = localStorage.getItem('leaguesData');

    if (leaguesData) {
        resolve(leaguesData);
    } else {
        reject(new Error('No data found in local storage.'));
    }
});
}

export async function retrieveTournamentDataFromLocalStorage() {
    return new Promise((resolve, reject) => {
        const tournaments = localStorage.getItem('tournaments');
    
        if (tournaments) {
            resolve(tournaments);
        } else {
            reject(new Error('No data found in local storage.'));
        }
    });
}


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
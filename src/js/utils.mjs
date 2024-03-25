async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate('/partials/header.html');
    const footerTemplate = await loadTemplate('/partials/footer.html');

    const headerElem = document.getElementById('header');
    headerElem.innerHTML = headerTemplate;
    document.body.prepend(headerElem);

    const footerElem = document.getElementById('footer');
    footerElem.innerHTML = footerTemplate;
    document.body.append(footerElem);
}

// Function to load a template from a given path
async function loadTemplate(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to fetch template from ${path}`);
    }
    return response.text();
}

// Call the loadHeaderFooter function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadHeaderFooter();
});
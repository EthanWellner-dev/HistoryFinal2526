window.addEventListener('DOMContentLoaded', () => {
    loadFragment('navbar.html', 'navbar-container');
    loadFragment('footer.html', 'footer-container');
});

function loadFragment(url, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${url}`);
            }
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
        })
        .catch(error => {
            console.error(error);
            container.innerHTML = `<div class="alert alert-danger">Unable to load ${url}</div>`;
        });
}

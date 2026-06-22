window.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const artifactType = params.get('artifact');
    
    if (!artifactType) {
        document.getElementById('artifact-content').innerHTML = `
            <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">No Artifact Selected</h4>
                <p>Please select an artifact from the menu to view details.</p>
                <a href="home.html" class="btn btn-primary">Back to Home</a>
            </div>
        `;
        return;
    }

    document.title = `Women's Sports Museum - ${artifactType}`;
    loadArtifact(artifactType);
});

function loadArtifact(artifactType) {
    const markdownPath = `artifacts/data/${artifactType}.md`;
    const imagePath = `artifacts/images/${artifactType}.jpg`;
    const jsonPath = 'artifacts/data/artifacts.json';

    Promise.all([
        fetchTextCached(markdownPath).then(text => text),
        fetchJsonCached(jsonPath).then(json => json)
    ])
        .then(([markdown, metadata]) => {
            const titleMatch = markdown.match(/^#\s+(.+)$/m);
            const pageTitle = titleMatch ? titleMatch[1].trim() : artifactType.replace(/[-_]/g, ' ');
            const bodyMarkdown = markdown.replace(/^#\s+.+$/m, '').trim();
            const bodyHtml = marked.parse(bodyMarkdown);
            const decade = artifactType.match(/^(\d+s)/)?.[1] || 'Artifact';
            const allArtifacts = Object.values(metadata).flat();
            const artifactData = allArtifacts.find(item => item.id === artifactType) || {};
            const sources = Array.isArray(artifactData.sources) ? artifactData.sources : [];
            const sourcesHtml = sources.length > 0 ? `
                <section class="artifact-sources mt-5">
                    <h2>Sources</h2>
                    <ul>
                        ${sources.map(source => `
                            <li><a href="${source}" target="_blank" rel="noopener noreferrer">${source}</a></li>
                        `).join('')}
                    </ul>
                </section>
            ` : `
                <section class="artifact-sources mt-5">
                    <h2>Sources</h2>
                    <p>No sources are listed for this artifact.</p>
                </section>
            `;

            const artifactCardSection = `
                <section class="artifact-section py-5">
                    <div class="container">
                        <h1 class="text-center mb-5" style="font-size:50px;"><b>${pageTitle}</b></h1>
                        <div class="row justify-content-center align-items-center g-5">
                            <div class="col-lg-6 text-center">
                                <img src="${imagePath}" class="img-fluid rounded-4 shadow-lg" alt="${pageTitle}" onerror="this.style.display='none';">
                            </div>
                            <div class="col-lg-10 mx-auto artifact-content">
                                ${bodyHtml}
                                ${sourcesHtml}
                                <div class="mt-4 text-center">
                                    <a href="decade.html?decade=${decade}" class="btn btn-outline-secondary">Back to ${decade}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;

            const fullContent = artifactCardSection;

            document.getElementById('artifact-content').innerHTML = fullContent;
            document.title = `Women's Sports Museum - ${pageTitle}`;
        })
        .catch(error => {
            console.error('Error loading artifact:', error);
            document.getElementById('artifact-content').innerHTML = `
                <div class="container py-5">
                    <div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading">Artifact Not Found</h4>
                        <p>The artifact for "${artifactType}" could not be loaded.</p>
                        <hr>
                        <p class="mb-0">Make sure the file <code>artifacts/data/${artifactType}.md</code> exists.</p>
                        <a href="home.html" class="btn btn-primary mt-3">Back to Home</a>
                    </div>
                </div>
            `;
        });
}

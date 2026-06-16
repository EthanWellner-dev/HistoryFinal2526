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
    
    fetch(markdownPath)
        .then(response => {
            if (!response.ok) throw new Error('Artifact not found');
            return response.text();
        })
        .then(markdown => {
            const html = marked.parse(markdown);
            const imagePath = `artifacts/images/${artifactType}.jpg`;
            
            let content = `
                <div class="row mb-5">
                    <div class="col-lg-8 mx-auto">
                        <a href="home.html" class="btn btn-outline-secondary mb-4">← Back to Home</a>
                        <h1 class="mb-4" style="color: #8B3A62;">${artifactType.toUpperCase()} Artifacts</h1>
            `;
            
            // Try to load image
            fetch(imagePath)
                .then(response => {
                    if (response.ok) {
                        content += `
                            <div class="mb-4">
                                <img src="${imagePath}" class="img-fluid rounded shadow" alt="${artifactType} artifacts">
                            </div>
                        `;
                    }
                    
                    content += `
                        <div class="artifact-content">
                            ${html}
                        </div>
                    </div>
                </div>
                    `;
                    
                    document.getElementById('artifact-content').innerHTML = content;
                })
                .catch(() => {
                    // Image doesn't exist, just show markdown
                    content += `
                        <div class="artifact-content">
                            ${html}
                        </div>
                    </div>
                </div>
                    `;
                    
                    document.getElementById('artifact-content').innerHTML = content;
                });
        })
        .catch(error => {
            console.error('Error loading artifact:', error);
            document.getElementById('artifact-content').innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <h4 class="alert-heading">Artifact Not Found</h4>
                    <p>The artifact for "${artifactType}" could not be loaded.</p>
                    <hr>
                    <p class="mb-0">Make sure the file <code>artifacts/data/${artifactType}.md</code> exists.</p>
                    <a href="home.html" class="btn btn-primary mt-3">Back to Home</a>
                </div>
            `;
        });
}

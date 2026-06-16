window.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const decade = params.get('decade');
    
    if (!decade) {
        document.getElementById('artifacts-container').innerHTML = `
            <div class="col-lg-10 mx-auto">
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">No Decade Selected</h4>
                    <p>Please select a decade from the menu to view artifacts.</p>
                    <a href="home.html" class="btn btn-primary">Back to Home</a>
                </div>
            </div>
        `;
        return;
    }

    document.title = `Women's Sports Museum - ${decade}`;
    loadDecadeArtifacts(decade);
});

function loadDecadeArtifacts(decade) {
    fetch('artifacts/data/artifacts.json')
        .then(response => {
            if (!response.ok) throw new Error('Artifacts data not found');
            return response.json();
        })
        .then(data => {
            const artifacts = data[decade];
            
            if (!artifacts || artifacts.length === 0) {
                document.getElementById('artifacts-container').innerHTML = `
                    <div class="col-lg-10 mx-auto">
                        <div class="alert alert-warning" role="alert">
                            <h4 class="alert-heading">No Artifacts Found</h4>
                            <p>No artifacts available for the ${decade}s decade.</p>
                            <a href="home.html" class="btn btn-primary">Back to Home</a>
                        </div>
                    </div>
                `;
                return;
            }

            // Set title
            const decadeDisplay = decade === '70s' ? '1970s & Beyond' : `19${decade}`;
            document.getElementById('decade-title').textContent = `${decadeDisplay} Artifacts`;
            
            // Build artifact cards
            const container = document.getElementById('artifacts-container');
            container.innerHTML = '';
            
            artifacts.forEach((artifact, index) => {
                const card = document.createElement('div');
                card.className = 'col-md-6 col-lg-4 fade-in';
                
                const imageHtml = artifact.image ? 
                    `<div class="card-img-wrapper" style="height: 200px; overflow: hidden; border-radius: 8px 8px 0 0; background: linear-gradient(135deg, #5a4a42 0%, #6f5f57 100%); display: flex; align-items: center; justify-content: center; color: white; text-align: center;">
                        <div style="font-size: 3rem;">📜</div>
                    </div>` : '';
                
                card.innerHTML = `
                    <a href="artifact.html?decade=${decade}&artifact=${artifact.id}" class="text-decoration-none">
                        <div class="card h-100 shadow-sm card-hover">
                            ${imageHtml}
                            <div class="card-body">
                                <h5 class="card-title">${artifact.title}</h5>
                                <p class="card-text text-muted">${artifact.description}</p>
                                <small class="text-muted">Click to learn more</small>
                            </div>
                        </div>
                    </a>
                `;
                
                container.appendChild(card);
            });

            // Setup scroll animations
            setupScrollAnimations();
        })
        .catch(error => {
            console.error('Error loading artifacts:', error);
            document.getElementById('artifacts-container').innerHTML = `
                <div class="col-lg-10 mx-auto">
                    <div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading">Error Loading Artifacts</h4>
                        <p>Could not load artifact data. ${error.message}</p>
                        <a href="home.html" class="btn btn-primary">Back to Home</a>
                    </div>
                </div>
            `;
        });
}

function setupScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                entry.target.style.animationDelay = `${Array.from(fadeElements).indexOf(entry.target) * 0.1}s`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => observer.observe(el));
}

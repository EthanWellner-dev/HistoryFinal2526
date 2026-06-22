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
    Promise.all([
        fetchJsonCached('artifacts/data/artifacts.json'),
        fetchJsonCached('artifacts/data/summaries.json')
    ])
    .then(([data, summaryData]) => {
        const artifacts = data[decade];
        const decadeSummary = summaryData[decade] ? summaryData[decade].trim() : '';
        
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
            
            const container = document.getElementById('artifacts-container');
            container.innerHTML = '';

            const decadeLabels = {
                '40s': '1940s',
                '50s': '1950s',
                '60s': '1960s',
                '70s': '1970s+'
            };
            const decades = ['40s', '50s', '60s', '70s'];
            const currentIndex = decades.indexOf(decade);
            const previousDecade = currentIndex > 0 ? decades[currentIndex - 1] : null;
            const nextDecade = currentIndex < decades.length - 1 ? decades[currentIndex + 1] : null;

            const decadeNavigationTop = `
                <div class="row mb-4">
                    <div class="col-12 d-flex justify-content-between align-items-center decade-navigation">
                        ${previousDecade ? `<a href="decade.html?decade=${previousDecade}" class="btn btn-outline-primary">← ${decadeLabels[previousDecade]}</a>` : '<span></span>'}
                        <span class="text-muted">${decadeLabels[decade]} timeline</span>
                        ${nextDecade ? `<a href="decade.html?decade=${nextDecade}" class="btn btn-outline-primary">${decadeLabels[nextDecade]} →</a>` : '<span></span>'}
                    </div>
                </div>
            `;

            const selectedArtifacts = artifacts.slice(0, 2);
            const timelineItems = selectedArtifacts.map((artifact, index) => {
                return `
                    <div class="timeline-step">
                        <div class="step-marker"></div>
                        <div class="timeline-card">
                            <div class="timeline-card-body">
                                <div class="timeline-card-title">${artifact.title}</div>
                                <img src="artifacts/images/${artifact.image}" alt="${artifact.title}" class="timeline-card-image" onerror="this.style.display='none';">
                                <a class="timeline-card-toggle btn btn-secondary mt-3" href="artifact.html?artifact=${artifact.id}">
                                    Show artifact details
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            container.innerHTML = `
                <div class="col-12 timeline-section">
                    ${decadeNavigationTop}
                    ${decadeSummary ? `<div class="decade-summary px-3 mb-4">${decadeSummary}</div>` : ''}
                    <div class="timeline-message px-3 mb-4">
                        Click a milestone below to reveal the artifact story.
                    </div>
                    <div class="timeline-steps">
                        ${timelineItems}
                    </div>
                </div>
            `;

            setupScrollAnimations();
            if (typeof setupScrollReveal === 'function') {
                setupScrollReveal();
            }
            if (typeof setupDirectionalScroll === 'function') {
                setupDirectionalScroll();
            }
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

window.SiteCache = window.SiteCache || {
    json: {},
    text: {},
};

function fetchJsonCached(url, forceReload = false) {
    if (!forceReload && window.SiteCache.json[url]) {
        return Promise.resolve(window.SiteCache.json[url]);
    }

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch JSON from ${url}`);
            }
            return response.json();
        })
        .then(data => {
            window.SiteCache.json[url] = data;
            return data;
        });
}

function fetchTextCached(url, forceReload = false) {
    if (!forceReload && window.SiteCache.text[url]) {
        return Promise.resolve(window.SiteCache.text[url]);
    }

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch text from ${url}`);
            }
            return response.text();
        })
        .then(text => {
            window.SiteCache.text[url] = text;
            return text;
        });
}

function clearSiteCache() {
    window.SiteCache.json = {};
    window.SiteCache.text = {};
}

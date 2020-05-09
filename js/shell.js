//First, we tell our webapp that we have a service-worker
//Notice how we test our browser if 'serviceWorkers' are
//supported. If not, our web app should behave as a regular web
// Make sure sw are supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('sw_offline_pages.js')
            .then(reg => console.log('Service Worker: Registered (Pages)'))
            .catch(err => console.log(`Service Worker: Error: ${err}`));
    });
}

let app = {
    /** @var isOffline Boolean Used to know when the app is offline or not */
    isLoading: true,
    spinner: document.getElementById('loader'),
    isOffline: true,
    offLineMessage: document.getElementById('offLineMessage')
};


// Check internet connection
setInterval (function () {
    app.isOffline = ! window.window.navigator.onLine;
    if (app.isOffline) {
        app.spinner.hidden = false
        app.isLoading = true
    } else {
        app.spinner.hidden = true
        app.isLoading = false
    }
}, 3000);

function redirect (a) {
    if (window.window.navigator.onLine) {
        window.location.href = a.name;
    } else {
        // If the current page is index.html
        if (a.name.startsWith("./pages")) {
            window.location.href = "./pages/error.html";
        } else {
            window.location.href = "./error.html";
        }

    }
}



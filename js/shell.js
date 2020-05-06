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



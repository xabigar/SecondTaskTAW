(function () {

    var app = {
        isLoading: true,
        spinner: document.getElementById('loader')
    };

    // Set the welcome image, if there is a favourite team saved, else set a default image
    $( document ).ready( function() {
        var favouriteTeam = window.localStorage.getItem("favouriteTeam")
        var welcomeLogo = document.getElementById("welcomeLogo")
        if(favouriteTeam==undefined || favouriteTeam==null ){
            welcomeLogo.src = '../img/welcomeLogo.png'
            welcomeLogo.className = 'defaultWelcomeLogo'
        } else {
            welcomeLogo.src = '../img/teams/' + favouriteTeam + '.png'
            welcomeLogo.className = 'teamWelcomeLogo'
        }
    });

    // Remove loading
    setTimeout(function(){
        //do what you need here
        if (app.isLoading) {
            app.spinner.hidden = true
            app.isLoading = false
        }
    }, 4000);
})();
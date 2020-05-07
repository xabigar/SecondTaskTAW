(function () {

    var app = {
        // DOM elements
        frame: document.getElementById('frame'),
        camera: $('#camera')
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
        let dataImage = localStorage.getItem('img');
        if (dataImage) {
            app.frame.src = dataImage
        }
    });

    /** @var reader FileReader Will be used to read the content of the uploaded images */
    let reader = new FileReader ();

    // Bind on change event to the input type file
    // This is when the user starts to track a new event.
    app.camera.change (function (e) {

        /** @var file File Get the first (and only) file selected */
        let file = e.target.files[0];


        // Check the file type do avoid non images
        if ( ! file.type.match ('image.*')) {
            vex.dialog.alert ('You need to uploaded an image');
            return;
        }


        // Start reading the the file
        reader.readAsDataURL (file);

        reader.onload = (function() {
            return function(e) {
                // Render thumbnail.
                app.frame.src = e.target.result
                localStorage.setItem('img', e.target.result);
            };
        })(file);
    });
})();
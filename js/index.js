(function () {

    var app = {
        // DOM elements
        frame: document.getElementById('frame'),
        camera: $('#camera'),
        lowBattery: 50,
        batteryLevel: 100,
        charging: false
    };


    //Battery control
    let batteryLevel = document.getElementById("batteryLevel")
    let chargingStatus = document.getElementById("chargingStatus")
    let batteryMessage = document.getElementById("batteryMessage")
    let batteryImg = document.getElementById("batteryImg")

    let batteryControl = function() {
        navigator.getBattery().then(battery => {
            app.batteryLevel = battery.level*100
            app.charging = battery.charging
            batteryLevel.innerText = app.batteryLevel + '%'
            if (app.charging) {
                chargingStatus.innerText = 'The battery is charging'
            } else {
                chargingStatus.innerText = 'The battery is not charging'
            }
            batteryMessage.innerText = 'Enjoy the experience!'
            batteryMessage.className = "successMessage"
            if (app.batteryLevel >= 75) {
                batteryImg.src = '../img/battery/img_full.png'
            } else if ((app.batteryLevel < 75) && (app.batteryLevel >= 50)) {
                batteryImg.src = '../img/battery/img_high.png'
            } else if ((app.batteryLevel < 50) && (app.batteryLevel >= 25)) {
                batteryImg.src = '../img/battery/img_medium.png'
            } else if (app.batteryLevel < 25) {
                batteryImg.src = '../img/battery/img_low.png'
                if (!app.charging) {
                    batteryMessage.innerText = 'Your battery level is low! Put it charging!'
                    batteryMessage.className = "errorMessage"
                }
            }
        });
    }

    batteryControl()
    setInterval (function () {
        batteryControl()
    }, 10000);

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
        document.getElementById("submitUsername").addEventListener("click", saveUser);

        function saveUser() {
            let user = document.getElementById("inputUsername").value
            if (user.trim().length > 5) {
                let showUserInformation = document.getElementById("showUserInformation")
                let usernameLabel = document.getElementById("showUsername")
                userForm.hidden = true
                showUserInformation.hidden = false
                usernameLabel.innerText= 'Welcome ' + user
                window.localStorage.setItem("user",user)
            } else {
                document.getElementById("notValidUser").innerText = 'The username must have more than 5 chars'
            }
        }
        let user = window.localStorage.getItem("user")
        let userForm = document.getElementById("retrieveUserInformation")
        let showUserInformation = document.getElementById("showUserInformation")
        let usernameLabel = document.getElementById("showUsername")
        if (user) {
            userForm.hidden = true
            showUserInformation.hidden = false
            usernameLabel.innerText= 'Welcome ' + user
        } else {
            userForm.hidden = false
            showUserInformation.hidden = true
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
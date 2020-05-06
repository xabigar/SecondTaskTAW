$( document ).ready(function() {
    getScoreTable(20)
});

// Call the API to get the best goal scorers
function getScoreTable(limit) {
    var settings = {
        "url": "http://api.football-data.org/v2/competitions/PD/scorers?limit=" + limit,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "X-Auth-Token": "6933c774bc4040d397b6ac7fbf2e854a"
        },
    };

    $.ajax(settings).done(function (response) {
        completeScoreTable(response.scorers)
    });
}

// Fill the classification table
function completeScoreTable(scorers) {
    let classification = document.getElementById('scoreTableBody')
    for (let i=0;i<scorers.length;i++) {
        console.log(scorers[i].player.name);
        let scorer = scorers[i]
        let fila = document.createElement('tr')
        fila.className = "rowBorder"
        classification.appendChild(fila)
        let name = document.createElement('th')
        name.textContent = i+1 +'. ' + scorer.player.name
        let team = document.createElement('th')
        team.className = 'teamName'
        let img = document.createElement('img')
        img.src = '../img/teams/' + scorer.team.id + '.png'
        img.className = 'teamLogo'
        name.appendChild(img)
        let span = document.createElement('span')
        span.textContent = scorer.team.name
        team.appendChild(span)
        let goals = document.createElement('th')
        goals.className = 'tableNumberElement'
        goals.textContent = scorer.numberOfGoals
        fila.appendChild(name)
        fila.appendChild(team)
        fila.appendChild(goals)
    }
}
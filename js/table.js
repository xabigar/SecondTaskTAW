$( document ).ready(function() {
    initTable()
});

// Gets the xml file, creates the teams and call a function to create the table
function initTable () {
    let teams
    let localStorageTeams = window.localStorage.getItem("teams");
    if(localStorageTeams==undefined || localStorageTeams==null ){
        // Search teams and create them
        getTeamsFromXML((teams) => {
            completeTable(teams)
            window.localStorage.setItem("teams",JSON.stringify(teams));
        })
    }else{
        teams = JSON.parse(localStorageTeams)
        completeTable(teams)
    }
}

// Completes the classification table
function completeTable(teams) {
    let sortedTeams = teams.sort((team2, team1) => (
        team1.points - team2.points
    ))
    let classification = document.getElementById('classificationBody')
    for (let i=0;i<sortedTeams.length;i++) {
        let team = sortedTeams[i]
        let fila = document.createElement('tr')
        fila.className = "rowBorder"
        classification.appendChild(fila)
        let pos = document.createElement('th')
        pos.textContent = i+1
        if (i < 4) {
            pos.className = "championsZone"
        } else if (i>3 && i<6) {
            pos.className = "europaZone"
        } else if (i>16) {
            pos.className = "secondLeagueZone"
        }
        pos.className += " tableNumberElement positionElement"
        let name = document.createElement('th')
        // name.textContent = team.name
        let img = document.createElement('img')
        img.src = '../img/teams/' + team.id + '.png'
        img.className = 'teamLogo'
        name.appendChild(img)
        let span = document.createElement('span')
        span.textContent = team.name
        name.appendChild(span)
        let pj = document.createElement('th')
        pj.className = 'tableNumberElement'
        pj.textContent = team.playedGames
        let pg = document.createElement('th')
        pg.className = 'tableNumberElement'
        pg.textContent = team.win
        let pe = document.createElement('th')
        pe.className = 'tableNumberElement'
        pe.textContent = team.draw
        let pp = document.createElement('th')
        pp.className = 'tableNumberElement'
        pp.textContent = team.lose
        let gf = document.createElement('th')
        gf.className = 'tableNumberElement'
        gf.textContent = team.scoredGoals
        let gc = document.createElement('th')
        gc.className = 'tableNumberElement'
        gc.textContent = team.receivedGoals
        let ga = document.createElement('th')
        ga.className = 'tableNumberElement'
        ga.textContent = team.goalDifference
        let pts = document.createElement('th')
        pts.className = 'tableNumberElement'
        pts.textContent = team.points
        fila.appendChild(pos)
        fila.appendChild(name)
        fila.appendChild(pj)
        fila.appendChild(pg)
        fila.appendChild(pe)
        fila.appendChild(pp)
        fila.appendChild(gf)
        fila.appendChild(gc)
        fila.appendChild(ga)
        fila.appendChild(pts)
    }
}
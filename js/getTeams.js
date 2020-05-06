// It creates the list of team objects from the XML resource
function getTeamsFromXML(callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let teams = createTeams(this);
            callback(teams)
        }
    };
    xhttp.open("GET", "../resources/teams.xml", true);
    xhttp.send();
}

function createTeams(xml) {
    let xmlDoc = xml.responseXML;
    let teams = xmlDoc.getElementsByTagName('team');
    let teamsObjects = []
    for (let i=0;i<teams.length;i++) {
        let team = teams[i]
        let name = team.children[0].innerHTML
        let win = team.children[1].innerHTML
        let draw = team.children[2].innerHTML
        let lose = team.children[3].innerHTML
        let scoredGoals = team.children[4].innerHTML
        let receivedGoals = team.children[5].innerHTML
        let id = team.children[6].innerHTML
        let teamObject = new Team(name, win, draw, lose, scoredGoals, receivedGoals, id)
        teamsObjects.push(teamObject)
    }
    window.localStorage.setItem("teams", JSON.stringify(teamsObjects));
    console.log(JSON.stringify(teamsObjects))
    return teamsObjects
}
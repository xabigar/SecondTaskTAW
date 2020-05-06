class Team {
    constructor(name, win, draw, lose, scoredGoals, receivedGoals, id) {
        this.name = name;
        this.win = parseInt(win);
        this.draw = parseInt(draw);
        this.lose = parseInt(lose);
        this.scoredGoals = parseInt(scoredGoals);
        this.receivedGoals = parseInt(receivedGoals);
        this.points = this.calcPoints();
        this.playedGames = this.calcPlayedGames();
        this.goalDifference = this.calcGoalDifference();
        this.id = id
    }
    calcPoints () {
        return this.win * 3 + this.draw;
    }

    calcPlayedGames () {
        return this.win + this.draw + this.lose;
    }

    calcGoalDifference () {
        return this.scoredGoals - this.receivedGoals;
    }
}
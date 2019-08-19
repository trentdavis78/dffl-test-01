import React, { Component } from 'react';
import roster from '../data/sampleRosterData';
import schedule from '../data/sampleScheduleData';

class App extends Component {
    
    getStarters(arr) {   
        const starters = arr.filter(v => v.position !== "Bench");
        return starters;
    }

    getByeWeeks(year, week) {
        const byes = schedule[year][week].byes;
        return byes;
    }

    rosterValidate(byeWeeks) { 
        const rosterErrors = [];
        for(let i = 0; i < roster.length; i++) {
            let awayRoster = this.getStarters(roster[i].awayRoster);
            for(let j =0; j < awayRoster.length; j++) {
                let player = awayRoster[j].player;                     
                if(player.injuryStatus === "SUSPENSION" || player.injuryStatus === "OUT" || player.injuryStatus === "DOUBTFUL") {
                    awayRoster[j].player.rosterStatus = player.injuryStatus;
                    rosterErrors.push([awayRoster[j], roster[i].awayTeamId]);
                }
                for(let k = 0; k < byeWeeks.length; k++) {
                    if(player.proTeamAbbreviation === byeWeeks[k]) {
                        awayRoster[j].player.rosterStatus = "BYE";
                        rosterErrors.push([awayRoster[j], roster[i].awayTeamId]);
                    }
                }               
            }           
        }

        for(let i = 0; i < roster.length; i++) {
            let homeRoster = this.getStarters(roster[i].homeRoster);
            for(let j =0; j < homeRoster.length; j++) {
                let player = homeRoster[j].player;
                if(player.injuryStatus === "SUSPENSION" || player.injuryStatus === "OUT" || player.injuryStatus === "DOUBTFUL") {
                    homeRoster[j].player.rosterStatus = player.injuryStatus;
                    rosterErrors.push([homeRoster[j], roster[i].homeTeamId]);
                }
                for(let k = 0; k < byeWeeks.length; k++) {
                    if(player.proTeamAbbreviation === byeWeeks[k]) {
                        homeRoster[j].player.rosterStatus = player.injuryStatus;
                        homeRoster[j].player.rosterStatus = "BYE";
                        rosterErrors.push([homeRoster[j], roster[i].homeTeamId]);
                    }
                }               
            }           
        }
        return rosterErrors;
    }   
    
    render() {        
   
        return (
            <div style={{marginTop: 50}} className="ui container">
                <h1>Invalid Roster:</h1>
                <div>{this.rosterValidate(this.getByeWeeks("2019", "4")).map(value => {
                    return (
                        <div key={value[0].player.id}>
                            {value[0].player.fullName}
                            &nbsp;-&nbsp;
                            {value[0].player.rosterStatus}
                            &nbsp;-&nbsp;
                            Team {value[1]}
                        </div>
                    );
                })}</div>
            </div>
        )
    }
}

export default App;

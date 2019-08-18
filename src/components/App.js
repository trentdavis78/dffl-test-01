import React, { Component } from 'react';
import roster from '../data/sampleRosterData';
import schedule from '../data/sampleScheduleData';

class App extends Component {
    
    rosterValidate() { 
        const rosterErrors = [];

        for(let i = 0; i < roster.length; i++) {
            for(let j =0; j < roster[i].awayRoster.length; j++) {
                if(roster[i].awayRoster[j].player.injuryStatus === "SUSPENSION") {
                    rosterErrors.push(roster[i].awayRoster[j]);
                }
            }
        }

        for(let i = 0; i < roster.length; i++) {
            for(let j =0; j < roster[i].homeRoster.length; j++) {
                if(roster[i].homeRoster[j].player.injuryStatus === "SUSPENSION") {
                    rosterErrors.push(roster[i].homeRoster[j]);
                }
            }
        }
        return rosterErrors;
    }
    
    render() {
        console.log(schedule)
        return (
            <div style={{marginTop: 50}} className="ui container">
                <h1>Invalid Roster:</h1>
                <div>{this.rosterValidate().map(name => {
                    return (
                        <div key={name.player.id}>
                            {name.player.fullName}
                        </div>
                    );
                })}</div>
            </div>
        )
    }
}

export default App;

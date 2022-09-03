
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Player } from './player';
import { Match } from './match';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private storage: SQLiteObject;
  playersList = new BehaviorSubject([]);
  matchesList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.deleteDatabase({
        name: 'club_db.db',
        location: 'default'
      })
      this.sqlite.create({
        name: 'club_db.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }
  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchPlayers(): Observable<Player[]> {
    return this.playersList.asObservable();
  }
    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dump.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getPlayers();
            this.getMatches();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
  // Get list
  getPlayers(){
    return this.storage.executeSql('SELECT * FROM playerstable', []).then(res => {
      let items: Player[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          if(res.rows.item(i).id != 0){
            items.push({ 
              id: res.rows.item(i).id,
              first_name: res.rows.item(i).first_name,  
              last_name: res.rows.item(i).last_name,
              ability_level: res.rows.item(i).ability_level,
              assigned_to_match: res.rows.item(i).assigned_to_match
            });
          }
        }
      }
      this.playersList.next(items);
    });
  }
  // Add
  addPlayer(first_name, last_name, ability_level) {
    let data = [first_name, last_name, ability_level, 0];
    return this.storage.executeSql('INSERT INTO playerstable (first_name, last_name, ability_level, assigned_to_match) VALUES (?, ?, ?)', data)
    .then(res => {
      this.getPlayers();
    });
  }
 
  // Get single object
  getPlayer(id): Promise<Player> {
    return this.storage.executeSql('SELECT * FROM playerstable WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        first_name: res.rows.item(0).first_name,  
        last_name: res.rows.item(0).last_name,
        ability_level: res.rows.item(0).ability_level,
        assigned_to_match: res.rows.item(0).assigned_to_match
      }
    });
  }
  // Update
  updatePlayer(id, player: Player) {
    let data = [player.first_name, player.last_name, player.ability_level];
    return this.storage.executeSql(`UPDATE playerstable SET first_name = ?, last_name = ?, ability_level = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getPlayers();
    })
  }
  // Delete
  deletePlayer(id) {
    return this.storage.executeSql('DELETE FROM playerstable WHERE id = ?', [id])
    .then(_ => {
      this.getPlayers();
    });
  }

  checkLogin(username){
    return this.storage.executeSql('SELECT * FROM credentialstable WHERE username = ?', [username]);
  }

  fetchMatches(): Observable<any[]> {
    return this.matchesList.asObservable();
  }

   // Get single object
   getMatch(id): Promise<Match> {
    return this.storage.executeSql('SELECT * FROM matchestable WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        player1_id: res.rows.item(0).player1_id,
        player2_id: res.rows.item(0).player2_id, 
        player3_id: res.rows.item(0).player3_id, 
        player4_id: res.rows.item(0).player4_id,   
        team1_score: res.rows.item(0).team1_score,
        team2_score: res.rows.item(0).team2_score,
      }
    });
  }
  // Update
  updateMatch(id, match: Match) {
    let data = [match.player1_id, match.player2_id, match.player3_id, match.player4_id, match.team1_score, match.team2_score];
    return this.storage.executeSql(`UPDATE matchestable SET player1_id = ?, player2_id = ?, player3_id = ?, player4_id = ?, team1_score = ?, team2_score = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getMatches();
    })
  }

  getMatches(){
    return this.storage.executeSql('SELECT * FROM matchestable', []).then(res => {
      let items: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          let matchId = res.rows.item(i).id;
          let team1Score = res.rows.item(i).team1_score;
          let team2Score = res.rows.item(i).team2_score;
          this.getPlayersInMatch(res.rows.item(i).player1_id, res.rows.item(i).player2_id, res.rows.item(i).player3_id, res.rows.item(i).player4_id).then(res2 => {
            items.push({ 
              id: matchId,
              player1_name: res2.player1_name,  
              player2_name: res2.player2_name, 
              player3_name: res2.player3_name,  
              player4_name: res2.player4_name, 
              team1_score: team1Score, 
              team2_score: team2Score
            });
          });
        }
      }
      this.matchesList.next(items);
    });
  }

  getPlayersInMatch(player1_id, player2_id, player3_id, player4_id){
    return Promise.all([
      this.getPlayer(player1_id),
      this.getPlayer(player2_id),
      this.getPlayer(player3_id),
      this.getPlayer(player4_id)
    ]).then(res1 => {
      return{
        player1_name: res1[0].first_name + " " + res1[0].last_name,
        player2_name: res1[1].first_name + " " + res1[1].last_name,
        player3_name: res1[2].first_name + " " + res1[2].last_name,
        player4_name: res1[3].first_name + " " + res1[3].last_name
      }
    });
  }
}

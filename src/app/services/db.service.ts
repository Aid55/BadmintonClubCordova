
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Player } from './player';
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
          items.push({ 
            id: res.rows.item(i).id,
            first_name: res.rows.item(i).first_name,  
            last_name: res.rows.item(i).last_name,
            ability_level: res.rows.item(i).ability_level
           });
        }
      }
      this.playersList.next(items);
    });
  }
  // Add
  addPlayer(first_name, last_name, ability_level) {
    let data = [first_name, last_name, ability_level];
    return this.storage.executeSql('INSERT INTO playerstable (first_name, last_name, ability_level) VALUES (?, ?, ?)', data)
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
        ability_level: res.rows.item(0).ability_level
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
}

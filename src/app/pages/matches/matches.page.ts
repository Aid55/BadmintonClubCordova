import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from '../../services/db.service';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {
  Data: any[] = [];
  constructor(
    private db: DbService,
    private toast: ToastController,
    private router: Router,
    private menuCtrl: MenuController

  ) { }

  ionViewWillEnter(){
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchMatches().subscribe(item => {
          this.Data = item
        })
      }
    });
  }

  saveMatch(id){
    this.db.getMatch(id).then(async(data) => {
      if(data.player1_id != 0 && data.player2_id != 0 && data.player3_id != 0 && data.player4_id != 0 && (data.team1_score == 21 || data.team2_score == 21)){
        this.db.saveMatch(id).then(async(res) => {
          let toast = await this.toast.create({
            message: 'Match Saved',
            duration: 2500
          });
          toast.present();      
        });
      }
      else{
        let toast = await this.toast.create({
          message: 'Match must contain 4 players and a score of 21 to save',
          duration: 2500
        });
        toast.present();   
      }
    });

  }
}

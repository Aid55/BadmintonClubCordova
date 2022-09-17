import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from '../../services/db.service'
import { ActivatedRoute, Router } from "@angular/router";
import { MenuController, ToastController } from '@ionic/angular';
import { throwIfEmpty } from 'rxjs';

@Component({
  selector: 'app-editmatch',
  templateUrl: './editmatch.page.html',
  styleUrls: ['./editmatch.page.scss'],
})
export class EditMatchPage implements OnInit {
  editMatchForm: FormGroup;
  id: any;
  match: {id, player1_id, player2_id, player3_id, player4_id, team1_score, team2_score};
  freePlayers: any[] = [];
  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private toast:ToastController,
    private menuCtrl: MenuController
  ) {
    /*db.getPlayersNotInMatch().then(res => {
      for(var i = 0; i < res.rows.length; i++){
        this.freePlayers.push({id: res.rows.item(i).id, name: res.rows.item(i).first_name + " " + res.rows.item(i).last_name});
      }
      console.log(this.freePlayers);
    })*/    

    
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchFreePlayers().subscribe(item => {
          this.freePlayers = item
        })
      }
    });
    this.editMatchForm = this.formBuilder.group({
      player1: [''],
      player2: [''],
      player3: [''],
      player4: [''],
      team1_score: [0],
      team2_score: [0]
    })    
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.db.getMatch(this.id).then(res => {
      this.db.getPlayersInMatch(res.player1_id, res.player2_id, res.player3_id, res.player4_id).then(res2 => {
        //create Match object with initial values
        this.match = {id:res.id, player1_id: res.player1_id, player2_id:res.player2_id, player3_id:res.player3_id, player4_id:res.player4_id, team1_score:res.team1_score, team2_score:res.team2_score};
        this.editMatchForm.setValue({
          player1: res2.player1.id,
          player2: res2.player2.id,
          player3: res2.player3.id,
          player4: res2.player4.id,
          team1_score: res.team1_score,
          team2_score: res.team2_score
        })
      })
    })
    console.log(this.editMatchForm);
    console.log(this.freePlayers);
  }

  async saveForm(){
    if(this.editMatchForm.valid){
      if(this.match['player1_id'] != this.editMatchForm.value['player1']){
        this.db.playerIsFree(this.match['player1_id']);
        this.db.playerIsInGame(this.editMatchForm.value['player1']);
        this.match['player1_id'] = this.editMatchForm.value['player1'];
      }
      if(this.match['player2_id'] != this.editMatchForm.value['player2']){
        this.db.playerIsFree(this.match['player2_id']);
        this.db.playerIsInGame(this.editMatchForm.value['player2']);
        this.match['player2_id'] = this.editMatchForm.value['player2']
      }
      if(this.match['player3_id'] != this.editMatchForm.value['player3']){
        this.db.playerIsFree(this.match['player3_id']);
        this.db.playerIsInGame(this.editMatchForm.value['player3']);
        this.match['player3_id'] = this.editMatchForm.value['player3']
      }
      if(this.match['player4_id'] != this.editMatchForm.value['player4']){
        this.db.playerIsFree(this.match['player4_id']);
        this.db.playerIsInGame(this.editMatchForm.value['player4']);
        this.match['player4_id'] = this.editMatchForm.value['player4']
      }
      this.match['team1_score'] = this.editMatchForm.value['team1_score'];
      this.match['team2_score'] = this.editMatchForm.value['team2_score'];
      this.db.updateMatch(this.id, this.match) // was passing their full names instead of id of players
      .then( (res) => {
        console.log(res)
        this.router.navigate(['/matches']);
      })
    }
    else{
      let toast = await this.toast.create({
        message: 'All fields must be filled in',
        duration: 2500
      })
      toast.present();
    }
  }

  test(){
    console.log(this.editMatchForm);
  }

}

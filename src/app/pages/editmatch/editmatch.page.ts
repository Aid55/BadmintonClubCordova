import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from '../../services/db.service'
import { ActivatedRoute, Router } from "@angular/router";
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editmatch',
  templateUrl: './editmatch.page.html',
  styleUrls: ['./editmatch.page.scss'],
})
export class EditMatchPage implements OnInit {
  editMatchForm: FormGroup;
  id: any;
  match: {id, player1_id, player2_id, player3_id, player4_id, team1_score, team2_score};
  abilityLevels: any = ['Experienced', 'Intermediate', 'Beginner'];
  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private toast:ToastController,
    private menuCtrl: MenuController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.db.getMatch(this.id).then(res => {
      db.getPlayersInMatch(res.player1_id, res.player2_id, res.player3_id, res.player4_id).then(res2 => {
        //create Match object with initial values
        this.match = {id:0, player1_id: res.player1_id, player2_id:res.player2_id, player3_id:res.player3_id, player4_id:res.player4_id, team1_score:res.team1_score, team2_score:res.team2_score};
        this.editMatchForm.setValue({
          player1: res2.player1_name,
          player2: res2.player2_name,
          player3: res2.player3_name,
          player4: res2.player4_name,
          team1_score: res.team1_score,
          team2_score: res.team2_score
        })
      })
    })
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.editMatchForm = this.formBuilder.group({
      player1: [''],
      player2: [''],
      player3: [''],
      player4: [''],
      team1_score: [0],
      team2_score: [0]
    })
  }

  

  async saveForm(){
    if(this.editMatchForm.valid){
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
}

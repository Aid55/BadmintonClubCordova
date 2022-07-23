
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from "@angular/forms";
import { DbService } from '../../services/db.service';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
  addPlayerForm: FormGroup;
  Data: any[] = [];
  abilityLevels: any = ['Experienced', 'Intermediate', 'Beginner'];
  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router,
    private menuCtrl: MenuController
  ) { }

  ionViewWillEnter(){
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchPlayers().subscribe(item => {
          this.Data = item
        })
      }
    });
    this.addPlayerForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      ability_level: ['']
    })
  }
  async storeData() {
    if(this.addPlayerForm.valid){
      this.db.addPlayer(
        this.addPlayerForm.value.first_name,
        this.addPlayerForm.value.last_name,
        this.addPlayerForm.value.ability_level

      ).then((res) => {
        this.addPlayerForm.reset();
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
  deletePlayer(id){
    this.db.deletePlayer(id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Player deleted',
        duration: 2500
      });
      toast.present();      
    })
  }
   
}


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
@Component({
  selector: 'app-players',
  templateUrl: 'players.page.html',
  styleUrls: ['players.page.scss'],
})
export class PlayersPage implements OnInit {
  mainForm: FormGroup;
  Data: any[] = [];
  abilityLevels: any = ['High', 'Medium', 'Low'];
  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchPlayers().subscribe(item => {
          this.Data = item
        })
      }
    });
    this.mainForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      ability_level: ['']
    })
  }
  async storeData() {
    if(this.mainForm.valid){
      this.db.addPlayer(
        this.mainForm.value.first_name,
        this.mainForm.value.last_name,
        this.mainForm.value.ability_level

      ).then((res) => {
        this.mainForm.reset();
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

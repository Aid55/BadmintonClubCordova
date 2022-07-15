import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service'
import { ActivatedRoute, Router } from "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {
  editForm: FormGroup;
  id: any;
  abilityLevels: any = ['High', 'Medium', 'Low'];
  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private toast:ToastController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.db.getPlayer(this.id).then(res => {
      this.editForm.setValue({
        first_name: res['first_name'],
        last_name: res['last_name'],
        ability_level: res['ability_level']
      })
    })
  }
  ngOnInit() {
    this.editForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      ability_level: ['']
    })
  }
  async saveForm(){
    if(this.editForm.valid){
      this.db.updatePlayer(this.id, this.editForm.value)
      .then( (res) => {
        console.log(res)
        this.router.navigate(['/players']);
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

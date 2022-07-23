import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from '../../services/db.service'
import { ActivatedRoute, Router } from "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editplayer',
  templateUrl: './editplayer.page.html',
  styleUrls: ['./editplayer.page.scss'],
})
export class EditPlayerPage implements OnInit {
  editPlayerForm: FormGroup;
  id: any;
  abilityLevels: any = ['Experienced', 'Intermediate', 'Beginner'];
  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private toast:ToastController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.db.getPlayer(this.id).then(res => {
      this.editPlayerForm.setValue({
        first_name: res['first_name'],
        last_name: res['last_name'],
        ability_level: res['ability_level']
      })
    })
  }
  ngOnInit() {
    this.editPlayerForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      ability_level: ['']
    })
  }
  async saveForm(){
    if(this.editPlayerForm.valid){
      this.db.updatePlayer(this.id, this.editPlayerForm.value)
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

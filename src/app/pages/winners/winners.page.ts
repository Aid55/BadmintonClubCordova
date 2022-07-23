import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from '../../services/db.service';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-winners',
  templateUrl: './winners.page.html',
  styleUrls: ['./winners.page.scss'],
})
export class WinnersPage implements OnInit {
  winnersForm: FormGroup;
  Data: any[] = [];
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
    
    this.winnersForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }
  checkLogin(){
    let passCheck = this.db.checkLogin(this.winnersForm.value.username);
    //console.log(passCheck);
    passCheck.then(data => {
      //console.log(data.rows.length);
      if(data.rows.length != 0){
        if(data.rows.item(0).password == this.winnersForm.value.password){
          console.log('password matched');
          this.router.navigate(['/players']);
        }
        else{
          console.log('password not matched');
          document.querySelector('#validationText').innerHTML = "Incorrect Password";
        }
      }
      else{
        console.log('Username not found in database');
        document.querySelector('#validationText').innerHTML = "Username does not exist";
      }
    });
  }
}

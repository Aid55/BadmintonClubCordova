import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from '../../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {
  matchesForm: FormGroup;
  Data: any[] = [];
  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.matchesForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }
  checkLogin(){
    let passCheck = this.db.checkLogin(this.matchesForm.value.username);
    //console.log(passCheck);
    passCheck.then(data => {
      //console.log(data.rows.length);
      if(data.rows.length != 0){
        if(data.rows.item(0).password == this.matchesForm.value.password){
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

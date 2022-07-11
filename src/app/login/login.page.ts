import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  Data: any[] = [];
  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }
  checkLogin(){
    let passCheck = this.db.checkLogin(this.loginForm.value.username);
    console.log(passCheck);
    passCheck.then(data => {
      if(data.rows.item(0).password == this.loginForm.value.password){
        console.log('matched');
        this.router.navigate(['/players']);
      }
      else{
        console.log('no match');
        document.querySelector('#validationText').innerHTML = "Incorrect Password";
      }
    });
  }
}

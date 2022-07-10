
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service'
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  editForm: FormGroup;
  id: any;
  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    /*this.db.getLogin(this.id).then(res => {
      this.editForm.setValue({
        artist_name: res['artist_name'],
        login_name: res['login_name']
      })
    })*/
  }
  ngOnInit() {
    this.editForm = this.formBuilder.group({
      artist_name: [''],
      login_name: ['']
    })
  }
  saveForm(){
    /*this.db.updateLogin(this.id, this.editForm.value)
    .then( (res) => {
      console.log(res)
      this.router.navigate(['/home']);
    })*/
  }
}

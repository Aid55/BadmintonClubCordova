import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from '../../services/db.service';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {
  Data: any[] = [];
  constructor(
    private db: DbService,
    private toast: ToastController,
    private router: Router,
    private menuCtrl: MenuController
  ) { }

  ionViewWillEnter(){
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchMatches().subscribe(item => {
          this.Data = item
          console.log({item});
        })
      }
    });
  }
}

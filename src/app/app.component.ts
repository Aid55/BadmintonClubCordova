import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigation: any;
  constructor() {
    this.initSideMenuNavigation();
  }

  initSideMenuNavigation(){
    this.navigation =
    [
      {
        title : "Login",
        url   : "/login",
        icon  : "login"
      },
      {
        title : "Home",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "Players",
        url   : "/players",
        icon  : "people-outline"
      },
      {
        title : "Matches",
        url   : "/matches",
        icon  : "reader-outline"
      },
      {
        title : "Leaderboard",
        url   : "/leaderboard",
        icon  : "podium-outline"
      },
      {
        title : "Previous Winners",
        url   : "/winners",
        icon  : "trophy-outline"
      },
    ]
  }
}

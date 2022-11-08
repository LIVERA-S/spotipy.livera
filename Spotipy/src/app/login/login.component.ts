import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ScopesBuilder } from "../scopes/scopes-builder";
import { AuthConfig } from "../scopes/spotify-auth-config.i";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private requestAuthUrl = 'https://accounts.spotify.com/authorize';

  constructor() { }

  ngOnInit() {

  }

  public login(): void {
    this.authorize();
  }

  public authorize(){ 
    window.location.href = this.buildAuthUrl();
  }

  private buildAuthUrl(): string{

    let params = [];
    for (const [key, value] of Object.entries(this.authConfig)) {
      if(typeof(value) == 'object'){
        params.push(`${key}=${(value as string[]).join(" ")}`);
      }else{
        params.push(`${key}=${value}`);
      }
    }

    return `${this.requestAuthUrl}?${params.join('&')}`;
  }

  private authConfig: AuthConfig = { 
    client_id: "c0b1eb0b7a7848eb8436567d5871b8c2",
    response_type: "token",
    redirect_uri: "https://4200-liveras-spotipylivera-k3zaggsypg3.ws-eu74.gitpod.io/search", 
    state: "",
    show_dialog: true,
    scope:""
  };
}
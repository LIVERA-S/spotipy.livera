import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyService } from '../spotify.service';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string | undefined;
  title = 'first-routed-app';
  obsTrack: Observable<Object> | undefined;
  results: any;
  urlOuth: string | undefined;
  href: string | undefined;
  static myArray: any;

  // faccio iniettare lo spotify service e faccio una ricerca
  constructor(public spotify: SpotifyService, public router: Router) {

    if (localStorage.getItem("dataSource") != null) {
      let data: any = localStorage.getItem("dataSource");
      this.results = JSON.parse(data)

    }
    else {
      console.log("EMPTY []")
    }

  }

  ngOnInit(): void {
    let myArray = this.router.url.split("=");
    myArray = myArray[1].split("&");
    console.log(myArray[0]);
    environment.oauthToken = myArray[0]
  }

  submit(query: HTMLInputElement): void {

    if (!query.value) {
      return;
    }
    this.query = query.value;
    this.obsTrack = this.spotify.searchTrack(this.query);
    this.obsTrack.subscribe(
      (data) => {
        this.results = data;
        console.log(this.results);
        localStorage.setItem('dataSource', JSON.stringify(this.results));
      });
  }

  clear(): boolean {
    localStorage.removeItem("dataSource")
    window.location.reload();
    return true;
  }

  renderResults(res: any): void {
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }

  }
}
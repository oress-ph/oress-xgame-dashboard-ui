import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppSettings } from 'src/app/app-settings';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private http: HttpClient) { }


  public routeSubject = new Subject<string>();
  public routeObservable = this.routeSubject.asObservable();

  routeChange(route: string) {
    this.routeSubject.next(route);
  }
}

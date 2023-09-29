import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': ['application/json', 'application/x-www-form-urlencoded'],
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }),
};

@Injectable({
  providedIn: 'root'
})
export class DashbaordService {

}

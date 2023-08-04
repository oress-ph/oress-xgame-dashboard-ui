import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
import { AppSettings } from 'src/app/app-settings';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookieService:CookieService,private appSettings:AppSettings) { }

  all_site:any = this.appSettings.AllURL;

  encryptData(data: string, secretKey: string): string {
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encryptedData;
  }

  decryptData(encryptedData: string, secretKey: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  setCookie(name: string,value:string){
    try{
      const secretKey = 'x_game_encryption_password';
      const domain = 'localhost';
      const expirationDays = 1;
      const encrypt_value = this.encryptData(value,secretKey)
      this.all_site.forEach((sites:any) => {
        this.cookieService.set(name, encrypt_value, expirationDays, '/', sites.url, true, 'Strict');
      });
    }catch(e){
      console.log(e);
    }
  }
  getCookie(name:string){
    try{
      const cookie_value = this.cookieService.get(name);
      const secretKey = 'x_game_encryption_password';
      const decrypt_value = this.decryptData(cookie_value,secretKey);
      return decrypt_value;
    }catch(e){
      console.log(e);
      return null
    }
  }
}

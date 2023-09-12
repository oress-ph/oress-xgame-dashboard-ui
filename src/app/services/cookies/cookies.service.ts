import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
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
  deleteAllCookie(){
    const excludedCookies = ['language'];
    try{
      this.all_site.forEach((sites:any) => {
        const cookies = this.cookieService.getAll();
        console.log(cookies);
        for (const cookieName in cookies) {
          if (cookies.hasOwnProperty(cookieName)) {
            if (!excludedCookies.includes(cookieName)) {
              this.cookieService.delete(cookieName, '/', sites.url);
            }
          }
        }
      });
      return true;
    }catch(e){
      return null;
    }
  }
  getCookieArray(name: any) {
    try {
      const cookie_value = this.cookieService.get(name);

      if (!cookie_value) {
        return null; // No need to decrypt and parse if the cookie value is empty
      }

      const secretKey = 'x_game_encryption_password';
      const decrypt_value = this.decryptData(cookie_value, secretKey);

      try {
        return JSON.parse(decrypt_value as string);
      } catch (e) {
        console.error('Error parsing decrypted JSON:', e);
        return null;
      }
    } catch (e) {
      console.error('Error getting and decrypting cookie:', e);
      return null;
    }
  }

  setCookieArray(name: any,value:any){
    try{
      const secretKey = 'x_game_encryption_password';
      const expirationDays = 1;
      const json_value = JSON.stringify(value);
      const encrypt_value = this.encryptData(json_value,secretKey)
      this.all_site.forEach((sites:any) => {
        this.cookieService.set(name, encrypt_value, expirationDays, '/', sites.url, true, 'Strict');
      });
    }catch(e){
      console.log(e);
    }
  }

  getRaw(cookieName: string) {
    return this.cookieService.get(cookieName);
  }

  isExpired(cookie: string) {
    const isCookieValid = this.cookieService.check(cookie);
    if (isCookieValid) {
      console.log('The cookie is still valid.');
      return false;
    } else {
      console.log('The cookie has expired.');
      return true;
    }
  }
}

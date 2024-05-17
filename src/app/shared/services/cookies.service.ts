import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { CookieService } from 'ngx-cookie-service';
import { AppSettings } from './../../app-settings';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(
    private cookieService:CookieService,
    private appSettings:AppSettings,
    private router: Router
  ) { }

  all_site:any = this.appSettings.AllURL;

  encryptData(data: string, secretKey: string): string {
    // const encryptedData = CryptoJS.AES.envncrypt(data, secretKey).toString();
    // return encryptedData;
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify({ data }), secretKey).toString();
    return encryptedData
  }

  decryptData(encryptedData: string, secretKey: string): string {
    // const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    // const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    // return decryptedData;
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
    // console.log(JSON.parse(JSON.parse(decryptedData).data));
    return decryptedData;
  }

  setCookie(name: string,value:string){
    try{
      const secretKey = environment.secret_key
      const domain = 'localhost';
      const expirationDays = 1;
      const encrypt_value = this.encryptData(value,secretKey)
      this.all_site.forEach((sites:any) => {
        // this.cookieService.set(name, encrypt_value, expirationDays, '/', sites.url, true, 'Strict');
        this.cookieService.set(name, encrypt_value, expirationDays, '/', sites.url, true, 'None');
      });
    }catch(e){
      console.log(e);
    }
  }
  getCookie(name:string){
    try{
      const cookie_value = this.cookieService.get(name);
      const secretKey = environment.secret_key
      const decrypt_value = this.decryptData(cookie_value,secretKey);
      return decrypt_value!=''? JSON.parse(decrypt_value).data : decrypt_value ;
    }catch(e){
      console.log(e);
      return null
    }
  }
  deleteAllCookie(){
    const excludedCookies = ['language','layout_version'];
    try{
      this.all_site.forEach((sites:any) => {
        const cookies = this.cookieService.getAll();
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

      const secretKey = environment.secret_key
      const decrypt_value = this.decryptData(cookie_value, secretKey);
      try {
        if(decrypt_value!=''){
          return JSON.parse(JSON.parse(decrypt_value).data)
          // return JSON.parse(decrypt_value as string);
        }else{
          return null
        }
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
      const secretKey = environment.secret_key
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

  async checkCookie() {
    let walletAddress = 'wallet-keypair';
    if (this.isExpired(walletAddress)) {
      this.all_site.forEach((sites:any) => {
        const cookies = this.cookieService.getAll();
        for (const cookieName in cookies) {
          if (cookies.hasOwnProperty(walletAddress)) {
            this.cookieService.delete(cookieName, '/', sites.url);
            if (this.isExpired(walletAddress)) {
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }
          }
        }
      });
    }
  }

  isExpired(cookie: string) {
    const isCookieValid = this.cookieService.check(cookie);
    if (!isCookieValid) {
      // console.log('The cookie has expired.');
      return true;
    } else {
      // console.log('The cookie is still valid.');
      return false;
    }
  }
}

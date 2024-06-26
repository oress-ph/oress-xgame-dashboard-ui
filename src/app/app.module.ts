import '@polkadot/api-augment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

// // for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// // for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// // for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { AdminGuard } from './shared/guard/admin.guard';
import { WalletGuard } from './shared/guard/wallet.guard';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { AppSettings } from './app-settings';

import { DatePipe } from '@angular/common';
import { PolkadotService } from './shared/services/polkadot.service';

import { PolkadotIdentIconModule } from 'polkadot-angular-identicon';
import { PolkadotIdenticonComponent } from './shared/components/polkadot-identicon/polkadot-identicon.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    PolkadotIdenticonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    
  // for HttpClient use:
    LoadingBarHttpClientModule,
  // for Router use:
    LoadingBarRouterModule,
  // for Core use:
    LoadingBarModule,
    PolkadotIdentIconModule
  ],
  providers: [ AdminGuard, WalletGuard ,CookieService,AppSettings,DatePipe,PolkadotService,NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import {DividerModule} from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import {CalendarModule} from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { LoginComponent } from 'src/app/components/security/login/login.component';
import { RegisterComponent } from 'src/app/components/security/register/register.component';
import { SecurityRouterActivate } from './security-router.activate';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    SecurityComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SecurityRoutingModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastModule,
    DividerModule,
    TabViewModule,
    CalendarModule,
    CheckboxModule,
    PasswordModule,
    LayoutModule
  ],
  providers:[
    SecurityRouterActivate
  ]
})
export class SecurityModule {}

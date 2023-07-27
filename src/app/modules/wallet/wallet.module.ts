import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WalletsComponent } from 'src/app/components/dashboard/wallets/wallets.component';


//PrimeNG
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ImageModule } from 'primeng/image';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { GalleriaModule } from 'primeng/galleria';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LayoutModule } from '../layout/layout.module';
import { LoginComponent } from 'src/app/components/security/login/login.component';
import { RegisterComponent } from 'src/app/components/security/register/register.component';

import { WalletRouterActivate } from './wallet-router.activate';
import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { WalletInfoComponent } from 'src/app/components/dashboard/wallet-info/wallet-info.component';
@NgModule({
  declarations: [
    SafePipe,
    WalletComponent,
    WalletsComponent,
    WalletInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MenubarModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    TabViewModule,
    ConfirmDialogModule,
    BreadcrumbModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    CardModule,
    DialogModule,
    InputTextareaModule,
    InputNumberModule,
    ToastModule,
    DropdownModule,
    TagModule,
    PanelMenuModule,
    MegaMenuModule,
    HttpClientModule,
    RadioButtonModule,
    WalletRoutingModule,
    LayoutModule,
    ImageModule,
    PaginatorModule,
    GalleriaModule,
    CarouselModule,
    AutoCompleteModule,
    ProgressSpinnerModule
  ],

  providers: [
    WalletRouterActivate,
    DialogService,
    MessageService,
    ConfirmationService,
    DynamicDialogRef,
    DynamicDialogConfig,
  ],
})
export class WalletModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceComponent } from './marketplace.component';
import { MarketplaceRouterActivate } from './marketplace-router.activate';

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
import { MessageService, ConfirmationService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
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


import { MarketplaceRoutingModule } from './marketplace-routing.modules';
import { LayoutModule } from '../layout/layout.module';
import { MarketMarketplaceListComponent } from 'src/app/components/marketplace/market-marketplace-list/market-marketplace-list.component';
import { WalletsComponent } from 'src/app/components/wallet/wallets/wallets.component';
import { SafePipe } from 'src/app/pipes/safe.pipe';
import { WalletInfoComponent } from 'src/app/components/wallet/wallet-info/wallet-info.component';

@NgModule({
  declarations: [
    MarketplaceComponent,
    MarketMarketplaceListComponent,
    SafePipe,
    WalletInfoComponent,
    WalletsComponent
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
    DynamicDialogModule,
    PanelMenuModule,
    MegaMenuModule,
    HttpClientModule,
    RadioButtonModule,
    MarketplaceRoutingModule,
    LayoutModule,
    ImageModule,
    PaginatorModule,
    GalleriaModule,
    CarouselModule,
    AutoCompleteModule,
    ProgressSpinnerModule
  ],

  providers: [
    MarketplaceRouterActivate,
    DialogService,
    MessageService,
    ConfirmationService,
    DynamicDialogRef,
    DynamicDialogConfig,
  ],
})
export class MarketplaceModule { }

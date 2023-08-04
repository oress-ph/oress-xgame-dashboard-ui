import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';


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

import { SendPayGenesisRoutingModule } from './send-pay-genesis-routing.module';
import { SendPayGenesisRouterActivate } from './send-pay-genesis-router.activate';
import { SendPayGenesisComponent } from './send-pay-genesis.component';
import { SendOrPayGenesisComponent } from 'src/app/components/dashboard/send-or-pay-genesis/send-or-pay-genesis.component';
import { StepsModule } from 'primeng/steps';

@NgModule({
  declarations: [
    SendPayGenesisComponent,
    SendOrPayGenesisComponent
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
    SendPayGenesisRoutingModule,
    LayoutModule,
    ImageModule,
    PaginatorModule,
    GalleriaModule,
    CarouselModule,
    AutoCompleteModule,
    ProgressSpinnerModule,
    StepsModule
  ],

  providers: [
    SendPayGenesisRouterActivate,
    DialogService,
    MessageService,
    ConfirmationService,
    DynamicDialogRef,
    DynamicDialogConfig,
  ],
})
export class SendPayGenesisModule { }

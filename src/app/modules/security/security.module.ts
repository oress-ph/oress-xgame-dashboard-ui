import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import {
  DynamicDialogModule,
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
import { SecurityRoutingModule } from './security-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { SecurityComponent } from './security.component';
import { LoginComponent } from 'src/app/components/security/login/login.component';
import { RegisterComponent } from 'src/app/components/security/register/register.component';
import { SecurityRouterActivate } from './security-router.activate';

@NgModule({
  declarations: [
    SecurityComponent,
    LoginComponent,
    RegisterComponent,
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
    SecurityRoutingModule,
    LayoutModule,
    ImageModule,
    PaginatorModule,
    GalleriaModule,
    CarouselModule,
    AutoCompleteModule,
    ProgressSpinnerModule
  ],
  providers:[
    SecurityRouterActivate
  ]
})
export class SecurityModule { }

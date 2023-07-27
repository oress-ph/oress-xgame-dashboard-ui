import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { TopbarComponent } from 'src/app/components/layout/topbar/topbar.component';
import { FooterComponent } from 'src/app/components/layout/footer/footer.component';

// PRIMENG MODULES
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {PanelMenuModule} from 'primeng/panelmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutRouterActivate } from './layout-router.activate';

@NgModule({
  declarations: [
    LayoutComponent,
    TopbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MenubarModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    TabViewModule,
    CardModule,
    InputTextModule,
    CalendarModule,
    TableModule,
    DropdownModule,
    InputNumberModule,
    RadioButtonModule,
    ToastModule,
    PanelMenuModule,
    BreadcrumbModule,
    ConfirmDialogModule,
    SplitButtonModule
  ],
  exports:[
    LayoutComponent,
    TopbarComponent,
    FooterComponent
  ],
  providers:[
    LayoutRouterActivate
  ]
})
export class LayoutModule {}

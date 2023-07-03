import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRouterActivate } from './dashboard-router.activate';

import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
  ],

  providers: [
    DashboardRouterActivate,
    DialogService,
    MessageService,
    ConfirmationService,
    DynamicDialogRef,
    DynamicDialogConfig,
  ],
})
export class DashboardModule { }

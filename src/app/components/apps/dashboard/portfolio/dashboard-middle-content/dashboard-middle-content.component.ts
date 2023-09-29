import { Component } from '@angular/core';
import * as data from '../../../../../shared/data/dashboard/crypto'
@Component({
  selector: 'app-dashboard-middle-content',
  templateUrl: './dashboard-middle-content.component.html',
  styleUrls: ['./dashboard-middle-content.component.scss']
})
export class DashboardMiddleContentComponent {

  public Bitcoin = data.Bitcoin
  public Ethereum = data.Ethereum
  public LeaveTravel = data.LeaveTravel
}

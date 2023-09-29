import { Component } from '@angular/core';
import * as chartData from '../../../../../shared/data/dashboard/crypto'

@Component({
  selector: 'app-dashboard-left-content',
  templateUrl: './dashboard-left-content.component.html',
  styleUrls: ['./dashboard-left-content.component.scss']
})
export class DashboardLeftContentComponent {

  public averageSales = chartData.averageSales
  public averageProfit = chartData.averageProfit
  public averageVisits = chartData.averageVisits
}

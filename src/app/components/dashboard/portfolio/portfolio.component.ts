import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TokenTransactionModel } from 'src/app/models/dashboard/token_transaction.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  wallet_name : any = '';
  dashboard_menu: MenuItem[] | undefined;
  token_transaction: TokenTransactionModel[] = [];

  countries: any[] | undefined;

  selectedCountry: any | undefined;

  ngOnInit(): void {
    this.wallet_name = localStorage.getItem("wallet-meta-name");
    this.dashboard_menu = [
        {
            label: 'Portfolio',
            icon: 'pi pi-fw pi-briefcase',
        },
        {
            label: 'Send/ Pay Genesis',
            icon: 'pi pi-fw pi-arrow-up'
        },
        {
          label: 'Buy',
          icon: 'pi pi-fw pi-credit-card'
      }
    ];
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
  ];
  }
}

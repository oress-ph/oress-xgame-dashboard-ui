import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-send-or-pay-genesis',
  templateUrl: './send-or-pay-genesis.component.html',
  styleUrls: ['./send-or-pay-genesis.component.scss']
})
export class SendOrPayGenesisComponent implements OnInit{
  items: MenuItem[] | undefined;
  activeIndex: number = 0;
  wallet_name : any = '';
  wallet_amount: number = 0;
  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  };
  backStep(){
    this.activeIndex -=1;
  }
  nextStep(){
    this.activeIndex +=1;
  }

  ngOnInit() {
    this.wallet_name = localStorage.getItem("wallet-meta-name");
    this.items = [
        {
            label: 'Sent to',
            // routerLink: 'personal'
        },
        {
            label: 'Amount',
            // routerLink: 'seat'
        },
        {
            label: 'Summary',
            // routerLink: 'payment'
        },
        {
            label: 'Confirmation',
            // routerLink: 'confirmation'
        }
    ];
  }
}

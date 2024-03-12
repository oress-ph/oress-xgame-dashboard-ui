import { Component,Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppSettings } from 'src/app/app-settings';
import { WalletModel } from 'src/app/shared/model/wallet.model';
import { NetworkModel } from 'src/app/shared/model/network.model';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent {
  @Input() wallet: WalletModel; // Define Input property
  networks: NetworkModel[] = [];
  connected_network: NetworkModel[] = [];
  selected_networks: NetworkModel[] = [];

  constructor(
    private modalService: NgbModal,
    public appSettings: AppSettings
  ){

  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  public openNotification: boolean = false;
  toggleNotificationMobile() {
    this.openNotification = !this.openNotification;
  }

  public openCart: boolean = false;
  toggleCart() {
    this.openCart = !this.openCart;
  }
}

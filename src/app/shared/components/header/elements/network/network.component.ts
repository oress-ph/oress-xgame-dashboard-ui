import { Component,Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WalletModel } from 'src/app/shared/model/wallet.model';
import { NetworkModel } from 'src/app/shared/model/network.model';
import { CookiesService } from 'src/app/shared/services/cookies.service';
import { environment } from 'src/environments/environment';
import { PolkadotService } from 'src/app/shared/services/polkadot.service';

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
  tokenSymbol: any;
  constructor(
    private modalService: NgbModal,
    private cookiesService: CookiesService,
    private polkadotService: PolkadotService
  ){
    environment.network.forEach(networkGroup => {
      networkGroup.networks.forEach(network => {
        this.networks.push({
          id: network.id,
          name: network.name,
          wsProviderEndpoint: network.wsProviderEndpoint,
          net_name: network.net_name
        })
      });
    });
    if(this.cookiesService.getCookieArray('network')==null){
      this.cookiesService.setCookieArray('network',this.networks[0])
    }
    this.connected_network = this.cookiesService.getCookieArray('network')!=null? this.cookiesService.getCookieArray('network') : this.networks[0];
    this.selected_networks = this.cookiesService.getCookieArray('network')!=null? this.cookiesService.getCookieArray('network') : this.networks[0];
    // this.cookiesService.setCookieArray('network',this.networks[0]);
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
  
  selectedNetwork(network: any){
    this.selected_networks = network;
    this.cookiesService.setCookieArray('network',network);
    window.location.reload();
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-polkadot-identicon',
  templateUrl: './polkadot-identicon.component.html',
  styleUrls: ['./polkadot-identicon.component.scss']
})
export class PolkadotIdenticonComponent {
  constructor(
    private route: ActivatedRoute,
  ){

  }
  wallet_address: string = this.route.snapshot.params['wallet_address'];
}

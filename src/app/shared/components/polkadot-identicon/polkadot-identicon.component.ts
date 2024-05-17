import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-polkadot-identicon',
  templateUrl: './polkadot-identicon.component.html',
  styleUrls: ['./polkadot-identicon.component.scss']
})
export class PolkadotIdenticonComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private layoutService: LayoutService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ){

  }
  wallet_address: string = this.route.snapshot.params['wallet_address'];
  size: "";
  backgroundColor: string = "light-only"; // Default background color

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.size = params['size'];
    });

    const layoutVersion = this.layoutService.config.settings.layout_version;
    if (layoutVersion === 'dark-only') {
      this.backgroundColor = 'dark-only'
    }else{
      this.backgroundColor = 'light-only'
    }
    
  }
}

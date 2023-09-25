import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WalletRoutingModule } from "./wallet-routing.module"
import { WalletComponent } from "./wallet.component";
import { WalletListComponent } from "../../../shared/components/wallet/wallet-list/wallet-list.component";
@NgModule({
  declarations: [
    WalletComponent,
    WalletListComponent
  ],
  imports:[
    CommonModule,
    WalletRoutingModule,
  ],
  exports: [

  ]
})
export class WalletModule {}

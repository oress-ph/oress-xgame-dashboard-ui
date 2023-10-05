import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WalletRoutingModule } from "./wallet-routing.module"
import { WalletComponent } from "./wallet.component";
import { WalletListComponent } from "../../../shared/components/wallet/wallet-list/wallet-list.component";
import { SharedModule } from "src/app/shared/shared.module";
@NgModule({
  declarations: [
    WalletComponent,
    WalletListComponent
  ],

  imports: [CommonModule, SharedModule , WalletRoutingModule],

  exports: [

  ]
})
export class WalletModule {}

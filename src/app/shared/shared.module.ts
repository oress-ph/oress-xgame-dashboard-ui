import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { DragulaModule } from "ng2-dragula";
import { TranslateModule } from "@ngx-translate/core";
import { NgSelectModule } from '@ng-select/ng-select';
// Components
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { CustomizerComponent } from "./components/customizer/customizer.component";
import { FeatherIconsComponent } from "./components/feather-icons/feather-icons.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { ContentComponent } from "./components/layout/content/content.component";
import { FullComponent } from "./components/layout/full/full.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TapToTopComponent } from "./components/tap-to-top/tap-to-top.component";
// Header Elements Components
import { SearchComponent } from "./components/header/elements/search/search.component";
import { MegaMenuComponent } from "./components/header/elements/mega-menu/mega-menu.component";
import { LanguagesComponent } from "./components/header/elements/languages/languages.component";
import { NotificationComponent } from "./components/header/elements/notification/notification.component";
import { BookmarkComponent } from "./components/header/elements/bookmark/bookmark.component";
import { CartComponent } from "./components/header/elements/cart/cart.component";
import { MessageBoxComponent } from "./components/header/elements/message-box/message-box.component";
import { MyAccountComponent } from "./components/header/elements/my-account/my-account.component";
// Directives
import { DisableKeyPressDirective } from "./directives/disable-key-press.directive";
import { OnlyAlphabetsDirective } from "./directives/only-alphabets.directive";
import { OnlyNumbersDirective } from "./directives/only-numbers.directive";
import { ShowOptionsDirective } from "./directives/show-options.directive";
// Services
import { ChatService } from "./services/chat.service";
import { LayoutService } from "./services/layout.service";
import { NavService } from "./services/nav.service";
import { TableService } from "./services/table.service";
import { NgbdSortableHeader } from "./directives/NgbdSortableHeader";
import { DecimalPipe } from "@angular/common";
import { SvgIconComponent } from "./components/svg-icon/svg-icon.component";
import { CarouselModule } from "ngx-owl-carousel-o";
import { SwiperModule } from "swiper/angular";
import { SwiperComponent } from './components/header/elements/swiper/swiper.component';
import { NetworkComponent } from './components/header/elements/network/network.component';
import { GamesService } from "./services/games.service";
import { NftService } from "./services/nft.service";
import { LanguageService } from "./services/language.service";
import { SafePipe } from './pipes/safe.pipe'
import { TranslationPipe } from './pipes/translation.pipe'
import { PolkadotService } from "./services/polkadot.service";
import { LabelService } from './services/label.service';
import { ChatBotService } from './services/chatbot.service';
import { MyPortfolioComponent } from "./../components/apps/dashboard/portfolio/my-portfolio/my-portfolio.component"
import { WalletInfoComponent } from "./components/wallet/wallet-info/wallet-info.component";
import { WalletListComponent } from "./components/wallet/wallet-list/wallet-list.component";
import { NetworkService } from "./../shared/services/network.service"
import { TokenListComponent } from "./components/token-list/token-list.component";
import { PortfolioProfileComponent } from "../components/apps/dashboard/portfolio/portfolio-profile/portfolio-profile.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContentComponent,
    BreadcrumbComponent,
    CustomizerComponent,
    FeatherIconsComponent,
    FullComponent,
    ShowOptionsDirective,
    DisableKeyPressDirective,
    OnlyAlphabetsDirective,
    OnlyNumbersDirective,
    LoaderComponent,
    TapToTopComponent,
    SearchComponent,
    MegaMenuComponent,
    LanguagesComponent,
    NotificationComponent,
    BookmarkComponent,
    CartComponent,
    MessageBoxComponent,
    MyAccountComponent,
    NgbdSortableHeader,
    SvgIconComponent,
    SwiperComponent,
    NetworkComponent,
    MyPortfolioComponent,
    SafePipe,
    TranslationPipe,
    WalletInfoComponent,
    WalletListComponent,
    TokenListComponent,
    PortfolioProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule.forRoot(),
    CarouselModule,
    SwiperModule,
    NgSelectModule],
  providers: [
    NavService, 
    ChatService, 
    LayoutService, 
    TableService, 
    DecimalPipe, 
    GamesService, 
    NftService,
    LanguageService,
    NetworkService,
    LabelService,
    ChatBotService,
  ],
  exports: [NgbModule, FormsModule, ReactiveFormsModule,
    TranslateModule,
    LoaderComponent,
    BreadcrumbComponent,
    FeatherIconsComponent,
    TapToTopComponent,
    DisableKeyPressDirective,
    OnlyAlphabetsDirective,
    OnlyNumbersDirective,
    NgbdSortableHeader,
    SvgIconComponent,
    SwiperModule,
    TranslationPipe,
    MyPortfolioComponent,
    WalletInfoComponent,
    WalletListComponent,
    PortfolioProfileComponent
  ],
})
export class SharedModule {}

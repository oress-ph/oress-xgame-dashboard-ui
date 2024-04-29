import { Component, OnInit, Inject,HostListener } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { NavService,Menu } from "../../services/nav.service";
import { LayoutService } from "../../services/layout.service";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { CookiesService } from "../../services/cookies.service";
import {WalletModel} from './../../model/wallet.model'
import { AppSettings } from "src/app/app-settings";

SwiperCore.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public elem: any;
  public wallet:any = this.cookiesService.getCookieArray("wallet-info");
  constructor(
    public layout: LayoutService, 
    public navServices: NavService, 
    @Inject(DOCUMENT) private document: any,
    private cookiesService: CookiesService,
    public appSettings: AppSettings
    ) {
      this.navServices.social_media_items.subscribe(social_media_menuItems => {
        this.social_media_menuItems = social_media_menuItems;
      });
    }

  ngOnInit() {
    this.elem = document.documentElement;
  }
  backgroundColor = ''; 

  sidebarToggle() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
    this.navServices.megaMenu = false;
    this.navServices.levelMenu = false;
  }

  public social_media_menuItems: Menu[];

  layoutToggle() {
    if ((this.layout.config.settings.layout_version == "dark-only")) {
      document.body.classList.toggle("dark-only");
      this.cookiesService.setCookie("layout_version","light-only")
      this.layout.config.settings.layout_version="light-only";
    }else{
      document.body.classList.toggle("dark-only");
      this.layout.config.settings.layout_version="dark-only";
      this.cookiesService.setCookie("layout_version","dark-only")
    }
    console.log(this.layout.config.settings.layout_version);
    console.log(this.cookiesService.getCookie('layout_version'));
  }

  searchToggle() {
    this.navServices.search = true;
  }



  languageToggle() {
    this.navServices.language = !this.navServices.language;
  }

  toggleFullScreen() {
    this.navServices.fullScreen = !this.navServices.fullScreen;
    if (this.navServices.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
}

import { Injectable, OnDestroy } from "@angular/core";
import { Subject, BehaviorSubject, fromEvent } from "rxjs";
import { takeUntil, debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { AppSettings } from "src/app/app-settings";
import { environment } from "src/environments/environment";

// Menu
export interface Menu {
  headTitle1?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;

  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : true;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen: boolean = false;

  public top_level_domain: string = 'live';

  constructor(
    private router: Router,
    public appSettings: AppSettings
  ) {
          // const url = window.location.href;
          const url = new URL("https://xgame.co/home");

          const hostnameParts = url.hostname.split('.');
          this.top_level_domain = hostnameParts[hostnameParts.length - 1];

    this.setScreenWidth(window.innerWidth);
    fromEvent(window, "resize")
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }

  ngOnDestroy() {

    // this.unsubscriber.next();
    this.unsubscriber.complete();

  }


  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  MENUITEMS: Menu[] = [
    { path: "https://xgame."+this.top_level_domain+"/home?section=about", title: "About", icon: "home", type: "link" },
    { path: "https://xgame."+this.top_level_domain+"/home?section=assets", title: "Assets", icon: "gem", type: "link" },
    { path: "https://xgame."+this.top_level_domain+"/home?section=play", title: "Play", icon: "games", type: "link" },
    { path: "https://xgame."+this.top_level_domain+"/home?section=blogs", title: "Blogs", icon: "blog", type: "link" },
    { path: "https://xgame."+this.top_level_domain+"/home?section=contact", title: "Contact", icon: "contact", type: "link" },
  ];

  FOOTERMENUITEMS: Menu[] = [
    { path: "https://staging.xgame.live/games/all_games", title: "Games", icon: "home", type: "link" },
    // { path: "/nft/all_nft", title: "NFT", icon: "nft", type: "link" },
    { path: "https://staging.nft.xgame.live/marketplace", title: "Marketplace", icon: "market", type: "link" },
    { path: "https://staging.xgame.live/token/all_tokens", title: "Token", icon: "team", type: "link" },
    { path: "https://staging.xgame.live/teams", title: "Teams", icon: "teams", type: "link" },
    { path: "https://staging.xgame.live/blogs", title: "Blogs", icon: "blogs", type: "link" },
  ];

  COMMUNITYMENUITEMS: Menu[] = [
    { path: "https://nft.xgame."+this.top_level_domain+"/marketplace", title: "NFT Marketplace", icon: "home", type: "link" },
    { path: "https://dashboard.xgame."+this.top_level_domain+"/wallet", title: "Dashboard", icon: "gem", type: "link" },
  ];

  LEGALMENUITEMS: Menu[] = [
    { path: "https://xgame."+this.top_level_domain+"/policy/copyright", title: "Copyright Notice", icon: "home", type: "link" },
    { path: "https://xgame."+this.top_level_domain+"/policy/privacy", title: "Privacy Policy", icon: "gem", type: "link" },
    { path: "https://xgame."+this.top_level_domain+"/policy/terms", title: "Terms of Use", icon: "gem", type: "link" },
    { path: "https://xgame."+this.top_level_domain+"/policy/cookie", title: "Cookie Policy", icon: "gem", type: "link" },
    { path: "https://xgame."+this.top_level_domain+"/policy/legal-disclaimer", title: "Legal Disclaimer", icon: "gem", type: "link" },
  ];
  DASHBOARDITEMS: Menu[] = [
    { path: "/portfolio", title: "Portfolio", icon: "widget", type: "link" },
    { path: "/swap", title: "Transfer", icon: "swap", type: "link" },
    { path: "/cash-in", title: "Cash-In", icon: "cash-in", type: "link" },
    { path: "/cash-out", title: "Cash-Out", icon: "cash-out", type: "link" },
    { path: "/investments", title: "Investments", icon: "investment", type: "link" },
  ];

  SOCIALMEDIAMENU: Menu[] = [
    { path: environment.Facebook, title: "Facebook", icon: "social-facebook", type: "link" },
    { path: environment.Instagram, title: "Instagram", icon: "social-instagram", type: "link" },
    { path: environment.Twitter, title: "Twitter", icon: "social-twitter", type: "link" },
    { path: environment.LinkedIn, title: "LinkedIn", icon: "brand-linkedin", type: "link" },
    { path: environment.Discord, title: "Discord", icon: "discord", type: "link" },
    { path: environment.Youtube, title: "Youtube", icon: "youtube-play", type: "link" },
  ];

  OTHERMENUITEMS: Menu[] = [
    // { path: "/about_us", title: "About Us", icon: "home", type: "link" },
    // { path: "/contact_us", title: "Contact Us", icon: "nft", type: "link" },
    // { path: "/teams", title: "Teams", icon: "teams", type: "link" },
    // { path: "/blogs", title: "Blogs", icon: "blogs", type: "link" },
  ];


  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
  community_items = new BehaviorSubject<Menu[]>(this.COMMUNITYMENUITEMS);
  legal_items = new BehaviorSubject<Menu[]>(this.LEGALMENUITEMS);
  footer_items = new BehaviorSubject<Menu[]>(this.FOOTERMENUITEMS);
  dashboard_items = new BehaviorSubject<Menu[]>(this.DASHBOARDITEMS);
  social_media_items = new BehaviorSubject<Menu[]>(this.SOCIALMEDIAMENU);
  other_items = new BehaviorSubject<Menu[]>(this.OTHERMENUITEMS);
}

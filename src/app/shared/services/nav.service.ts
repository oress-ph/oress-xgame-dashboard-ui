import { Injectable, OnDestroy } from "@angular/core";
import { Subject, BehaviorSubject, fromEvent } from "rxjs";
import { takeUntil, debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";

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

  constructor(private router: Router) {
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
    { path: "https://xgame.live/home?section=about", title: "About", icon: "home", type: "link" },
    { path: "https://xgame.live/home?section=assets", title: "Assets", icon: "gem", type: "link" },
    { path: "https://xgame.live/home?section=play", title: "Play", icon: "games", type: "link" },
    { path: "https://xgame.live/home?section=blogs", title: "Blogs", icon: "blog", type: "link" },
    { path: "https://xgame.live/home?section=contact", title: "Contact", icon: "contact", type: "link" },
  ];
  FOOTERMENUITEMS: Menu[] = [
    { path: "https://xgame.live/home?section=about", title: "About", icon: "home", type: "link" },
    { path: "https://xgame.live/web3", title: "Web3 Wallet", icon: "gem", type: "link" },
    { path: "https://xgame.live/games", title: "Game Catalog", icon: "games", type: "link" },
    { path: "https://xgame.live/tokenomics", title: "Tokenomics", icon: "tokens", type: "link" },
    { path: "https://xgame.live/blogs", title: "Blogs", icon: "marketplace", type: "link" },
  ];
  COMMUNITYMENUITEMS: Menu[] = [
    { path: "https://nft.xgame.live/marketplace", title: "NFT Marketplace", icon: "home", type: "link" },
    { path: "https://dashboard.xgame.live/wallet", title: "Dashboard", icon: "gem", type: "link" },
  ];

  LEGALMENUITEMS: Menu[] = [
    { path: "", title: "Copyright Notice", icon: "home", type: "link" },
    { path: "", title: "Privacy Policy", icon: "gem", type: "link" },
    { path: "", title: "Terms of Use", icon: "gem", type: "link" },
    { path: "", title: "Cookie Policy", icon: "gem", type: "link" },
    { path: "", title: "Legal Disclaimer", icon: "gem", type: "link" },
  ];
  DASHBOARDITEMS: Menu[] = [
    { path: "/portfolio", title: "Portfolio", icon: "widget", type: "link" },
    { path: "/swap", title: "Swap", icon: "home", type: "link" },
    { path: "/cash-in", title: "Cash-in", icon: "tokens", type: "link" },
    { path: "/cash-out", title: "Cash-Out", icon: "games", type: "link" },
    { path: "/invests", title: "Investments", icon: "games", type: "link" },
  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
  community_items = new BehaviorSubject<Menu[]>(this.COMMUNITYMENUITEMS);
  legal_items = new BehaviorSubject<Menu[]>(this.LEGALMENUITEMS);
  footer_items = new BehaviorSubject<Menu[]>(this.FOOTERMENUITEMS);
  dashboard_items = new BehaviorSubject<Menu[]>(this.DASHBOARDITEMS);
}

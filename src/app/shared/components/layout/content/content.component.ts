import { AfterViewInit, Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import * as feather from 'feather-icons';
import { LayoutService } from '../../../services/layout.service';
import { NavService } from '../../../services/nav.service';
import { fadeInAnimation } from '../../../data/router-animation/router-animation';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [fadeInAnimation]
})
export class ContentComponent implements OnInit, AfterViewInit {
  
  constructor(private route: ActivatedRoute, public navServices: NavService, 
    public layout: LayoutService) {
      
      this.route.queryParams.subscribe((params) => {
        this.layout.config.settings.layout = params.layout ? params.layout : this.layout.config.settings.layout
      })
  }
    
  ngAfterViewInit() {
    setTimeout(() => {
      feather.replace();
    });
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
  backgroundColor = ''; 
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Set a threshold value based on your design
    const threshold = 10;
    const screenWidth = window.innerWidth;
    // Check if the scroll position is beyond the threshold
    if (scrollPosition > threshold && screenWidth > 991.98) {
      this.backgroundColor = 'rgba(00,00,00, 0.8) !important'; // Set your desired background color with 50% opacity
    } else if(screenWidth > 991.98){
      this.backgroundColor = 'rgba(17, 8, 34, 0)';
    }else{
      this.backgroundColor = 'hsl(225, 14%, 17%)';
    }
  }

  get layoutClass() {
    switch(this.layout.config.settings.layout){
      case "Dubai":
        return "compact-wrapper"
      case "London":
        return "only-body"
      case "Seoul":
        return "compact-wrapper modern-type"
      case "LosAngeles":
        return this.navServices.horizontal ? "horizontal-wrapper material-type" : "compact-wrapper material-type"
      case "Paris":
        return "compact-wrapper dark-sidebar"
      case "Tokyo":
        return "compact-sidebar"
      case "Madrid":
        return "compact-wrapper color-sidebar"
      case "Moscow":
        return "compact-sidebar compact-small"
      case "NewYork":
        return "compact-wrapper box-layout"
      case "Singapore":
        return this.navServices.horizontal ? "horizontal-wrapper enterprice-type" : "compact-wrapper enterprice-type"
      case "Rome":
        return "compact-sidebar compact-small material-icon"
      case "Barcelona":
        return this.navServices.horizontal ? "horizontal-wrapper enterprice-type advance-layout" : "compact-wrapper enterprice-type advance-layout"
      case "horizontal-wrapper":
        return this.navServices.horizontal ? "horizontal-wrapper" : "compact-wrapper"
      default:
        return "compact-wrapper"
    }
  }
  
  ngOnInit() {
    
  }

}

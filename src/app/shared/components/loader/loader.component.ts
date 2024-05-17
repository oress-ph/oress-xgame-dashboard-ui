import { Component, OnInit, OnDestroy,Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() is_loading: boolean;
  public show: boolean = true;
  public isContentShow: boolean = true;

  constructor() {
    // setTimeout(() => {
    //   this.show = false;
    // }, 3000);
    if(this.is_loading==true){
      this.show = true;
      this.isContentShow = false;
    }
    
  }

  ngOnInit() { 
    // if(this.is_loading==false){
    //   this.show = false
    //   console.log(this.is_loading);
    // }else{
    //   this.show = true;
    // }
  }

  ngOnDestroy() { }

}

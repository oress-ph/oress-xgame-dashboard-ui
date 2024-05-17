import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout.service';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  constructor(public layout: LayoutService) { }

  ngOnInit(): void {
  }

}

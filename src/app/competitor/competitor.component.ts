import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-competitor',
  templateUrl: './competitor.component.html',
  styleUrls: ['./competitor.component.sass']
})
export class CompetitorComponent implements OnInit {

  @Input() teamLeader: any;
  constructor() { }

  ngOnInit() {
  }

}

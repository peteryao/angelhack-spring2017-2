import { Component, OnInit } from '@angular/core';

import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  public lineChartData: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}

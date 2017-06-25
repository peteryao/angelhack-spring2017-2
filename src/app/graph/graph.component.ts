import { Component, OnInit } from '@angular/core';

import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  public lineChartData: Array<any>;
  // Doughnut
  public doughnutChartLabels: string[] = ['Twitter', 'Email', 'Website', 'Facebook'];
  public doughnutChartData: number[];
  public doughnutChartType = 'doughnut';
  constructor( private feedbackService: FeedbackService ) { }

  ngOnInit() {
    this.doughnutChartData = [];
    this.doughnutChartData[0] = this.feedbackService.twitterFeedback.length;
    this.doughnutChartData[1] = this.feedbackService.emailFeedback.length;
    this.doughnutChartData[2] = this.feedbackService.websiteFeedback.length;
    this.doughnutChartData[3] = this.feedbackService.facebookFeedback.length;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { SatoriService } from '../satori.service';
import { Feedback } from '../feedback';
import { FeedbackService } from '../feedback.service';

import 'rxjs/Rx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public feedback$: Feedback[] = this.feedbackService.feedback$;

  public emailFeedback: Feedback[] = this.feedbackService.emailFeedback;
  public facebookFeedback: Feedback[] = this.feedbackService.facebookFeedback;
  public twitterFeedback: Feedback[] = this.feedbackService.twitterFeedback;
  public websiteFeedback: Feedback[] = this.feedbackService.websiteFeedback;

  constructor(private satoriService: SatoriService, public feedbackService: FeedbackService) { }

  ngOnInit() {
    this.refreshData();
  }

  private refreshData(): void {
    const self = this;
    this.satoriService.getFeedback().subscribe(res => {
        console.log('refresh data');
        for (const feedback of res) {
          self.feedbackService.feedback$.push(feedback);
          self.parseData(feedback);
        }
        this.subscribeToData();
    });
  }

  private subscribeToData(): void {
      Observable.timer(5000).first().subscribe(() => this.refreshData());
  }

  private parseData(feedback: Feedback) {
    console.log(feedback);
    if (feedback.type.toLowerCase() === 'email') {
      this.feedbackService.emailFeedback.push(feedback);
    }
    if (feedback.type.toLowerCase() === 'facebook') {
      this.feedbackService.facebookFeedback.push(feedback);
    }
    if (feedback.type.toLowerCase() === 'twitter') {
      this.feedbackService.twitterFeedback.push(feedback);
    }
    if (feedback.type.toLowerCase() === 'website') {
      this.feedbackService.websiteFeedback.push(feedback);
    }
  }

  public determineColor(type: string) {
    if (type === 'twitter') {
      return '#55ACEE';
    }
    if (type === 'facebook') {
      return '#3b5998';
    }
    if (type === 'email') {
      return '#dd4b39';
    }
    if (type === 'website') {
      return '#3ccfcf';
    }
    return '#6F6F6F';
  }

  private updateData() {
    this.feedbackService.emailFeedback = [];
    this.feedbackService.facebookFeedback = [];
    this.feedbackService.twitterFeedback = [];
    this.feedbackService.websiteFeedback = [];

    for (const temp of this.feedbackService.feedback$) {
      this.parseData(temp);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { SatoriService } from '../satori.service';
import { Feedback } from '../feedback';

import 'rxjs/Rx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public feedback$: Feedback[] = [];

  public emailFeedback: Feedback[] = [];
  public facebookFeedback: Feedback[] = [];
  public twitterFeedback: Feedback[] = [];
  public websiteFeedback: Feedback[] = [];

  constructor(private satoriService: SatoriService) { }

  ngOnInit() {
    this.refreshData();
  }

  private refreshData(): void {
    const self = this;
    this.satoriService.getFeedback().subscribe(res => {
        console.log('refresh data');
        for (const feedback of res) {
          self.feedback$.push(feedback);
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
      this.emailFeedback.push(feedback);
    }
    if (feedback.type.toLowerCase() === 'facebook') {
      this.facebookFeedback.push(feedback);
    }
    if (feedback.type.toLowerCase() === 'twitter') {
      this.twitterFeedback.push(feedback);
    }
    if (feedback.type.toLowerCase() === 'website') {
      this.websiteFeedback.push(feedback);
    }
  }
}

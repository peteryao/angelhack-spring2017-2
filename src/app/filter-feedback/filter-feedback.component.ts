import { Feedback } from '../feedback';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-filter-feedback',
  templateUrl: './filter-feedback.component.html',
  styleUrls: ['./filter-feedback.component.css']
})
export class FilterFeedbackComponent implements OnInit {
  public title = '';
  public activeFilter: Feedback[] = [];
  public color = '';
  public opacityFilter = '';

  constructor(private feedbackService: FeedbackService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.title = params['filter'];
    });
    this.determineFeedback();
  }

  public getIcon(): string {
    if (this.title.toLowerCase() === 'twitter') {
      return 'mode edit';
    }
    if (this.title.toLowerCase() === 'facebook') {
      return 'laptop chromebook';
    }
    if (this.title.toLowerCase() === 'email') {
      return 'email';
    }
    if (this.title.toLowerCase() === 'website') {
      return 'web';
    }
  }

  public setColor(feed: Feedback): string {
    if (feed.sentiment['score'] === 0) {
      return '#FFFFFF';
    }
    if (feed.sentiment['score'] < 0) {
      return 'firebrick';
    }
    return '#E1F7DB';
  }

  public setOpacity(feed: Feedback): number {
    return ((feed.sentiment['comparative']) + 2.0) / 3.0;
  }

  public determineColor(feed: Feedback) {
    const type = feed.type;
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

  private determineFeedback(): void {
    if (this.title.toLowerCase() === 'twitter') {
      this.activeFilter = this.feedbackService.twitterFeedback;
    }
    if (this.title.toLowerCase() === 'facebook') {
      this.activeFilter = this.feedbackService.facebookFeedback;
    }
    if (this.title.toLowerCase() === 'email') {
      this.activeFilter = this.feedbackService.emailFeedback;
    }
    if (this.title.toLowerCase() === 'website') {
      this.activeFilter = this.feedbackService.websiteFeedback;
    }
  }
}

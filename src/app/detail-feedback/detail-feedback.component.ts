import { Component, OnInit } from '@angular/core';
import { Feedback } from '../feedback';

import { ActivatedRoute, Router } from '@angular/router';

import { FeedbackService } from '../feedback.service'

@Component({
  selector: 'app-detail-feedback',
  templateUrl: './detail-feedback.component.html',
  styleUrls: ['./detail-feedback.component.css']
})
export class DetailFeedbackComponent implements OnInit {
  public feedback: Feedback;
  public value: number;

  constructor(private feedbackService: FeedbackService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.value = params['id'];
    });
    this.feedback = this.feedbackService.feedback$[this.value];
  }

  removeFeedback() {
    this.feedbackService.feedback$.splice(this.value, 1);
    const self = this;
    if (this.feedback.type.toLowerCase() === 'facebook') {
      self.feedbackService.facebookFeedback.shift();
    }
    if (this.feedback.type.toLowerCase() === 'twitter') {
      self.feedbackService.twitterFeedback.shift();
    }
    if (this.feedback.type.toLowerCase() === 'email') {
      self.feedbackService.emailFeedback.shift();
    }
    if (this.feedback.type.toLowerCase() === 'website') {
      self.feedbackService.websiteFeedback.shift();
    }
    this.router.navigateByUrl('/dashboard');
  }

}

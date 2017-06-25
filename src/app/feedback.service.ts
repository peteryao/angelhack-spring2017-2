import { Injectable } from '@angular/core';
import { Feedback } from './feedback';

@Injectable()
export class FeedbackService {
  public feedback$: Feedback[] = [];

  public emailFeedback: Feedback[] = [];
  public facebookFeedback: Feedback[] = [];
  public twitterFeedback: Feedback[] = [];
  public websiteFeedback: Feedback[] = [];
  constructor() { }

}

import * as sentiment from 'sentiment';

export class Feedback {
  type: string;
  message: string;
  sentiment: sentiment;

  constructor(type, message) {
    this.type = type;
    this.message = message;
    this.calculateSentiment();
  }

  private calculateSentiment(): void {
    this.sentiment = sentiment(this.message);
  }
}

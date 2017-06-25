import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Feedback } from '../feedback';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.css']
})
export class MetricComponent implements OnChanges {
  @Input() title = '';
  @Input() feedback: Feedback[];

  constructor() { }

  ngOnChanges() {
    console.log(this.feedback.length);
    console.log(this.feedback);
  }

  private determineColor(type: string) {
    if (type.toLowerCase() === 'twitter') {
      return '#55ACEE';
    }
    if (type.toLowerCase() === 'facebook') {
      return '#3b5998';
    }
    if (type.toLowerCase() === 'email') {
      return '#dd4b39';
    }
    if (type.toLowerCase() === 'website') {
      return '#3ccfcf';
    }
    return '#6F6F6F';
  }

}

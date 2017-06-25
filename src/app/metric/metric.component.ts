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

}

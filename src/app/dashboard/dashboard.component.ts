import { Component, OnInit } from '@angular/core';
import * as RTMClient from 'satori-rtm-sdk';

import { SatoriService } from '../satori.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public metricList: string[] = ['Email', 'Facebook', 'Twitter', 'Website'];
  public rtm = new RTMClient('wss://lfo9a7g5.api.satori.com', '8bbD2E253D46856cD4F7F0b17d6FF262');
  constructor() { }

  ngOnInit() {
    this.initSatoriConnection();
  }

  initSatoriConnection() {
    // create a new subscription with "your-channel" name
    const self = this;
    const channelName = 'angelhack';
    const channel = this.rtm.subscribe(channelName, RTMClient.SubscriptionMode.SIMPLE, {
      history: {count: 100}
    });

    /* set callback for state transition */
    channel.on('enter-subscribed', function () {
      console.log('Subscribed to: ' + channel.subscriptionId);
    });

    /* set callback for PDU with specific action */
    channel.on('rtm/subscription/data', function (pdu) {
      console.log(pdu);
      pdu.body.messages.forEach(function (msg) {
        console.log('Got message: ', msg);
      });
    });

    /* set callback for all subscription PDUs */
    channel.on('data', function (pdu) {
      console.log(pdu);
      if (pdu.action.endsWith('/error')) {
        console.log('Subscription is failed: ', pdu.body);
      }
    });

    this.rtm.start();
  }

}

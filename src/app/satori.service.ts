import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as RTMClient from 'satori-rtm-sdk';

import { Feedback } from './feedback';

@Injectable()
export class SatoriService {
  public rtm = new RTMClient('wss://lfo9a7g5.api.satori.com', '8bbD2E253D46856cD4F7F0b17d6FF262');
  public feedback$: Feedback[] = [];
  public currentFeedback: Feedback[] = [];
  constructor() {
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
    channel.on('enter-subscribed', () => {
      console.log('Subscribed to: ' + channel.subscriptionId);
    });

    /* set callback for PDU with specific action */
    channel.on('rtm/subscription/data', function (pdu) {
      console.log(pdu);
      pdu.body.messages.forEach((res) => {
        console.log('Got message: ', res);
        self.feedback$.push(new Feedback(res.type, res.message))
      });
    });

    /* set callback for all subscription PDUs */
    channel.on('data', (pdu) => {
      console.log(pdu);
      if (pdu.action.endsWith('/error')) {
        console.log('Subscription is failed: ', pdu.body);
      }
    });

    this.rtm.start();
  }

  public getFeedback(): Observable<Feedback[]> {
    const newFeedback: Feedback[] = this.feedback$;
    this.feedback$ = [];
    return Observable.of(newFeedback);
  }

}

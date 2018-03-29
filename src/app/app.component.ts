import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  displayClock = '00:00:00';
  timerObj = null;

  wins = moment('2018-03-29 19:00:00.000-03:00');
  hotseat = moment('2018-03-29 19:10:00.000-03:00');
  goals = moment('2018-03-29 19:50:00.000-03:00');
  end = moment('2018-03-29 20:00:00.000-03:00');
  next = moment(this.wins).add(1, 'weeks');
  displayCurrent = '...';
  countDays = 0;
  hotSeat = 'Hot Seat: Nacho';

  act = -1;

  target = null;
  diff = null;

  refresh() {
    let now = moment();

    if (now.isBefore(this.wins)) {
      console.log('Next Mastermind');
      this.target = this.wins;
      this.displayCurrent = 'Next Mastermind';
      this.act = -1;
    }
    if (now.isSameOrAfter(this.wins)) {
      console.log('W');
      this.target = this.hotseat;
      this.displayCurrent = 'Wins';
      this.act = 0;
    }
    if (now.isSameOrAfter(this.hotseat)) {
      console.log('H');
      this.displayCurrent = this.hotSeat;
      this.target = this.goals;
      this.act = 1;
    }
    if (now.isSameOrAfter(this.goals)) {
      console.log('GOALS');
      this.displayCurrent = 'Goals';
      this.target = this.end;
      this.act = 2;
    }
    if (now.isSameOrAfter(this.end)) {
      console.log('END');
      this.displayCurrent = 'Next Mastermind';
      this.target = this.next;
      this.act = 3;
    }

    let now1 = +now.toDate();
    let target = +this.target.toDate();
    this.diff = target - now1;
    var duration = moment.duration(this.diff, 'milliseconds');
    let pad = (s) => {
      return ("0" + s).slice(-2);
    };
    let days = duration.days();

    this.displayClock = pad(duration.hours()) + ":" + pad(duration.minutes()) + ":" + pad(duration.seconds());
    if (days > 0) {
      this.countDays = days;
    }
    console.log(this.diff);
  }

  ngOnInit() {
    this.displayClock = '00:00:00';
    this.refresh();
    this.timerObj = setInterval(() => { this.refresh(); } , 1000 );
  }
}

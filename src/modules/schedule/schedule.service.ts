import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class ScheduleService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  scheduleTask(newsletter, milliseconds, callback: () => void) {
    const timeout = setTimeout(callback, milliseconds);
    this.schedulerRegistry.addTimeout(newsletter._id, timeout);
  }

  getMillisecondsFromDate(date) {
    const secondsInTheFuture = new Date(date).getTime() / 1000;
    const secondsNow = new Date().getTime() / 1000;
    const difference = Math.round(secondsInTheFuture - secondsNow);
    return difference * 1000;
  }
}

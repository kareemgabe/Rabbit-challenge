import { Injectable } from '@nestjs/common';
import * as Pushover from 'pushover-notifications';

@Injectable()
export class NotificationService {
  private pushover: Pushover;

  constructor() {
    this.pushover = new Pushover({
      user: process.env.PUSHOVER_USER_KEY, 
      token: process.env.PUSHOVER_API_TOKEN, 
    });
  }

  async sendNotification(title: string, message: string) {
    const notification = {
      title,
      message,
    };

    try {
      await this.pushover.send(notification);
      console.log('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}

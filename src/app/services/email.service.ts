import { Injectable, inject } from '@angular/core';
import { init, send } from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmailService {
  constructor() {
    // init can be optional — user will set ENV variables
    if (environment.emailjs && environment.emailjs.userId) {
      init(environment.emailjs.userId);
    }
  }

  async sendContact(data: { name: string; email: string; phone?: string; subject: string; message: string }) {
    const svc = environment.emailjs?.serviceId || 'YOUR_SERVICE_ID';
    const tpl = environment.emailjs?.templateId || 'YOUR_TEMPLATE_ID';

    try {
      const result = await send(svc, tpl, data, environment.emailjs?.userId || undefined);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

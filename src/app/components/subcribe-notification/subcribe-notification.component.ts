import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-subcribe-notification',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subcribe-notification.component.html',
  styleUrl: './subcribe-notification.component.css',
})
export class SubcribeNotificationComponent {
  form = new FormGroup({
    input: new FormControl('', Validators.required),
  });

  confirmCode = new FormGroup({
    input: new FormControl('', Validators.required),
  });

  isSendedMail = false;
  isUnsubscribe = false;

  private httpClient = inject(HttpClient);

  subcribeMail() {
    // alert(this.form.value.input);
    const email = this.form.value.input;

    this.httpClient
      .post(`${environment.BASE_URL}/subscribe-email?email=${email}`, String, {
        observe: 'response',
        responseType: 'text',
      })
      .subscribe({
        next: (data: HttpResponse<string>) => {
          if (data.body === 'This email is already subscribed!') {
            const isConfirm = confirm(
              data.body +
                ' Do you want to unsubscribe email to receive daily weather?'
            );

            if (isConfirm) {
              this.isUnsubscribe = this.unsubscribeEmail(email ?? 'none-email');
            }
          } else {
            alert(data.body);
            this.isSendedMail = true;

            console.log(data);
          }

          this.form.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  confirmEmail() {
    const code = this.confirmCode.value.input;
    this.httpClient
      .post(`${environment.BASE_URL}/confirm-email?code=${code}`, String, {
        observe: 'response',
        responseType: 'text',
      })
      .subscribe({
        next: (data: HttpResponse<string>) => {
          alert(data.body);
          console.log(data);

          this.isSendedMail = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  unsubscribeEmail(email: string): boolean {
    this.httpClient
      .post(
        `${environment.BASE_URL}/unsubscribe-email?email=${email}`,
        String,
        {
          observe: 'response',
          responseType: 'text',
        }
      )
      .subscribe({
        next: (data: HttpResponse<string>) => {
          alert(data.body);
          console.log(data);

          return true;
        },
        error: (err) => {
          console.log(err);
        },
      });

    return false;
  }
}

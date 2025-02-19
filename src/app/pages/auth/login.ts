import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    standalone: true,
    providers: [MessageService],
    imports: [
      ButtonModule,
      CheckboxModule,
      InputTextModule,
      PasswordModule,
      FormsModule,
      RouterModule,
      RippleModule,
      ToastModule
    ],
    template: `
        <p-toast></p-toast>
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div class="rounded-[56px] p-[0.3rem]" style="background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 rounded-[53px]">
                        <div class="text-center mb-8">
                            <img src="https://cdn-icons-png.flaticon.com/512/189/189162.png" alt="MoonLink Logo" class="mx-auto mb-4 w-16 h-16" />
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Moon Link!</div>
                            <span class="text-muted-color font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <input 
                              pInputText 
                              id="email1" 
                              type="text" 
                              placeholder="Email address" 
                              class="w-full md:w-[30rem] mb-8" 
                              [(ngModel)]="email" 
                              name="email" />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <p-password 
                              id="password1" 
                              [(ngModel)]="password" 
                              placeholder="Password" 
                              [toggleMask]="true" 
                              styleClass="mb-4" 
                              [fluid]="true" 
                              [feedback]="false" 
                              name="password">
                            </p-password>

                            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                <div class="flex items-center">
                                    <p-checkbox 
                                      [(ngModel)]="checked" 
                                      id="rememberme1" 
                                      binary 
                                      class="mr-2" 
                                      name="rememberme">
                                    </p-checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <span 
                                  class="font-medium no-underline ml-2 text-right cursor-pointer text-primary" 
                                  (click)="forgotPassword()">
                                  Forgot password?
                                </span>
                            </div>
                            <p-button label="Login" styleClass="w-full" (click)="login()"></p-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class Login {
    email: string = '';
    password: string = '';
    checked: boolean = false;

    constructor(private messageService: MessageService, private router: Router) {}

    login() {
        if (this.email && this.password) {

            this.messageService.add({ 
              severity: 'success', 
              summary: 'Login Successful', 
              detail: 'Welcome to Moon Link!' 
            });

            setTimeout(() => {
                this.router.navigate(['/app'])
            }, 2500);
        } else {
            this.messageService.add({ 
              severity: 'error', 
              summary: 'Login Failed', 
              detail: 'Please enter both email and password.' 
            });
        }
    }

    forgotPassword() {
        if (this.email) {
            this.messageService.add({ 
              severity: 'info', 
              summary: 'Recovery Email Sent', 
              detail: 'Please check your email for recovery instructions.' 
            });
        } else {
            this.messageService.add({ 
              severity: 'warn', 
              summary: 'Email Required', 
              detail: 'Please enter your email to recover your password.' 
            });
        }
    }
}

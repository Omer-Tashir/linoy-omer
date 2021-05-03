import { Component, HostBinding, OnInit } from '@angular/core';
import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

import { DataService, RSVP } from '../services/data.service';

import * as moment from 'moment/moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('homeItem', [
      transition(':enter', [
        style({ opacity: 0 }),
				animate('.5s ease', style({ opacity: 1 }))
      ])
    ]),
    trigger('home', [
      transition('* <=> *', [
        animate(500),
        query('@*', animateChild(), { optional: true })
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ transform: 'scale(0.1)' }),
        animate('.2s .1s ease', style({ transform: 'scale(1)' }))
      ]), 
    ]),
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.1)', opacity: 0 }),
        animate('.5s .1s cubic-bezier(.8, -0.6, 0.2, 1.5)', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]), 
    trigger('listAnimation', [
      transition(':enter', [
        query('@items', stagger(100, animateChild()))
      ])
    ])
  ],
})
export class HomePage implements OnInit {

  form: FormGroup;

  weddingDateStr: string;

  isLoading = false;

  homeTpl: boolean;

  @HostBinding('@home') 
  get home() { 
    return true;
  }

  constructor(
    private data: DataService,
    public loadingController: LoadingController,
    public fb: FormBuilder
  ) {}

  async presentLoading() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'תודה רבה, שולחים את תשובתך ללינוי ועומר',
    });
    await loading.present();
  }

  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));
  }

  ngOnInit(): void {
    this.homeTpl = !this.isReturningUser();
    this.weddingDateStr = moment("20210531", "YYYYMMDD").fromNow();

    this.form = this.fb.group({
      isComming: new FormControl('Y', [Validators.required]),
      fullname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      participants: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(15), Validators.pattern("[0-9]*")]),
    });
  }

  get isComing() {
    return this.form.controls['isComming'];
  }

  get fullname() {
    return this.form.controls['fullname'];
  }

  get participants() {
    return this.form.controls['participants'];
  }

  submit() {
    let rsvp: RSVP = {
      fullname: this.fullname.value,
      isComing: this.isComing.value,
      participants: this.isComing.value === 'Y' ? this.participants.value : 0 
    }

    this.presentLoading().then(() => {
      this.data.putRSVP(rsvp).subscribe(() => {
        localStorage.setItem('returningUser', 'true');
        this.homeTpl = false;
        setTimeout(() => {
          this.loadingDismiss();
        }, 1000);
      });
    });
  }

  isReturningUser() {
    return !!localStorage.getItem('returningUser'); 
  }
}

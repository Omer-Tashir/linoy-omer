import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';

import { DataService, RSVP } from '../services/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = ['לא מגיעים', 'אולי מגיעים', 'מגיעים'];
  public pieChartColors = [
    {
      backgroundColor: ['#cf3c4f', '#e0ac08', '#28ba62'],
    },
  ];
  
  public pieChartData: SingleDataSet = [0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  comming: string[] = [];
  maybeComming: string[] = [];
  notComming: string[] = [];

  isLoading = false;

  constructor(
    private data: DataService,
    public loadingController: LoadingController,
  ) {}

  async presentLoading() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'רק רגע בבקשה...',
    });
    await loading.present();
  }

  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));
  }

  ngOnInit() {
    this.presentLoading().then(() => {
      this.data.getRSVP().subscribe((rsvp: RSVP[]) => {

        const notComming = rsvp.filter(r=>r.isComing==='N');

        const maybeComming = rsvp.filter(r=>r.isComing==='M');
        const maybeCommingCounter = maybeComming.reduce((acc, val) => {
          return acc + val.participants;
        }, 0);

        const comming = rsvp.filter(r=>r.isComing==='Y');
        const commingCounter = comming.reduce((acc, val) => {
          return acc + val.participants;
        }, 0);

        this.pieChartLabels = [
          'לא מגיעים (' + notComming.length + ')',
          'אולי מגיעים (' + maybeCommingCounter + ')',
          'מגיעים (' + commingCounter + ')'
        ]

        this.pieChartData = [
          notComming.length,
          maybeCommingCounter,
          commingCounter
        ];

        setTimeout(() => {
          this.loadingDismiss();
        }, 1000);
      });
    });
  }
}
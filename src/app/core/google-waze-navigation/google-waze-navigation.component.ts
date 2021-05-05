import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-google-waze-navigation',
  templateUrl: './google-waze-navigation.component.html',
  styleUrls: ['./google-waze-navigation.component.scss'],
})
export class GoogleWazeNavigationComponent {

  constructor(
    public actionSheetController: ActionSheetController
  ) { }

  async presentActionSheet() {
    let actionLinks = [];

    actionLinks.push({
      text: 'Google Maps',
      icon: 'assets/google-maps.svg',
      handler: () => {
        window.open("https://maps.google.com/maps?q=%D7%A0%D7%A1%D7%99%D7%94%20%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D&t=m&z=11&output=embed&iwloc=near");
      }
    });

    actionLinks.push({
      text: 'Waze',
      icon: 'assets/waze.svg',
      handler: () => {
        window.open("https://waze.com/ul?q=נסיה - מתחם חלומות ואירועים&navigate=yes");
      }
    });

    actionLinks.push({
      text: 'סגור',
      icon: 'close',
      role: 'cancel',
      handler: () => {}
    });

    const actionSheet = await this.actionSheetController.create({
      header: 'נווט לאירוע',
      buttons: actionLinks
    });

    await actionSheet.present();
  }
}

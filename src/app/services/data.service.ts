import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

export interface RSVP {
  fullname: string;
  participants?: number;
  isComing: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private db: AngularFirestore) {}

  putRSVP(rsvp: RSVP): Observable<any> {
    return from(this.db.collection(`RSVP`).doc(this.db.createId()).set({
      fullname: rsvp?.fullname,
      participants: rsvp?.participants,
      isComing: rsvp?.isComing
    }));
  }
}
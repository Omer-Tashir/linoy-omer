import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  putRSVP(rsvp: RSVP): Observable<string> {
    const uid = localStorage.getItem('uid') ?? this.db.createId();
    return from(this.db.collection(`RSVP`).doc(uid).set({
      fullname: rsvp?.fullname,
      participants: rsvp?.participants,
      isComing: rsvp?.isComing
    })).pipe(
      map(() => uid)
    );
  }
}
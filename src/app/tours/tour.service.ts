import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore'
import { Tour } from './tour'

@Injectable()
export class TourService {
  toursCollection: AngularFirestoreCollection<Tour>
  tourDoc: AngularFirestoreDocument<Tour>

  constructor(private afs: AngularFirestore) {
    this.toursCollection = this.afs.collection('tours', ref =>
      ref.orderBy('published', 'desc')
    )
  }

  getTours() {
    return this.toursCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Tour;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }))
  }

  getPostData(id: string) {
    this.tourDoc = this.afs.doc<Tour>(`tours/${id}`);
    return this.tourDoc.valueChanges();
  }

  create(data: Tour) {
    this.toursCollection.add(data);
  }

  // Get tour id special for delete and uppdate functions
  getTour(id: string) {
    return this.afs.doc<Tour>(`tours/${id}`);
  }

  delete(id: string) {
    return this.getTour(id).delete();
  }

  update(id: string, formData) {
    return this.getTour(id).update(formData);
  }
}
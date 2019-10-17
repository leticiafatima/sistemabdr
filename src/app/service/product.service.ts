import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../model/Product';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productCollection: AngularFirestoreCollection<Product>
  products: Observable<Product[]>

  constructor(public afs: AngularFirestore) {

    this.productCollection = this.afs.collection('product');

    this.products = this.productCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Product
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }


  getProducts() {
    return this.products;
  }

  addProduct(product: Product) {
    this.productCollection.add(product)
  }
}
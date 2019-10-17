import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public products: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.products = db.collection('/product').valueChanges();
  }
  
  ngOnInit() {
  }

}

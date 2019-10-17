import { ProductService } from './../../service/product.service';
import { Product } from './../../model/Product';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss']
})
export class RegisterProductComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  product: Product = {
    nome: '',
    preco: '',
    descricao: ''
  }

  constructor(private productService: ProductService, private storage: AngularFireStorage, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit(
    messageError: string = 'Por favor, verifique se preencheu todos os campos.',
    messageSucess: string = 'Produto Adicionado com Sucesso.',
    action: string = ''
  ) {
    if (this.product.nome != '' && this.product.preco != '' && this.product.descricao != '') {
      this.downloadURL.subscribe(url => {
        this.product.imagem = url;
        this.productService.addProduct(this.product);

          this.product.nome = '',
          this.product.preco = '',
          this.product.descricao = ''
      });

      this.snackBar.open(messageSucess, action, {
        duration: 4000,
        panelClass: ['success-class']
      });
    } else {
      this.snackBar.open(messageError, action, {
        duration: 4000,
        panelClass: ['error-class']
      });
    }
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = Math.random().toString(36).substring(2);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    ).subscribe()
  }

}

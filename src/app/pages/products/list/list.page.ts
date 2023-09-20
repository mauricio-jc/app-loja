import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  api: string = environment.api;
  products: Product[] = [];

  constructor(
    private loadingCtrl: LoadingController,
    private productsService: ProductsService,
  ) {}

  ngOnInit() {
    this.listAll();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando informações...'
    })
    loading.present();
  }

  async closeLoading() {
    await this.loadingCtrl.dismiss();
  }

  async handleRefresh(event: any) {
    await this.listAll();
    event.target.complete();
  }

  async listAll() {
    await this.showLoading();

    this.productsService.listAll().subscribe(async (response) => {
      await this.closeLoading();
      this.products = response;
    });
  }

}

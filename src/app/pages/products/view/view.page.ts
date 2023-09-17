import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  id: string = "";
  product: Product = {};
  api: string = environment.api;
  image1: string = "";
  image2: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private productsService: ProductsService,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.find(this.id);
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

  async find(id: string) {
    await this.showLoading();

    this.productsService.find(id).subscribe(async (response) => {
      await this.closeLoading();
      this.product = response;

      if(this.product.image1 !== null) {
        this.image1 = `${this.api}/products/image/${this.product.image1}`;
      }

      if(this.product.image2 !== null) {
        this.image2 = `${this.api}/products/image/${this.product.image2}`;
      }
    });
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxWhastappButtonModule } from 'ngx-whatsapp-button';
import {
  AngularFireStorageReference,
  AngularFireUploadTask,
  AngularFireStorage
} from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { OptionMenuComponent } from './OptionMenu/OptionMenu.component';
import { ShoesListComponent } from './shoes-list/shoes-list.component';
import { CardProductComponent } from './CardViewProduct/card-product.component';
import {DetailProductComponent} from './DetailProduct/DetailProduct.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import { SignupComponent } from './SigUp/signup.component';
import { ProductCartComponent } from './product-cart/productCart.component';
import { CreateShoeComponent } from './Create-Product/createShoe.component';
import { VentaComponent } from './Ventas/venta.component';
import { LoginComponent } from './Login/login.component';
import { CreateUserComponent } from './Login/User/create-user.component';
import {PerfilComponent} from './Login/Perfil/perfil.component';
import {CreateCategoriaComponent} from './Categoria/create-categoria.component';
import {AppComentarioComponent} from './Comentario/app-comentario.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SignupComponent,
    OptionMenuComponent,
    ShoesListComponent,
    CardProductComponent,
    DetailProductComponent,
    ProductCartComponent,
    CreateShoeComponent,
    VentaComponent,
    LoginComponent,
    CreateUserComponent,
    PerfilComponent,
    CreateCategoriaComponent,
    AppComentarioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxWhastappButtonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'index', component: OptionMenuComponent },
      { path: 'listShoes/:category/One', component: ShoesListComponent },
      { path: 'user/createUser', component: CreateUserComponent },
      { path: 'listShoes/:category/Two', component: ShoesListComponent },
      { path: 'listShoes/:category/tree', component: ShoesListComponent },
      { path: 'listShoes/:category/for', component: ShoesListComponent },
      { path: 'listShoes/List', component: ShoesListComponent },
      { path: 'cart', component: ProductCartComponent },
      { path: 'venta', component: VentaComponent },
      { path: 'modificarPerfil', component: PerfilComponent },
      { path: 'comentario/:productId', component: AppComentarioComponent },
      { path: 'Perfil/:id', component: SignupComponent },
      { path: 'create_shoe', component: CreateShoeComponent },
      { path: 'create_categoria', component: CreateCategoriaComponent },
      { path: 'products/:productId/:category', component: DetailProductComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

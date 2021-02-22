//Importamos la clase BrowserModule, para buscar módulos de angular.
import { BrowserModule } from '@angular/platform-browser';

//Importamos la clase NgModule que es el módulo raíz.
import { NgModule } from '@angular/core';

//Importamos los módulos de ruta
import { AppRoutingModule } from './app-routing.module';

//Importamos los módulos de peticiones HTTP
import {HttpClientModule} from '@angular/common/http';

//Importamos los módulos para trabajar con formularios en Angular
import { FormsModule } from '@angular/forms';

//AppComponent es el componente principal de Angular
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/inicio/header/header.component';
import { SlideshowComponent } from './pages/inicio/slideshow/slideshow.component';
import { GaleriaComponent } from './pages/inicio/galeria/galeria.component';
import { MouseComponent } from './pages/inicio/mouse/mouse.component';
import { ArticulosComponent } from './pages/inicio/articulos/articulos.component';
import { FormularioComponent } from './pages/inicio/formulario/formulario.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';

//Los decoradores son funciones que modifican clases de JavaScript. 
@NgModule({

  //Las declaraciones son las clases de vista que pertenecen a este módulo. 
  declarations: [
    AppComponent,
    HeaderComponent,
    SlideshowComponent,
    GaleriaComponent,
    MouseComponent,
    ArticulosComponent,
    FormularioComponent,
    InicioComponent,
    ArticuloComponent
  ],

 //Importamos otros módulos cuyas clases exportadas sean necesarias para las plantillas de componentes declaradas en este módulo.
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],

 // Los proveedores son los creadores de servicios que este módulo contribuye a la recolección global de servicios; Se vuelven accesibles en todas las partes de la aplicación. Esto lo habilitamos cuando invocamos servicios desde una base de datos.
  providers: [],

  bootstrap: [AppComponent]

})

//Exportamos la clase del módulo raíz para poder ser invocada en otros archivos
export class AppModule { }

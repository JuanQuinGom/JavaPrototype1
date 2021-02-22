import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../../../services/articulos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

	//VARIABLES PÚBLICAS O GLOBALES

	public articulosJson:any;

  	constructor(private articulosService: ArticulosService) { 

		/*=============================================
		RECIBIENDO DATOS DINÁMICOS
		=============================================*/

		this.articulosService.getArticulos()
		.subscribe( respuesta => {
			
			// console.log("respuesta", respuesta);

			this.articulosJson = respuesta;

		})

	}

  	ngOnInit(): void {
  	}

}

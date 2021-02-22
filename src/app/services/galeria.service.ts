import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  	public url: string;

  	constructor(private http: HttpClient) {

  		this.url = "assets/json/galeria.json";

   	}

   	getGaleria(){

   		return this.http.get(this.url);

   	}
}

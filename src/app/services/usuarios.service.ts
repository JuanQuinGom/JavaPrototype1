import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  	public url: string;

  	constructor(private http: HttpClient) {

  		this.url = "assets/json/usuarios.json";

   	}

   	getUsuarios(){

   		return this.http.get(this.url);

   	}
}

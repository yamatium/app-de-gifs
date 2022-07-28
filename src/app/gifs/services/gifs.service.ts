import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey   : string = '5kqG4PjiDmZWfpfLn0f6GQ2dkST36WpF';
  private servicioUrl: string ='https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif [] = [];

  get historial() {
    
    return [...this._historial];
  }

  constructor( private http: HttpClient) {

    //this._historial = JSON.parse(localStorage.getItem('historial')!) || []     lo mismo que 23 y 24 solo que en una linea
    if ( localStorage.getItem( 'historial' ) ){
      this._historial = JSON.parse( localStorage.getItem('historial')! );
    }
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [] ;     //linea 45, se muetra la ultima busqueda de gifs al recargar
  }

  buscarGifs( query: string = '' ) {

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial) );
      
    }


    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '20')
          .set('q', query);

    

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl}/search`, {params}) 
          .subscribe((resp) => {
            
            this.resultados = resp.data;
            localStorage.setItem('resultados', JSON.stringify( this.resultados) );      // se graba resultados en el local storage
          })


  }

}

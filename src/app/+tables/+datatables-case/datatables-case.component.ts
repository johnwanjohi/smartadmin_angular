import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { FadeInTop} from "../../shared/animations/fade-in-top.decorator";
import { HttpClient } from '@angular/common/http';
import { JsonApiService } from "../../core/api/json-api.service";
import { config } from '../../shared/smartadmin.config';
import { regact_api_config } from '../../../assets/api/regactapi.config';


@FadeInTop()
@Component({
  selector: 'sa-datatables-case',
  templateUrl: './datatables-case.component.html',
})

export class DatatablesCaseComponent implements OnInit {
  public REST_ROOT = 'http://localhost:8080/regactapi';
  public API_ROUTE = regact_api_config.REST_ROOT + regact_api_config.API_SET.CURSOS_API.ROOT + regact_api_config.API_SET.CURSOS_API.ROOT + regact_api_config.API_SET.CURSOS_API.ACTIVOS_NOMBRE;
  options = {
      dom: "Bfrtip",
      ajax: (data, callback, settings) => {
        //this.http.get(this.REST_ROOT + '/cursos/consultarCursosActivosPorNombreUsu?nombre=Juan Arcila')
        //.map((data: any)=>(data.data || data))
        // .catch(this.handleError)
        this.jsonApiService.fetchNotObservable(regact_api_config.DEMO_URL)
          .subscribe((data) => {
            console.log('data from rest endpoint', data);
            console.log(this.API_ROUTE);
            callback({
              //aaData: data.aaData.slice(0, 100)
              aaData: data.aaData.slice(0, 100)
            })
          })
      },
      columns: [ 
       /* {data: 'id'}, 
        {data: 'nombre'}, 
        {data: 'cantidadHoras'}, 
        {data: 'fechaInicio'}, 
        {data: 'fechaFin'}, 
        {data: 'estado'}
        */
        {data: 'id'}, 
        {data: 'Curso'}, 
        {data: 'Total Horas Curso'}, 
        {data: 'Fecha Inicio'}, 
        {data: 'Fecha Fin'}, 
        {data: 'Estado'}
      ]
    };

    private getBaseUrl(){
      return location.protocol + '//' + location.hostname + (location.port ? ':'+location.port : '') + '/'
    }

    /*
    public fetch(url): Observable<any>{
      return this.http.get(this.getBaseUrl() + config.API_URL + url)
        .delay(100)
        .map((data: any)=>(data.data|| data))
        .catch(this.handleError)
    }

    this.jsonApiService.fetch( '/graphs/morris.json').subscribe(data => this.morrisDemoData = data)

    */


    constructor(private http: HttpClient, private jsonApiService:JsonApiService) {
    }

  ngOnInit() {    
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
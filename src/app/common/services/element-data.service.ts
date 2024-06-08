import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  
})
export class ElementDataService{
  
  private apiUrl = 'http://localhost:5010/v1/product';

  constructor( private httpClient:HttpClient ) {}

  addProduct(product:object) {
    console.log(this.apiUrl,product)
    return this.httpClient.post((this.apiUrl),product) as any;
  }
  getProductDetails(){
    return this.httpClient.get(this.apiUrl) as any;
  }
  deleteProductList(id:string){
    return this.httpClient.delete(`${this.apiUrl}/${id}`) as any
  }
  updateProductList(id:string, data:object){
    const params= new HttpParams().set('id',id.toString());
    return this.httpClient.put(`${this.apiUrl}`,data, {params}) as any
  }
}

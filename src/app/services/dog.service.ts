import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyData } from '../model/data';

@Injectable({
  providedIn: 'root'
})

export class DogService {

  constructor(private httpclient: HttpClient) { }

  getDog(): Observable<MyData>{
    return this.httpclient.get<MyData>('https://dog.ceo/api/breeds/list/all');
  }

  getImage(dog:string): Observable<MyData>{
    dog = dog.split(" ").join("/");
    return this.httpclient.get<MyData>(`https://dog.ceo/api/breed/${dog}/images/random`);
  }
}

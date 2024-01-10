import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  api="http://localhost:3000/user"

getUsers():Observable<User[]>{
return this.http.get<User[]>(this.api)
}

addUser(postData:any){
  return this.http.post(this.api,postData)
}


}

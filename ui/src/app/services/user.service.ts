import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.API_URL + '/users';

  constructor(
    private http: HttpClient
  ) {
  }

  findByUsername(username: string) {
    return this.http.get(this.url + '/username/' + username);
  }

  updateUser(user: User) {
    return this.http.put(this.url, user);
  }

  getAuthenticatedUser() {
    return this.http.get(this.url + '/authenticated');
  }

  getUsers() {
    return this.http.get(this.url);
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id);
  }

  save(user: User) {
    return this.http.post(this.url, user);
  }

  findById(id) {
    return this.http.get(this.url + '/' + id);
  }

}

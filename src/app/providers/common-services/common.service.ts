import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {
  private result: any;
  private endpoint = 'https://5m718e0hf5.execute-api.us-east-1.amazonaws.com/dev/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(public http: Http) { }

  get(className: string, filters: any) {
    let url = this.endpoint + className;

    if (filters ) {
      let filter = '';

      for (const property in filters) {
        if (filters.hasOwnProperty(property)) {
            filter = property + '=' + filters[property];
        }
      }

      url = url + '?' + filter;
    }

    return new Promise((resolve, reject) => {
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }

  create(className: string, data: any) {
    const url = this.endpoint + className;

    return new Promise((resolve, reject) => {
      this.http.post(url, data)
        .map(res => res.json())
        .subscribe(result => {
          resolve(result);
        }, err => {
          reject(err);
        });
    });
  }

  delete(className: string, id: any) {
    const url = this.endpoint + className + '/' + id;

    return new Promise((resolve, reject) => {
      this.http.delete(url)
        .map(res => res.json())
        .subscribe(data => {
          this.result = data;
          resolve(this.result);
        }, err => {
          reject(err);
        });
    });
  }

}

import { Injectable } from '@angular/core';
//import { fakeListings } from './fake-data';
import { Listing } from './types';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

const httpOptionsWithAuthToken = (token: any) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'AuthToken': token,
  })
});

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth
  ) { }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('https://buy-and-sell-backend.onrender.com/api/listings');
  }

  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`https://buy-and-sell-backend.onrender.com/api/listings/${id}`);
  }

  addViewToListing(id: string): Observable<Listing> {
    return this.http.post<Listing>(
      `https://buy-and-sell-backend.onrender.com/api/listings/${id}/add-view`,
      {}, httpOptions);
  }

  getListingsForUser(): Observable<Listing[]> {
    return new Observable<Listing[]>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          if (user && token) {
            this.http.get<Listing[]>(`https://buy-and-sell-backend.onrender.com/api/users/${user.uid}/listings`, httpOptionsWithAuthToken(token))
              .subscribe(listings => {
                observer.next(listings);
              });
          } else {
            observer.next([]);
          }
        })
      })
    })
    //return this.http.get<Listing[]>('/api/users/12345/listings');
  }

  deleteListing(id: string): Observable<any> {
    return new Observable<any>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          if (user && token) {
            this.http.delete(`https://buy-and-sell-backend.onrender.com/api/listings/${id}`, httpOptionsWithAuthToken(token))
              .subscribe(() => {
                observer.next();
              });
          }
        })
      })
    })
    // return this.http.delete(`/api/listings/${id}`);
  }

  createListing(name: string, description: string, price: number): Observable<Listing> {
    return new Observable<Listing>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          if (user && token) {
            this.http.post<Listing>('https://buy-and-sell-backend.onrender.com/api/listings', { name, description, price }, httpOptionsWithAuthToken(token))
              .subscribe(() => {
                observer.next();
              });
          }
        })
      })
    })

    // return this.http.post<Listing>(
    //   '/api/listings',
    //   { name, description, price },httpOptions
    // );
  }

  editListing(id: string, name: string, description: string, price: number): Observable<Listing> {
    return new Observable<Listing>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          console.log("token",token)
          if (user && token) {
            this.http.post<Listing>(`https://buy-and-sell-backend.onrender.com/api/listings/${id}`, { name, description, price }, httpOptionsWithAuthToken(token))
              .subscribe(() => {
                observer.next();
              });
          }
        })
      });
    });
  }
}

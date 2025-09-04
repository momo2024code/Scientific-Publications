import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';



export interface Publication {
  citationKey: string;
  entryType: string;
  entryTags: {
    author: string;
    year: string;
    title: string;
    journal: string;
    publisher?: string;
    tags?: string;
  };
}

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
  private apiUrl = 'http://localhost:5000/api/publications';

  constructor(private http: HttpClient) {}

  getAllPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiUrl);
  }

  getPublicationsByYear(year: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiUrl}/year/${year}`);
  }

  searchPublications(keyword: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiUrl}/search/${keyword}`);
  }

  uploadPublication(publication: Publication): Observable<any> {
    return this.http.post(this.apiUrl, publication);
  }

    getPublicationByCitationKey(citationKey: string): Observable<Publication> {
        return this.http.get<Publication>(`${this.apiUrl}/${citationKey}`);
    }

}

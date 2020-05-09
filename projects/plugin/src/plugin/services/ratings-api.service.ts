import { Injectable } from '@angular/core';
import { WakoHttpRequestService, WakoHttpError } from '@wako-app/mobile-sdk';
import { Storage } from '@ionic/storage';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class RatingApiService {
  protected omdbBaseUrl = 'http://www.omdbapi.com/?apikey=';
  protected tmdbBaseUrl = 'https://api.themoviedb.org/3/movie/';
  constructor(private storage: Storage) {}
  movie: IMovie;

  getRatings(omdbApi: any, tmdbApi: any, imdbId: string): Observable<Ratings[]> {
    let ratings: Ratings[] = [];
    return this.getOMDBRatings(omdbApi, imdbId).pipe(
      switchMap((omdbResults) => {
        omdbResults.Ratings.forEach((res) => {
          ratings.push({
            source: res.Source,
            value: res.Value
          });
        });
        return this.getTMDBRatings(tmdbApi, imdbId, ratings);
      }),
      catchError((err) => {
        if (err instanceof WakoHttpError && err.status === 401) {
          console.log('OMDB API authorisation error');
        }
        return this.getTMDBRatings(tmdbApi, imdbId, ratings);
      })
    );
  }

  getOMDBRatings(api: string, imdbID: string) {
    return WakoHttpRequestService.get<any>(this.omdbBaseUrl + `${api}&i=${imdbID}`);
  }

  getTMDBRatings(api: string, imdbID: string, ratings: Ratings[]): Observable<any> {
    return WakoHttpRequestService.get<any>(this.tmdbBaseUrl + `${imdbID}?api_key=${api}`).pipe(
      map((tmdbResults) => {
        ratings.push({
          source: 'TMDB',
          value: tmdbResults.vote_average
        });
        return ratings;
      }),
      catchError((err) => {
        if (err instanceof WakoHttpError && err.status === 401) {
          console.log('TMDB API authorisation error');
          return of(ratings);
        }
      })
    );
  }

  setAPI(value, key) {
    this.storage.set(key, value);
  }

  getAPIKey(key) {
    return this.storage.get(key);
  }
}

export interface Ratings {
  source: string;
  value: string;
}

export interface IMovie {
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
  ratings: Ratings[];
  metascore: string;
  imdbrating: string;
  imdbVotes: string;
  imdbid: string;
  type: string;
  dvd: string;
  boxOffice: string;
  production: string;
  website: string;
  response: string;
}

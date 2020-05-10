import { Injectable } from '@angular/core';
import { WakoHttpRequestService, WakoHttpError } from '@wako-app/mobile-sdk';
import { Storage } from '@ionic/storage';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class RatingApiService {
  public omdbBaseUrl = 'http://www.omdbapi.com/?tomatoes=true&apikey=';
  public tmdbBaseUrl = 'https://api.themoviedb.org/3/movie/';
  constructor(private storage: Storage) {}
  movie: IMovie;

  getRatings(omdbApi: any, tmdbApi: any, imdbId: string): Observable<Ratings[]> {
    let ratings: Ratings[] = [];
    return this.getOMDBRatings(omdbApi, imdbId).pipe(
      switchMap((omdbResults) => {
        console.log(omdbResults);
        omdbResults.Ratings.forEach((res) => {
          if (res.Source == Providers.IMDB) {
            ratings.push({
              source: res.Source,
              value: res.Value,
              sourceUrl: 'https://www.imdb.com/title/' + imdbId,
              providerIconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/New-imdb-logo.png'
            });
          } else if (res.Source == Providers.RT) {
            ratings.push({
              source: res.Source,
              value: res.Value,
              sourceUrl: omdbResults.tomatoURL,
              providerIconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/209px-Rotten_Tomatoes.svg.png'
            });
          } else if (res.Source == Providers.MetaCritic) {
            ratings.push({
              source: res.Source,
              value: res.Value,
              sourceUrl: 'https://www.metacritic.com/movie/',
              providerIconUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Metacritic.svg'
            });
          }
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
        console.log(tmdbResults);
        ratings.push({
          source: 'TMDB',
          value: tmdbResults.vote_average,
          sourceUrl: 'https://www.themoviedb.org/movie/' + tmdbResults.id,
          providerIconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tmdb.new.logo.svg/512px-Tmdb.new.logo.svg.png'
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
  sourceUrl: string;
  providerIconUrl: string;
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

export enum Providers {
  IMDB = 'Internet Movie Database',
  RT = 'Rotten Tomatoes',
  MetaCritic = 'Metacritic'
}



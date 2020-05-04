import { Injectable } from '@angular/core';
import { WakoHttpRequestService, Movie } from '@wako-app/mobile-sdk';
import { Storage } from '@ionic/storage';

@Injectable()
export class OmdbApiService {
  protected basUrl = 'http://www.omdbapi.com/?apikey=';
  constructor(private storage: Storage) {}
  movie: IMovie;
  ratings: Ratings[] = [];

  getOMDBRatings(api: string, imdbID: string) {
    console.log(api);
    return WakoHttpRequestService.get<any>(this.basUrl + `${api}&i=${imdbID}`);
  }

  getRatings(api: string, imdbID: string) {
    return this.getOMDBRatings(api, imdbID);
  }

  setAPI(value, key) {
    console.log(key);
    console.log(value);
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
//export interface

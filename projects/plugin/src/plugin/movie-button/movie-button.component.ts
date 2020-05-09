import { Component } from '@angular/core';
import { Movie, MovieDetailBaseComponent } from '@wako-app/mobile-sdk';
import { ModalController } from '@ionic/angular';
import { MediaModalComponent } from '../media-modal/media-modal.component';
import { Ratings, RatingApiService } from '../services/ratings-api.service';

@Component({
  templateUrl: './movie-button.component.html',
  styleUrls: ['./movie-button.component.scss']
})
export class MovieButtonComponent extends MovieDetailBaseComponent {
  movie: Movie;
  ratings: Ratings[] = [];
  hasError: boolean = false;
  errorDetails: string = '';
  constructor(private modalCtrl: ModalController, private omdbService: RatingApiService) {
    super();
  }

  ngOnInit() {
    this.getRatings(this.movie.imdbId);
  }

  async getRatings(imdbId: string) {
    const omdbApi = await this.omdbService.getAPIKey('storedOMDBAPIkey');
    const tmdbApi = await this.omdbService.getAPIKey('storedTMDBAPIkey');
    this.omdbService.getRatings(omdbApi, tmdbApi, imdbId).subscribe(
      (res) => {
        console.log('Component');
        console.log(res);
        this.ratings = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  transform(ratings: Ratings[]) {
    console.log(ratings);
    let hasIMDb: boolean = false;
    let hasRT: boolean = false;
    let hasMeatCritic: boolean = false;

    ratings.forEach((rating) => {
      if (rating.source == 'Internet Movie Database') {
        hasIMDb = true;
      } else if (rating.source == 'Rotten Tomatoes') {
        hasRT = true;
      } else if (rating.source == 'Metacritic') {
        hasMeatCritic = true;
      }
    });

    if (!hasIMDb) {
      ratings.push({
        source: 'Internet Movie Database',
        value: '--'
      });
    }
    if (!hasRT) {
      ratings.push({
        source: 'Rotten Tomatoes',
        value: '--'
      });
    }
    if (!hasMeatCritic) {
      ratings.push({
        source: 'Metacritic',
        value: '--'
      });
    }

    return ratings;
  }

  setMovie(movie: Movie): any {
    this.movie = movie;
  }

  openMovie() {
    this.modalCtrl
      .create({
        component: MediaModalComponent,
        componentProps: {
          movie: this.movie
        }
      })
      .then((modal) => {
        modal.present();
      });
  }
}

import { Component } from '@angular/core';
import { Movie, MovieDetailBaseComponent } from '@wako-app/mobile-sdk';
import { ModalController } from '@ionic/angular';
import { MediaModalComponent } from '../media-modal/media-modal.component';
import { Ratings, OmdbApiService } from '../services/omdb-api.service';

@Component({
  templateUrl: './movie-button.component.html',
  styleUrls: ['./movie-button.component.scss']
})
export class MovieButtonComponent extends MovieDetailBaseComponent {
  movie: Movie;
  ratings: Ratings[] = [];

  constructor(private modalCtrl: ModalController, private omdbService: OmdbApiService) {
    super();
  }

  ngOnInit() {
    this.getRatings(this.movie.imdbId);
  }

  getRatings(imdbId: string) {
    this.omdbService.getRatings(imdbId).subscribe(
      (res: any) => {
        console.log(res.Ratings);
        // this.ratings = res.Ratings;
        res.Ratings.forEach((res) => {
          this.ratings.push({
            source: res.Source,
            value: res.Value
          });
        });
        this.ratings = this.transform(this.ratings);
      },
      (error) => {
        console.log('Error: ', error);
        //this.response = null;
      }
    );
  }

  transform(ratings: Ratings[]) {
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

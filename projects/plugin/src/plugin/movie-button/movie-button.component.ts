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
        //this.transform(this.ratings);
      },
      (error) => {
        console.log('Error: ', error);
        //this.response = null;
      }
    );
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

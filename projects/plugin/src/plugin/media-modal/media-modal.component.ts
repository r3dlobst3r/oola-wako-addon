import { Component, OnInit } from '@angular/core';
import { BrowserService, Episode, Movie, Show } from '@wako-app/mobile-sdk';
import { ModalController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { OmdbApiService, IMovie, Ratings } from '../services/omdb-api.service';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-media-modal',
  templateUrl: './media-modal.component.html',
  styleUrls: ['./media-modal.component.scss']
})
export class MediaModalComponent implements OnInit {
  movie: Movie;
  show: Show;
  episode: Episode;
  ratings: Ratings[] = [];
  constructor(private modalCtrl: ModalController, private toastService: ToastService, private omdbService: OmdbApiService) {}

  ngOnInit() {
    this.toastService.simpleMessage('openMedia', {
      imdbId: this.movie ? this.movie.imdbId : this.show.imdbId
    });
    this.getRatings(this.movie ? this.movie.imdbId : this.show.imdbId);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  openImdb(imdbId: string) {
    BrowserService.open(`http://www.imdb.com/title/${imdbId}/`);
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
  // transform(ratings: Ratings[]) {
  //   ratings.forEach((rating) => {
  //     if (rating.source == 'Metacritic') {
  //       rating.source = (Math.round(+rating.value) * 100).toString();
  //     }
  //     else if (rating.source == 'Internet Movie Database') {
  //       rating.source = (Math.round(+rating.value) * 10).toString();
  //     }
  //   });
 // }
}

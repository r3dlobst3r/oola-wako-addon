import { Component, OnInit } from '@angular/core';
import { BrowserService, Episode, Movie, Show } from '@wako-app/mobile-sdk';
import { ModalController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { OmdbApiService, IMovie, Ratings } from '../services/omdb-api.service';

@Component({
  selector: 'app-media-modal',
  templateUrl: './media-modal.component.html',
  styleUrls: ['./media-modal.component.scss']
})
export class MediaModalComponent implements OnInit {
  movie: Movie;
  show: Show;
  episode: Episode;
  ratings: Ratings[]=[];
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
        //console.log(res.Ratings);
        // this.ratings = res.Ratings;
        res.Ratings.forEach((res) => {
          this.ratings.push({
            source: res.Source,
            value:res.Value
          });
        });
      },
      (error) => {
        console.log('Error: ', error);
        //this.response = null;
      }
    );
  }
}

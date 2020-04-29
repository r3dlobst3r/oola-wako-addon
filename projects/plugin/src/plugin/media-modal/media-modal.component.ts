import { Component, OnInit } from '@angular/core';
import { BrowserService, Episode, Movie, Show } from '@wako-app/mobile-sdk';
import { ModalController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { OmdbApiService, IMovie } from '../services/omdb-api.service';

@Component({
  selector: 'app-media-modal',
  templateUrl: './media-modal.component.html',
  styleUrls: ['./media-modal.component.scss']
})
export class MediaModalComponent implements OnInit {
  movie: Movie;
  show: Show;
  episode: Episode;
  movies: IMovie;
  response: any;
  constructor(private modalCtrl: ModalController, private toastService: ToastService, private omdbService: OmdbApiService) {
    //console.log(this.movie.imdbId);
  }

  ngOnInit() {
    this.toastService.simpleMessage('openMedia', {
      imdbId: this.movie ? this.movie.imdbId : this.show.imdbId
    });
    this.getOMDBRatings(this.movie ? this.movie.imdbId : this.show.imdbId);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  openImdb(imdbId: string) {
    BrowserService.open(`http://www.imdb.com/title/${imdbId}/`);
  }

  getOMDBRatings(imdbId: string) {
    var id = this.movie ? this.movie.imdbId : this.show.imdbId;
    this.omdbService.getRatings(id).subscribe(
      (res) => (console.log(res.Ratings)),
      (error) => {
        console.log('Error: ', error);
        this.response = null;
      }
    );
  }
}

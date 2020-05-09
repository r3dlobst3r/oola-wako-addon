import { Component, OnInit } from '@angular/core';
import { BrowserService, Episode, Movie, Show } from '@wako-app/mobile-sdk';
import { ModalController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { IMovie, Ratings, RatingApiService } from '../services/ratings-api.service';
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
  constructor(private modalCtrl: ModalController, private toastService: ToastService, private omdbService: RatingApiService) {}

  ngOnInit() {
    this.toastService.simpleMessage('openMedia', {
      imdbId: this.movie ? this.movie.imdbId : this.show.imdbId
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  openImdb(imdbId: string) {
    BrowserService.open(`http://www.imdb.com/title/${imdbId}/`);
  }
}

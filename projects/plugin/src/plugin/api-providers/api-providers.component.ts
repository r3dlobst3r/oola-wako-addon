import { Component, OnInit } from '@angular/core';
import { RatingApiService } from '../services/ratings-api.service';

@Component({
  selector: 'app-api-providers',
  templateUrl: './api-providers.component.html',
  styleUrls: ['./api-providers.component.css']
})
export class ApiProvidersComponent implements OnInit {
  constructor(private omdbService: RatingApiService) {}

  omdbAPIKeyValue: string;
  tmdbAPIKeyValue:string;

  ngOnInit() {
    this.omdbService.getAPIKey('storedOMDBAPIkey').then((val) => {
      this.omdbAPIKeyValue = val;
    });

    this.omdbService.getAPIKey('storedTMDBAPIkey').then((val) => {
      this.tmdbAPIKeyValue = val;
    });
  }

  onOMDBAPISubmit() {
    this.omdbService.setAPI(this.omdbAPIKeyValue, 'storedOMDBAPIkey');
  }

  onTMDBAPISubmit() {
    this.omdbService.setAPI(this.tmdbAPIKeyValue, 'storedTMDBAPIkey');
  }
}

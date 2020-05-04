import { Component, OnInit } from '@angular/core';
import { OmdbApiService } from '../services/omdb-api.service';

@Component({
  selector: 'app-api-providers',
  templateUrl: './api-providers.component.html',
  styleUrls: ['./api-providers.component.css']
})
export class ApiProvidersComponent implements OnInit {
  constructor(private omdbService: OmdbApiService) {}

  apiKeyValue: string;

  ngOnInit() {
    this.omdbService.getAPIKey('storedOMDBAPIkey').then((val) => {
      this.apiKeyValue = val;
    });
  }

  onAPISubmit() {
    this.omdbService.setAPI(this.apiKeyValue, 'storedOMDBAPIkey');
  }
}

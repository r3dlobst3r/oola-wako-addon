import { Component, OnInit } from '@angular/core';
import { OmdbApiService } from '../services/omdb-api.service';

@Component({
  selector: 'app-api-providers',
  templateUrl: './api-providers.component.html',
  styleUrls: ['./api-providers.component.css']
})
export class ApiProvidersComponent implements OnInit {
  apiKeyValue: string = 'sss';
  constructor(private omdbService: OmdbApiService) {}

  ngOnInit() {}

  onAPISubmit() {
    this.omdbService.setAPI(this.apiKeyValue);
  }
}

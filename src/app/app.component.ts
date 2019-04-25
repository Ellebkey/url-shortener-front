import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UrlsService} from './services/urls.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UrlsService,
  ],
})

export class AppComponent implements OnInit {
  title = 'URL Shortener';
  lastUrls: any = [];

  submitForm = new FormGroup({
    originalUrl: new FormControl('', Validators.required),
  });

  constructor(
    private urlService: UrlsService,
  ) {}

  ngOnInit(): void {
    this.urlService.get()
      .subscribe((res: any[]) => {
        this.lastUrls = res;
      });
  }
}

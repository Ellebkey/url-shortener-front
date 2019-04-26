/* tslint:disable:no-inferrable-types */
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
  newUrl: boolean = false;
  newShortenedUrl: any = {};
  error: boolean = false;
  errorMessage: string = '';

  submitForm = new FormGroup({
    originalUrl: new FormControl('', Validators.required),
  });

  constructor(
    private urlService: UrlsService,
  ) {}

  loadData() {
    this.urlService.get()
      .subscribe((data: any[]) => {
        this.lastUrls = data;
      });
  }

  submit() {
    this.newUrl = false;
    const urlToSend = this.submitForm.value;
    urlToSend.host = window.location.href;

    this.urlService.create(urlToSend).subscribe(
      (data: any) => {
        this.newShortenedUrl = data;
        this.newUrl = true;
        this.loadData();
      },
      error => {
        this.errorMessage = error.error.message;
        this.error = true;
      }
    );
  }

  goToLink(shortenedUrl) {
    window.open(
      shortenedUrl.originalUrl,
      '_blank'
    );
    this.urlService.updateVisit(shortenedUrl).subscribe(
      (data: any) => {
        this.loadData();
      }
    );
  }

  createSeed() {
    this.urlService.createSeed({ host:  window.location.href }).subscribe(
      (data: any) => {
        this.loadData();
      },
      error => {
        this.errorMessage = error.error.message;
        this.error = true;
      }
    );
  }

  ngOnInit(): void {
    this.loadData();
  }
}

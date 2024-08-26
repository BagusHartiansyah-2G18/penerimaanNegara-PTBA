import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'bootstrap/dist/css/bootstrap.min.css';

// import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
// import "bootstrap-icons/font/bootstrap-icons.css";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'zone.js';
import { registerLicense } from '@syncfusion/ej2-base';


registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhBYVF+WmFZfVpgd19HaFZQTGYuP1ZhSXxXdk1hWH9dcXxUTmNeUkA='); // Replace with your actual license key


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

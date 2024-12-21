// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';  // Import your components
import { SiteDetailsComponent } from './site-details/site-details.component';
import { WebConfigInputsComponent } from './web-config-inputs/web-config-inputs.component';
import { DownloadMsiComponent } from './download-msi/download-msi.component'


export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'dashboard', component: SiteDetailsComponent },
  { path: 'inputs', component: WebConfigInputsComponent},
  { path: 'download', component: DownloadMsiComponent}

  // Add more routes here
];

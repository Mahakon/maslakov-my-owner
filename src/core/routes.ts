import {Routes} from '@angular/router';
import {RewriterComponent} from '../app/rewriter/rewriter.component';

export const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RewriterComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

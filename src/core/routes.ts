import {Routes} from '@angular/router';
import {LoginComponent} from '../app/login/login.component';
import {DictionaryComponent} from '../app/dictionary/dictionary.component';
import {SignupComponent} from '../app/signup/signup.component';
import {SignComponent} from '../app/sign/sign.component';
import {TranslatorComponent} from '../app/dictionary/translator/translator.component';
import {GameComponent} from '../app/dictionary/game/game.component';
import {StatisticsComponent} from '../app/dictionary/statistics/statistics.component';
import {ProfileComponent} from '../app/dictionary/profile/profile.component';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/sign/in'
  },
  {
    path: '',
    children: [
      {
        path: 'sign',
        pathMatch: 'full',
        redirectTo: '/sign/in'
      },
      {
        path: 'sign',
        component: SignComponent,
        children: [
          {
            path: 'in',
            component: LoginComponent
          },
          {
            path: 'up',
            component: SignupComponent
          }
        ]
      },
      {
        path: 'dictionary',
        pathMatch: 'full',
        redirectTo: '/dictionary/translator'
      },
      {
        path: 'dictionary',
        component: DictionaryComponent,
        children: [
          {
            path: 'translator',
            component: TranslatorComponent
          },
          {
            path: 'game',
            component: GameComponent
          },
          {
            path: 'statistics',
            component: StatisticsComponent
          },
          {
            path: 'profile',
            component: ProfileComponent
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

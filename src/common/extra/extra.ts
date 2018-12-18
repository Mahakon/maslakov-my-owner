import {AbstractControl} from '@angular/forms';
import * as _ from 'lodash';

const CONTROL_CONTROLS = 'controls';

export function controlTreeTraversal(control: AbstractControl, callback: (control: AbstractControl) => void) {
  if (control.hasOwnProperty(CONTROL_CONTROLS)) {
    _.forOwn(control[CONTROL_CONTROLS], (item: AbstractControl) => {
      controlTreeTraversal(item, callback);
    });
  } else {
    callback(control);
  }
}

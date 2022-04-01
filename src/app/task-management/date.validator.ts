import { AbstractControl, ValidatorFn } from "@angular/forms";

export function dateValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const minDate = new Date('2021-11-01');
      const maxDate = new Date('2021-11-07');
  
      if(!(control && control.value)) {
        return null;
      }
      console.log('DATEs', minDate , maxDate, control.value);
      return (new Date(control.value) < minDate || new Date(control.value) > maxDate) ? {invalidDate: 'You must have to pick date between ' + minDate +' and ' + maxDate }:null;
    }
}
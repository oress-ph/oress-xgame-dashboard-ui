// translation.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslationPipe implements PipeTransform {
  transform(label: string): string {
    // Retrieve translations from localStorage
    const translationData = localStorage.getItem('translation');
    const translations = JSON.parse(translationData);
    console.log(translations)
    if(translations.filter(translations => translations.label === label)[0] != undefined){
      if (translations.filter(translations => translations.label === label)[0].label_translation[0]?.displayed_label != undefined) {
        return translations.filter(translations => translations.label === label)[0].label_translation[0].displayed_label;
        // return translations.filter(translations => translations.label === label)[0].displayed_label
        
      } else {
          return label;
      }
    }else{
      return label;
    }
  }
}

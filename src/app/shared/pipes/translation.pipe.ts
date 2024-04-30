// translation.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslationPipe implements PipeTransform {
  transform(label: string): string {
    // Retrieve translations from localStorage
    const translationData = localStorage.getItem('translation');
    
    // Check if translationData is null or undefined
    if (!translationData) {
        // console.error('Translation data not found in localStorage');
        return label; // Return the original label
    }

    try {
        // Parse the translation data
        const translations = JSON.parse(translationData);
        
        // Check if translations is an array and not empty
        if (Array.isArray(translations) && translations.length > 0) {
            // Find the translation object matching the label
            const translation = translations.find(t => t.label === label);
            
            if (translation && translation.label_translation && translation.label_translation.length > 0) {
                const displayedLabel = translation.label_translation[0]?.displayed_label;
                
                // Check if displayedLabel is not undefined or null
                if (displayedLabel !== undefined && displayedLabel !== null) {
                    return displayedLabel; // Return the translated label
                }
            }
        }
    } catch (error) {
        console.error('Error parsing translation data:', error);
    }

    // Return the original label if no translation found or if there's an error
    return label;
  }

}

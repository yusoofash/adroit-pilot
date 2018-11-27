import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'resumeName'})
export class ResumeNamePipe implements PipeTransform {
  transform(resumePath: string): string {
    return resumePath.split('\\')[1];
  }
}

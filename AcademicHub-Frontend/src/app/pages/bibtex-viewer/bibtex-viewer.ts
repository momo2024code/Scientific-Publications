import { Component } from '@angular/core';
// @ts-ignore
import * as bibtexParse from 'bibtex-parse-js';
import { PublicationsService, Publication } from '../../shared/services/publications';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bibtex-viewer',
  standalone: false,
  templateUrl: './bibtex-viewer.html',
  styleUrls: ['./bibtex-viewer.css']
})
export class BibtexViewer {
  publications: Publication[] = [];
  error: string | null = null;
  messages: string[] = [];

  constructor(private publicationsService: PublicationsService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result as string;
      try {
        const parsedPubs: any[] = bibtexParse.toJSON(content);
        this.publications = parsedPubs.map(pub => this.mapParsedToPublication(pub));
        this.error = null;
        this.messages = [];
        this.uploadAllPublications();
      } catch {
        this.error = 'Failed to parse the .bib file.';
        this.publications = [];
      }
    };

    reader.readAsText(file);
  }

  mapParsedToPublication(parsed: any): Publication {
    return {
      citationKey: parsed.citationKey || '',
      entryType: parsed.entryType || '',
      entryTags: {
        author: parsed.entryTags.author || '',
        year: parsed.entryTags.year || '',
        title: parsed.entryTags.title || '',
        journal: parsed.entryTags.journal || '',
        publisher: parsed.entryTags.publisher || '',
        tags: parsed.entryTags.tags || '',
      },
    };
  }

  uploadAllPublications(): void {
    this.publications.forEach(pub => {
      this.uploadPublication(pub);
    });
  }

  uploadPublication(pub: Publication): void {
    this.publicationsService.uploadPublication(pub).subscribe({
      next: () => {
        this.messages.push(`Uploaded "${pub.entryTags.title}" successfully.`);
        this.error = null;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this.messages.push(`"${pub.entryTags.title}" already exists.`);
        } else {
          this.messages.push(`Failed to upload "${pub.entryTags.title}": ${err.message}`);
        }
        this.error = null; // We handle error in messages
      }
    });
  }
}

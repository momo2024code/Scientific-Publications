import {Component, OnInit} from '@angular/core';
import {Publication, PublicationsService} from "../../../shared/services/publications";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-publication-detail',
  standalone: false,
  templateUrl: './publication-detail.html',
  styleUrl: './publication-detail.css'
})
export class PublicationDetail implements OnInit {
    publication: Publication | null = null;
    errorMessage = '';

    constructor(
        private route: ActivatedRoute,
        private publicationsService: PublicationsService
    ) {}

    ngOnInit(): void {
        // Get citationKey from URL
        const citationKey = this.route.snapshot.paramMap.get('citationKey');
        if (citationKey) {
            this.publicationsService.getPublicationByCitationKey(citationKey).subscribe({
                next: (data) => {
                    if (data) {
                        this.publication = data;
                    } else {
                        this.errorMessage = 'Publication not found';
                    }
                },
                error: () => {
                    this.errorMessage = 'Error loading publication';
                }
            });
        }
    }
}
import {Component, OnInit} from '@angular/core';
import {Publication, PublicationsService} from '../../shared/services/publications';

@Component({
  selector: 'app-publications',
  standalone: false,
  templateUrl: './publications.html',
  styleUrl: './publications.css'
})
export class Publications implements OnInit {
  publications: Publication[] = [];
  filteredPublications: Publication[] = [];
  errorMessage = '';

  searchTerm: string = '';
  selectedYear: string = '';

  years: string[] = []; // unique years for dropdown

  constructor(private publicationsService: PublicationsService) {}

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications() {
    this.publicationsService.getAllPublications().subscribe({
      next: (data) => {
        this.publications = data;

        // Extract unique years from publications for dropdown
        this.years = Array.from(new Set(data.map(pub => pub.entryTags.year))).sort().reverse();

        this.applyFilters();
      },
      error: () => {
        this.errorMessage = 'Error loading publications';
      }
    });
  }

  applyFilters() {
    const keyword = this.searchTerm.toLowerCase().trim();
    const year = this.selectedYear;

    this.filteredPublications = this.publications.filter(pub => {
      const matchesYear = year ? pub.entryTags.year === year : true;
      const matchesKeyword = keyword ? JSON.stringify(pub.entryTags).toLowerCase().includes(keyword) : true;
      return matchesYear && matchesKeyword;
    });
  }

  onSearchTermChange() {
    this.applyFilters();
  }

  onYearChange() {
    this.applyFilters();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'

import { MenuItem } from 'primeng/api';

import { BreadcrumbMainService } from '../../../../services/commons/breadcrumb-main.service';
import { SeriesService } from '../../../../services/bds/series.service';
import { AuthorsService } from '../../../../services/bds/authors.service';
import { FreeSearchFilters } from '../../../../models/bds/free-search/free-search-filters';
import { FreeSearchService } from '../../../../services/freeSearch/free-search.service';

@Component({
  selector: 'app-free-search-filters',
  templateUrl: './free-search-filters.component.html',
  styleUrls: ['./free-search-filters.component.css']
})
export class FreeSearchFiltersComponent implements OnInit {

  filterForm;
  submitted = false;
  context: string;

  origins = [];
  status = [];
  categories = [];
  languages = [];
  nationalities = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumbMainService: BreadcrumbMainService,
    private freeSearchService: FreeSearchService,
    private seriesService: SeriesService,
    private authorService: AuthorsService,
    private formBuilder: FormBuilder) {

    this.initFilterForm();
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.context = params.get('context');

      if (this.context == 'referential') {
        // Init breacrumb referential
        let item: MenuItem = { label: 'Encyclopédie', routerLink: ['free-search', 'referential'] };
        this.breadcrumbMainService.initialize(item);
        item = { label: 'Consultation', routerLink: ['free-search', 'referential'] };
        this.breadcrumbMainService.add(item);
      } else {
        // Init breacrumb collection
        let item: MenuItem = { label: 'Collection', routerLink: ['free-search', 'library'] };
        this.breadcrumbMainService.initialize(item);
        item = { label: 'Consultation', routerLink: ['free-search', 'library'] };
        this.breadcrumbMainService.add(item);
      }

      // Init filter form
      this.seriesService.getOrigins().subscribe(dataList => {
        this.origins = dataList.origins;
      });

      this.seriesService.getStatus().subscribe(dataList => {
        this.status = dataList.status;
      });

      this.seriesService.getCategories().subscribe(dataList => {
        this.categories = dataList.categories;
      });

      this.seriesService.getLanguages().subscribe(dataList => {
        this.languages = dataList.languages;
      });

      this.authorService.getNationalities().subscribe(dataList => {
        this.nationalities = dataList.nationalities;
      });

    });

  }

  initFilterForm() {
    // Init form to avoid an error when the component is rendered
    this.filterForm = this.formBuilder.group({
      serieTitle: new FormControl('', [Validators.minLength(3)]),
      serieExternalId: new FormControl(''),
      serieCategory: new FormControl(''),
      serieStatus: new FormControl(''),
      serieOrigin: new FormControl(''),
      serieLanguage: new FormControl(''),
      graphicNovelTitle: new FormControl('', [Validators.minLength(3)]),
      graphicNovelExternalId: new FormControl(''),
      graphicNovelPublisher: new FormControl(''),
      graphicNovelCollection: new FormControl(''),
      graphicNovelISBN: new FormControl(''),
      graphicNovelPublicationDateFrom: new FormControl(''),
      graphicNovelPublicationDateTo: new FormControl(''),
      graphicNovelRepublication: new FormControl(''),
      authorLastname: new FormControl('', [Validators.minLength(3)]),
      authorFirstname: new FormControl('', [Validators.minLength(3)]),
      authorNickname: new FormControl('', [Validators.minLength(3)]),
      authorExternalId: new FormControl(''),
      authorNationality: new FormControl('')
    });
  }

  /**
 * Generic error manager for the form controler
 * @param controlName The name property of the field to control (see <mat-error> tag in the template for more details)
 * @param errorName The name property of the error to control (see <mat-error> tag in the template for more details)
 */
  hasError = (controlName: string, errorName: string) => {
    return this.filterForm.controls[controlName].hasError(errorName);
  }

  filterBySeries(freeSearchFilters: FreeSearchFilters) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.filterForm.invalid) {
      return;
    }
    this.freeSearchService.freeSearchFilters = freeSearchFilters;
    this.router.navigate(['../', 'series', this.context]);
  }


  filterByGraphicNovels(freeSearchFilters: FreeSearchFilters) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.filterForm.invalid) {
      return;
    }
    this.freeSearchService.freeSearchFilters = freeSearchFilters;
    this.router.navigate(['../', 'graphic-novels', this.context]);
  }

  filterByAuthors(freeSearchFilters: FreeSearchFilters) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.filterForm.invalid) {
      return;
    }
    this.freeSearchService.freeSearchFilters = freeSearchFilters;
    this.router.navigate(['../', 'authors', this.context]);
  }

  /**
 * Reset User Form
 */
  resetUserForm() {
    this.submitted = false;
    this.initFilterForm();
  }

}

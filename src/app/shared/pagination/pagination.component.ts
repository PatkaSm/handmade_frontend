import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export const paginator = {
  currentPageNumber: 1,
  totalPagesCount: 1,
  count: 1,
  results: [],
};

export interface IPaginator {
  /**
   * Current page
   */
  currentPageNumber: number;
  /**
   * Total pages
   */
  totalPagesCount: number;
  /**
   * Items count
   */
  totalResultsCount: number;
  /**
   * Paginated items
   */
  results: [];
}
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  /**
   * Limit items in page
   */
  @Input() public limit = 16;
  /**
   * Output data event emiter
   */
  @Output() public page = new EventEmitter<any>();
  /**
   * Paginator setter
   */
  @Input() public set paginator(paginator: any) {
    if (paginator) {
      this._paginator = paginator;
      this._setPaginator();
    }
  }
  /**
   * Paginator getter
   */
  public get paginator() {
    return this._paginator;
  }

  /**
   * Is updated query params
   */
  public updatedQueryParams = false;
  /**
   * Pages array
   */
  public pages = [];
  /**
   * Query params list
   */
  public queryParams: any;

  /**
   * Private _paginator
   */
  private _paginator: IPaginator;
  /**
   * Ui Pagination Component Constructor
   *
   * @param {ActivatedRoute} route ActivatedRoute
   * @param {Router} router Router
   * @param {HttpClient} http HttpClient
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient
  ) {}
  /**
   * @ignore
   */
  ngOnInit() {
    this._getQueryParams();
  }
  /**
   * Method for change page
   *
   * @param {number} page Number of page switch
   */
  public onChangePage(page: any = 1): void {
    if (
      page !== +this.queryParams.PageNumber &&
      page > 0 &&
      page <= this.paginator.totalPagesCount
    ) {
      this.updatedQueryParams = false;
      this._updateQueryParams(page);
    }
  }
  /**
   * Method for set paginator
   */
  private _setPaginator(): void {
    let limit = 7;
    let substract = 3;
    this.pages = [];
    /**
     * After loop push
     */
    if (
      this.paginator.currentPageNumber > 2 &&
      this.paginator.totalPagesCount > 10
    ) {
      this.pages.push(1);
    }
    /**
     * After loop strategy
     */
    if (this.paginator.currentPageNumber < 2) {
      substract = 2;
    }

    if (this.paginator.currentPageNumber < 3) {
      limit = 9;
    }

    if (this.paginator.totalPagesCount <= 10) {
      limit = 10;
    }
    /**
     * After & before loop strategy
     */
    if (
      (this.paginator.currentPageNumber === 3 ||
        this.paginator.currentPageNumber >
          this.paginator.totalPagesCount - 7) &&
      this.paginator.totalPagesCount > 10
    ) {
      limit = 8;
    }
    /**
     * After loop push
     */
    if (
      this.paginator.currentPageNumber === 4 &&
      this.paginator.totalPagesCount > 10
    ) {
      this.pages.push(2);
    }

    if (
      this.paginator.currentPageNumber > 4 &&
      this.paginator.totalPagesCount > 10
    ) {
      this.pages.push('...');
    }
    /**
     * before loop strategy
     */
    if (
      this.paginator.currentPageNumber ===
      this.paginator.totalPagesCount - 7
    ) {
      substract = this.paginator.totalPagesCount > 10 ? 3 : 4;
    }

    if (
      this.paginator.currentPageNumber ===
      this.paginator.totalPagesCount - 6
    ) {
      substract = this.paginator.totalPagesCount > 10 ? 3 : 5;
    }

    if (
      this.paginator.currentPageNumber ===
      this.paginator.totalPagesCount - 5
    ) {
      substract = this.paginator.totalPagesCount > 10 ? 4 : 6;
    }

    if (
      this.paginator.currentPageNumber ===
      this.paginator.totalPagesCount - 4
    ) {
      substract = this.paginator.totalPagesCount > 10 ? 5 : 7;
    }

    if (
      this.paginator.currentPageNumber ===
      this.paginator.totalPagesCount - 3
    ) {
      substract = this.paginator.totalPagesCount > 10 ? 6 : 8;
    }

    if (
      this.paginator.currentPageNumber ===
      this.paginator.totalPagesCount - 2
    ) {
      substract = this.paginator.totalPagesCount > 10 ? 7 : 9;
    }

    if (
      this.paginator.currentPageNumber ===
      this.paginator.totalPagesCount - 1
    ) {
      substract = this.paginator.totalPagesCount > 10 ? 8 : 10;
    }

    if (this.paginator.currentPageNumber === this.paginator.totalPagesCount) {
      substract = this.paginator.totalPagesCount > 10 ? 9 : 11;
    }
    /**
     * loop
     */
    for (let i = 1; i < limit; i++) {
      const result = this.paginator.currentPageNumber + 1 + i - substract;
      if (result > 0 && result < this.paginator.totalPagesCount) {
        this.pages.push(result);
      }
    }
    /**
     * Before loop push
     */
    if (
      this.paginator.currentPageNumber < this.paginator.totalPagesCount - 6 &&
      this.paginator.totalPagesCount > 10
    ) {
      this.pages.push('...');
    }

    this.pages.push(this.paginator.totalPagesCount);
  }
  /**
   * Method for listener query params changes
   */
  private _getQueryParams(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.queryParams = params;
      if (
        !this.queryParams.PageNumber ||
        !this.queryParams.ResultsOnPageLimit ||
        +this.queryParams.ResultsOnPageLimit !== +this.limit
      ) {
        this.updatedQueryParams = false;
        this._updateQueryParams(1);
      } else {
        this._getPage();
      }
    });
  }
  /**
   * Method for send get page data request
   */
  private _getPage(): void {
    this.page.emit(this.queryParams);
  }
  /**
   * Method for update query params
   *
   * @param {number} page Page
   */
  private _updateQueryParams(page: number): void {
    if (!this.updatedQueryParams) {
      this.updatedQueryParams = true;
      this.queryParams = {
        ...this.queryParams,
        PageNumber: page,
        ResultsOnPageLimit: +this.limit,
      };
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: this.queryParams,
        queryParamsHandling: 'merge',
      });
    } else {
      window.history.back();
    }
  }
}

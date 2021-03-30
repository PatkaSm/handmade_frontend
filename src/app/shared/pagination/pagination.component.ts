import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  /**
   * Number of items on page
   */
  @Input() pageSize: number;
  /**
   * Number of all items
   */
  @Input() items: number;
  /**
   * Current page
   */
  @Input() page: number;
  /**
   * Pagination offset
   */
  @Input() offset = 2;
  /**
   * Show pagination offset
   */
  @Input() showOffsets = false;
  /**
   * Emit event when page was changed
   */
  @Output() pageChange = new EventEmitter();

  @Input() public sizes = [5, 15, 30, 50, 100];

  /**
   * Emiter for changes. Working outside pageChange( page value changed )
   *
   */
  @Output() changes = new EventEmitter();

  /**
   * Array of pages
   */
  public pagesArray: number[] = [];
  /**
   * Number of all pages
   */
  public pages: number;
  /**
   * Pagination start number
   */
  public start: number;
  /**
   * Pagination end number
   */
  public end: number;

  /**
   * @ignore
   *
   */
  public inputValue = 1;

  /**
   * Rerender pagination on every change
   */
  ngOnChanges() {
    this.rerender();
  }
  changePage(value: number) {
    this.page = value;
    setTimeout(() => {
      if (value > this.pages) value = this.pages;
      if (value <= 0) value = 1;

      this.pageClick(value);
    }, 0);
  }

  /**
   * Calculate pages and pagination offset
   */
  rerender(): void {
    this.pagesArray = [];
    this.pages = Math.ceil(Number(this.items) / Number(this.pageSize));
    this.start =
      Number(this.page) > Number(this.offset)
        ? Number(this.page) - Number(this.offset)
        : 1;
    this.end =
      Number(this.page) + Number(this.offset) > this.pages
        ? this.pages
        : Number(this.page) + Number(this.offset);
    for (let i = this.start; i <= this.end; i++) {
      this.pagesArray.push(i);
    }
  }

  /**
   * Change page and emit change to parent
   * @param page Page
   */
  pageClick(page: number) {
    this.page = page;
    this.pageChange.emit(page);
  }

  /**
   * Emit page change via emiter
   *
   * @param pageSize Page size
   */
  emitChanges(pageSize: number) {
    this.page = 1;
    this.inputValue = this.page;

    this.changes.emit({
      page: this.page,
      limit: pageSize,
    });
  }
}

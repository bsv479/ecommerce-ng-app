import {Component, OnInit} from '@angular/core';
import {Product} from '../../common/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] | undefined;
  currentCategoryId = 1; // default category id is 1
  previousCategoryId = 1;
  searchMode = false;

  // properties for pagination
  theCurrentPageNumber = 1;
  thePageSize = 9;
  theTotalElements = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }


  listProducts(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }


  handleSearchProducts(): void {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }


  handleListProducts(): void {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    // Checking category id existence
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    // Checking
    if (this.previousCategoryId !== this.currentCategoryId) {
      this.theCurrentPageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.theCurrentPageNumber - 1, this.thePageSize, this.currentCategoryId)
      .subscribe(this.processResult());
  }


  // tslint:disable-next-line:typedef
  private processResult() {
    return date => {
      this.products = date._embedded.products;
      this.thePageSize = date.page.size;
      this.theTotalElements = date.page.totalElements;
      this.theCurrentPageNumber = date.page.number + 1;
    };
  }
}

import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  totalPrice = 0.00;
  totalQuality = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.updateCartStatus();
  }


  private updateCartStatus(): void {
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuality = data
    );

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
  }
}

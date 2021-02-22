import {Injectable} from '@angular/core';
import {CartItem} from '../common/cart-item';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {
  }

  addToCart(theCartItem: CartItem): void {
    // Check if it's already item in the cart
    let alreadyExistsInCart = false;
    let existingCartItem: CartItem;

    if (this.cartItems.length > 0) {
      // find the item in the cart by item id
      existingCartItem = this.cartItems.find(cartItem => {
        return cartItem.id === theCartItem.id;
      });
      alreadyExistsInCart = (existingCartItem !== undefined);
    }

    // check if we found it
    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }


  computeCartTotals(): void {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;

    for (const cartItem of this.cartItems) {
      totalPriceValue += cartItem.quantity * cartItem.unitPrice;
      totalQuantityValue += cartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}

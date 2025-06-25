import { Component, computed, inject, Input, signal, Signal, WritableSignal, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { catchError, of } from 'rxjs';
import { MyTranslateService } from './../../services/myTranslate/my-translate.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/services/Cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isLogin: boolean = false;

  private readonly router = inject(Router);
  private readonly _MyTranslateService = inject(MyTranslateService);
  private readonly _AuthService = inject(AuthService);
  readonly translateService = inject(TranslateService);
  private readonly _CartService = inject(CartService);

  // Cart number signal
  cartNumber: Signal<number> = computed(() => this._CartService.cartNumber());

  // Convert router events to signal - tracks current route
  route = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url),
      startWith(this.router.url),
      catchError(() => of('/'))
    ),
    { initialValue: this.router.url }
  );

  // Computed signals for showing/hiding nav links
  showLoginLink = computed(() => !this.isLogin && this.route() !== '/login');
  showRegisterLink = computed(() => !this.isLogin && this.route() !== '/register');

  ngOnInit(): void {
    // Get cart data if user is logged in
    if (this.isLogin) {
      this._CartService.getLoggedUserCart().subscribe({
        next: (res) => {
          console.log('Cart data:', res);
          this._CartService.cartNumber.set(res.numOfCartItems || 0);
        },
        error: (error) => {
          console.error('Error fetching cart:', error);
          this._CartService.cartNumber.set(0);
        }
      });
    }
  }

  logOut(): void {
    this._AuthService.logOut();
    this.isLogin = false;
    this._CartService.cartNumber.set(0); // Reset cart number
  }

  changeLang(lang: string): void {
    this._MyTranslateService.changeLang(lang);
  }

  // Helper method to prevent default link behavior
  preventDefault(event: Event): void {
    event.preventDefault();
  }
}
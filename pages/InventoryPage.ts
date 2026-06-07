import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for SauceDemo Inventory (products) page.
 */
export class InventoryPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList  = page.locator('.inventory_item');
    this.cartBadge    = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartIcon     = page.locator('.shopping_cart_link');
  }

  async addFirstItemToCart() {
    await this.page.locator('.btn_inventory').first().click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const raw = await this.page.locator('.inventory_item_price').allTextContents();
    return raw.map(p => parseFloat(p.replace('$', '')));
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}

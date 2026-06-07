import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { USERS } from '../utils/testData';

/**
 * Inventory / Product listing test suite — SauceDemo
 *
 * Covers: product count, sorting (A-Z, Z-A, price low-high, price high-low),
 * add to cart, cart badge counter.
 */

test.describe('Inventory', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
  });

  test('inventory page displays 6 products', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await expect(inventory.productList).toHaveCount(6);
  });

  test('products sort A-Z correctly', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('az');

    const names = await inventory.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('products sort Z-A correctly', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('za');

    const names = await inventory.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('products sort by price low to high', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('lohi');

    const prices = await inventory.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('products sort by price high to low', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('hilo');

    const prices = await inventory.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('adding item to cart updates badge counter', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addFirstItemToCart();

    await expect(inventory.cartBadge).toBeVisible();
    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('cart badge shows correct count after adding multiple items', async ({ page }) => {
    const inventory = new InventoryPage(page);

    // Add 3 items
    const addButtons = page.locator('.btn_inventory');
    await addButtons.nth(0).click();
    await addButtons.nth(1).click();
    await addButtons.nth(2).click();

    await expect(inventory.cartBadge).toHaveText('3');
  });

});

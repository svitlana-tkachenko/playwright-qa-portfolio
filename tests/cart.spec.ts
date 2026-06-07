import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { USERS } from '../utils/testData';

/**
 * Cart & Checkout test suite — SauceDemo
 *
 * Covers: cart persistence, item removal, checkout flow,
 * empty cart edge case.
 */

test.describe('Cart', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
  });

  test('added item appears in cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addFirstItemToCart();
    await inventory.goToCart();

    expect(await cart.getItemCount()).toBe(1);
  });

  test('cart is empty by default', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.goToCart();

    expect(await cart.getItemCount()).toBe(0);
    await expect(inventory.cartBadge).not.toBeVisible();
  });

  test('removing item from cart updates badge', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.addFirstItemToCart();
    await expect(inventory.cartBadge).toHaveText('1');

    // Remove from inventory page
    await page.locator('.btn_inventory').first().click(); // becomes "Remove"
    await expect(inventory.cartBadge).not.toBeVisible();
  });

  test('checkout button navigates to checkout step one', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addFirstItemToCart();
    await inventory.goToCart();
    await cart.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
  });

});

test.describe('Checkout', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
  });

  test('checkout form requires all fields', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addFirstItemToCart();
    await inventory.goToCart();
    await cart.proceedToCheckout();

    // Submit empty form
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('complete checkout shows confirmation', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.addFirstItemToCart();
    await inventory.goToCart();
    await cart.proceedToCheckout();

    await page.locator('[data-test="firstName"]').fill('Svitlana');
    await page.locator('[data-test="lastName"]').fill('Tkachenko');
    await page.locator('[data-test="postalCode"]').fill('94538');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-two/);
    await page.locator('[data-test="finish"]').click();

    await expect(page.locator('.complete-header')).toContainText('Thank you');
  });

});

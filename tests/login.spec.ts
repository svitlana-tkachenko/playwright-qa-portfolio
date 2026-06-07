import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS, ERRORS, URLS } from '../utils/testData';

/**
 * Login test suite — SauceDemo
 *
 * Covers: happy path, locked user, invalid credentials,
 * empty field validation, and UI visibility checks.
 */

test.describe('Login', () => {

  test('successful login redirects to inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('locked out user sees error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.locked.username, USERS.locked.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(ERRORS.locked);
    await expect(page).toHaveURL('/'); // stays on login
  });

  test('invalid credentials show error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(ERRORS.invalidCreds);
  });

  test('empty username shows validation error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', USERS.standard.password);

    await expect(loginPage.errorMessage).toContainText(ERRORS.emptyUsername);
  });

  test('empty password shows validation error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, '');

    await expect(loginPage.errorMessage).toContainText(ERRORS.emptyPassword);
  });

  test('login form elements are visible on load', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.errorMessage).not.toBeVisible();
  });

});

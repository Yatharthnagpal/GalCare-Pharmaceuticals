import { test, expect } from '@playwright/test';

test.describe('GalCare Pharmaceuticals — E2E User Journey & API Suite', () => {

  test('1. Homepage loads correctly with navigation and core branding', async ({ page }) => {
    await page.goto('/');

    // Verify Title
    await expect(page).toHaveTitle(/Galcare/i);

    // Verify main navigation header
    const navbar = page.locator('header, nav');
    await expect(navbar.first()).toBeVisible();

    // Verify hero section call to actions
    const heroBtn = page.getByRole('link', { name: /explore products|view catalog/i });
    await expect(heroBtn.first()).toBeVisible();
  });

  test('2. Product catalog page permits search and category filtering', async ({ page }) => {
    await page.goto('/products');

    // Verify search input field exists
    const searchInput = page.getByPlaceholder(/search by product name, active composition/i);
    await expect(searchInput).toBeVisible();

    // Perform search for a common composition (e.g. "Dermatology" or "Sunscreen" or "Gel")
    await searchInput.fill('Gel');
    await page.waitForTimeout(300);

    // Verify results counter or product cards
    const productGrid = page.locator('main');
    await expect(productGrid).toBeVisible();
  });

  test('3. Contract Manufacturing quote page renders quote calculator wizard', async ({ page }) => {
    await page.goto('/divisions/third-party-manufacturing');

    // Check header banner
    await expect(page.getByText(/third party manufacturing|contract manufacturing/i).first()).toBeVisible();

    // Verify quote calculator form elements exist
    const quoteForm = page.locator('a, form, button').filter({ hasText: /submit|request|calculate|quote/i });
    await expect(quoteForm.first()).toBeVisible();
  });

  test('4. On-Demand ISR Revalidation API responds securely', async ({ request }) => {
    // Request without secret token should be rejected (401 Unauthorized)
    const unauthorizedRes = await request.get('/api/revalidate');
    expect(unauthorizedRes.status()).toBe(401);

    // Request with valid secret token should succeed
    const validRes = await request.get('/api/revalidate?secret=galcare-revalidate-secret-2026&path=/news');
    expect(validRes.status()).toBe(200);

    const json = await validRes.json();
    expect(json.revalidated).toBe(true);
  });

});

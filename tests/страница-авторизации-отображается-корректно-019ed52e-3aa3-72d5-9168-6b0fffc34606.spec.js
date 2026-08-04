const { test, expect } = require('@playwright/test');
const { testit } = require('testit-adapter-playwright');
/**
 * @externalId 512
 * @recipeId 019ed52e-3aa3-72d5-9168-6b0fffc34606
 * @title Страница авторизации отображается корректно
 * @description Automatically generated test
 */
test(
  'Страница авторизации отображается корректно',
  { tag: ['@regression', '@smoke', '@to-automate'] },
  async ({ page }) => {
    testit.workItemIds(['512']);

    // Navigate to initial page
    {
      let apiTriggered = false;
      const pendingApiRequests = new Set();
      const isApiRequest = (req) => {
        const t = req.resourceType();
        return t === 'fetch' || t === 'xhr';
      };
      const onReq = (req) => {
        if (isApiRequest(req)) {
          apiTriggered = true;
          pendingApiRequests.add(req);
        }
      };
      const onApiRequestSettled = (req) => {
        pendingApiRequests.delete(req);
      };
      page.on('request', onReq);
      page.on('requestfinished', onApiRequestSettled);
      page.on('requestfailed', onApiRequestSettled);

      try {
        await page.goto('/');

        await page.waitForTimeout(500);
        if (apiTriggered) {
          let idleSamples = 0;
          let totalElapsed = 0;
          while (totalElapsed < 2000) {
            await page.waitForTimeout(50);
            totalElapsed += 50;
            if (pendingApiRequests.size > 0) {
              idleSamples = 0;
            } else if (++idleSamples >= 3) {
              break;
            }
          }
          await page.waitForTimeout(200);
        }
      } finally {
        page.off('request', onReq);
        page.off('requestfinished', onApiRequestSettled);
        page.off('requestfailed', onApiRequestSettled);
      }
    }

    // Step 1: Открыть в браузере сайт приложения
    // Expected result: Сайт успешно открылся, Отображается: приветствие, форма авторизации
    // Assertion: Сайт успешно открылся — URL содержит /login
    await expect(page).toHaveURL(new RegExp('\\/login'));
    // Assertion: Отображается приветствие на странице авторизации
    await expect(page.locator("h3:has-text('С возвращением')")).toBeVisible();
    // Assertion: Отображается поле Email в форме авторизации
    await expect(page.locator("input[placeholder='Email']")).toBeVisible();
    // Assertion: Отображается поле Пароль в форме авторизации
    await expect(page.locator("input[placeholder='Пароль']")).toBeVisible();
    // Assertion: Отображается кнопка 'Войти' в форме авторизации
    await expect(
      page.locator("[data-testid='login-button-submit']"),
    ).toBeVisible();

    // Test completed
  },
);

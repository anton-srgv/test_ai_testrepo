const { test, expect } = require('@playwright/test');
const { fillInput } = require('../helpers/fillInput.js');
const { testit } = require('testit-adapter-playwright');
/**
 * @externalId 365
 * @recipeId 019fa7bd-5c11-725f-85eb-248fc0c2be2b
 * @title TC-09. Проверка стилей на странице, копия прода (TS-370)
 * @description Automatically generated test
 */
test('TC-09 Проверка стилей на странице копия прода TS-370', async ({
  page,
}) => {
  testit.workItemIds(['365']);

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

  // Step 1: Копия прода развернута. Доступна страница TESTAI-1

  // Step 2: Авторизоваться пользователем с доступом к странице TESTAI-1
  // Expected result: Авторизация проходит успешно. Пользователь перенаправлен в систему и видит рабочий интерфейс
  // Action: Input variable value into element with data-attribute
  await page.waitForTimeout(300);

  {
    let navigationTriggered = false;
    const onFrameNavigated = (frame) => {
      if (frame === page.mainFrame()) navigationTriggered = true;
    };
    page.on('framenavigated', onFrameNavigated);
    // TODO(basic-auth): a click/input/hover that navigates can land on a Basic-auth-protected
    //   page (401 + WWW-Authenticate: Basic), just like the Navigate capability. Detect it here
    //   the same way (set context.isBasicAuthChallengeActive, surface BASIC_AUTH_REQUIRED) so the
    //   BaseAuthenticate recovery flow works for navigations triggered by an interaction too.
    try {
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
          await fillInput(
            page,
            "[data-testid='loginInput']",
            process.env.teamstorm_login,
          );

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

      if (navigationTriggered) {
        try {
          await page.waitForLoadState('load', { timeout: 60000 });
        } catch (_) {
          /* load may never fire (third-party scripts); proceed best-effort */
        }
        try {
          await page.evaluate(
            ({ quietWindow, timeout }) =>
              new Promise((resolve) => {
                let done = false;
                let quietTimer = null;
                let hardTimer = null;
                const finish = () => {
                  if (!done) {
                    done = true;
                    observer.disconnect();
                    clearTimeout(quietTimer);
                    clearTimeout(hardTimer);
                    resolve();
                  }
                };
                const bump = () => {
                  clearTimeout(quietTimer);
                  quietTimer = setTimeout(finish, quietWindow);
                };
                const observer = new MutationObserver(bump);
                observer.observe(document.body, {
                  childList: true,
                  subtree: true,
                });
                bump();
                hardTimer = setTimeout(finish, timeout);
              }),
            { quietWindow: 300, timeout: 5000 },
          );
        } catch (_) {
          /* execution context destroyed by a redirect-chain navigation — page already moved on */
        }
        await page.waitForTimeout(200);
      }
    } finally {
      page.off('framenavigated', onFrameNavigated);
    }
  }
  // Action: Input variable value into element with data-attribute
  await page.waitForTimeout(300);

  {
    let navigationTriggered = false;
    const onFrameNavigated = (frame) => {
      if (frame === page.mainFrame()) navigationTriggered = true;
    };
    page.on('framenavigated', onFrameNavigated);
    // TODO(basic-auth): a click/input/hover that navigates can land on a Basic-auth-protected
    //   page (401 + WWW-Authenticate: Basic), just like the Navigate capability. Detect it here
    //   the same way (set context.isBasicAuthChallengeActive, surface BASIC_AUTH_REQUIRED) so the
    //   BaseAuthenticate recovery flow works for navigations triggered by an interaction too.
    try {
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
          await fillInput(
            page,
            "[data-testid='passwordInput']",
            process.env.teamstorm_pass,
          );

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

      if (navigationTriggered) {
        try {
          await page.waitForLoadState('load', { timeout: 60000 });
        } catch (_) {
          /* load may never fire (third-party scripts); proceed best-effort */
        }
        try {
          await page.evaluate(
            ({ quietWindow, timeout }) =>
              new Promise((resolve) => {
                let done = false;
                let quietTimer = null;
                let hardTimer = null;
                const finish = () => {
                  if (!done) {
                    done = true;
                    observer.disconnect();
                    clearTimeout(quietTimer);
                    clearTimeout(hardTimer);
                    resolve();
                  }
                };
                const bump = () => {
                  clearTimeout(quietTimer);
                  quietTimer = setTimeout(finish, quietWindow);
                };
                const observer = new MutationObserver(bump);
                observer.observe(document.body, {
                  childList: true,
                  subtree: true,
                });
                bump();
                hardTimer = setTimeout(finish, timeout);
              }),
            { quietWindow: 300, timeout: 5000 },
          );
        } catch (_) {
          /* execution context destroyed by a redirect-chain navigation — page already moved on */
        }
        await page.waitForTimeout(200);
      }
    } finally {
      page.off('framenavigated', onFrameNavigated);
    }
  }
  // Action: Click on element with data-attribute locator
  await page.waitForTimeout(300);

  {
    let navigationTriggered = false;
    const onFrameNavigated = (frame) => {
      if (frame === page.mainFrame()) navigationTriggered = true;
    };
    page.on('framenavigated', onFrameNavigated);
    // TODO(basic-auth): a click/input/hover that navigates can land on a Basic-auth-protected
    //   page (401 + WWW-Authenticate: Basic), just like the Navigate capability. Detect it here
    //   the same way (set context.isBasicAuthChallengeActive, surface BASIC_AUTH_REQUIRED) so the
    //   BaseAuthenticate recovery flow works for navigations triggered by an interaction too.
    try {
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
          await page.locator("[data-testid='submitButton']").click();

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

      if (navigationTriggered) {
        try {
          await page.waitForLoadState('load', { timeout: 60000 });
        } catch (_) {
          /* load may never fire (third-party scripts); proceed best-effort */
        }
        try {
          await page.evaluate(
            ({ quietWindow, timeout }) =>
              new Promise((resolve) => {
                let done = false;
                let quietTimer = null;
                let hardTimer = null;
                const finish = () => {
                  if (!done) {
                    done = true;
                    observer.disconnect();
                    clearTimeout(quietTimer);
                    clearTimeout(hardTimer);
                    resolve();
                  }
                };
                const bump = () => {
                  clearTimeout(quietTimer);
                  quietTimer = setTimeout(finish, quietWindow);
                };
                const observer = new MutationObserver(bump);
                observer.observe(document.body, {
                  childList: true,
                  subtree: true,
                });
                bump();
                hardTimer = setTimeout(finish, timeout);
              }),
            { quietWindow: 300, timeout: 5000 },
          );
        } catch (_) {
          /* execution context destroyed by a redirect-chain navigation — page already moved on */
        }
        await page.waitForTimeout(200);
      }
    } finally {
      page.off('framenavigated', onFrameNavigated);
    }
  }
  // Assertion: Пользователь перенаправлен в систему — URL содержит /tasks/home
  await expect(page).toHaveURL(new RegExp('\\/tasks\\/home'));
  // Assertion: Заголовок страницы подтверждает успешную авторизацию и переход на главную
  await expect(page).toHaveTitle(new RegExp('Главная'));
  // Assertion: Пользователь видит рабочий интерфейс — отображается приветствие с именем авторизованного пользователя
  await expect(
    page.locator("app-home-greeting .greeting:has-text('Anton Sergeev')"),
  ).toBeVisible();

  // Step 3: Перейти по ссылке /tasks/documents/TESTAI-1
  // Expected result: Страница TS-370 открывается и загружается без ошибок, доступна для просмотра
  // Action: Navigate to /tasks/documents/TESTAI-1
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
      await page.goto('/tasks/documents/TESTAI-1');

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
  // Assertion: Страница TESTAI-1 открылась — URL содержит путь к странице в пространстве TESTAI
  await expect(page).toHaveURL(
    new RegExp('\\/tasks\\/wiki\\/TESTAI\\/page\\/'),
  );
  // Assertion: Страница загрузилась без ошибок — основной заголовок 'Страница_1' отображается и доступен для просмотра
  await expect(page.locator("[data-testid='documentName']")).toBeVisible();

  // Step 4: Проверить отображение текста со стилями (жирный, курсив, списки, заголовки).
  // Expected result: Стили отображаются корректно.
  // Assertion: Заголовок 'Заголовок_1' отображается на странице — проверка наличия стилизованного заголовка
  await expect(
    page.locator(
      "[data-testid='documentReadonlyEditorField'] h2:has-text('Заголовок_1')",
    ),
  ).toBeVisible();
  // Assertion: Полужирный текст отображается корректно — элемент обёрнут в тег strong/b
  await expect(
    page.locator("strong:has-text('Полужирный текст')"),
  ).toBeVisible();
  // Assertion: Курсивный текст отображается корректно — элемент обёрнут в тег em/i
  await expect(page.locator("em:has-text('курсив')")).toBeVisible();
  // Assertion: Маркированный список отображается корректно — присутствует элемент ul с тремя пунктами
  await expect(
    page.locator(
      "[data-testid='documentReadonlyEditorField'] ul:has(li:has-text('Первый пункт')):has(li:has-text('Второй пункт')):has(li:has-text('Третий пункт'))",
    ),
  ).toBeVisible();

  // Test completed
});

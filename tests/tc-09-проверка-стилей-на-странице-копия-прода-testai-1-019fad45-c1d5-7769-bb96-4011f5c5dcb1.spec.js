const { test, expect } = require('@playwright/test');
const { fillInput } = require('../helpers/fillInput.js');
const { testit } = require('testit-adapter-playwright');
/**
 * @externalId 2066
 * @recipeId 019fad45-c1d5-7769-bb96-4011f5c5dcb1
 * @title TC-09. Проверка стилей на странице, копия прода (TESTAI-1)
 * @description &lt;p&gt;Исходный кейс TC-09 проекта «Pilot - TeamStorm» (globalId 365) без нормализации. Изменены только адрес стенда и ключ страницы: TS-370 → TESTAI-1. Формулировки, предусловие и ожидаемые результаты оставлены дословно — это рука A эксперимента.&lt;&#x2F;p&gt;
 */
test(
  'TC-09 Проверка стилей на странице копия прода TESTAI-1',
  { tag: ['@arm-a', '@src-365'] },
  async ({ page }) => {
    testit.workItemIds(['2066']);

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
    await expect(page.locator('app-home-greeting .greeting')).toContainText(
      'Anton Sergeev',
    );

    // Step 3: Перейти по ссылке http://158.160.242.90/tasks/documents/TESTAI-1
    // Expected result: Страница TESTAI-1 открывается и загружается без ошибок, доступна для просмотра
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
    // Assertion: Страница TESTAI-1 открылась — URL содержит путь к wiki-странице проекта TESTAI
    await expect(page).toHaveURL(
      new RegExp('\\/tasks\\/wiki\\/TESTAI\\/page\\/'),
    );
    // Assertion: Страница загрузилась корректно — заголовок вкладки содержит название системы
    await expect(page).toHaveTitle(new RegExp('TeamStorm'));
    // Assertion: Контент страницы TESTAI-1 отображается — заголовок 'Страница_1' виден, страница загружена без ошибок и доступна для просмотра
    await expect(page.locator("[data-testid='documentName']")).toBeVisible();

    // Step 4: Проверить отображение текста со стилями (жирный, курсив, списки, заголовки).
    // Expected result: Стили отображаются корректно.
    // Assertion: Заголовок 'Заголовок_1' отображается как элемент заголовка (h-тег), подтверждая корректность стиля заголовка
    await expect(
      page.locator(
        "[data-testid='documentReadonlyEditorField'] h2:has-text('Заголовок_1')",
      ),
    ).toBeVisible();
    // Assertion: Текст 'Полужирный текст' отображается в жирном начертании (обёрнут в тег strong/b)
    await expect(
      page.locator(
        "[data-testid='documentReadonlyEditorField'] strong:has-text('Полужирный текст')",
      ),
    ).toBeVisible();
    // Assertion: Текст 'курсив' отображается курсивом (обёрнут в тег em/i)
    await expect(
      page.locator(
        "[data-testid='documentReadonlyEditorField'] em:has-text('курсив')",
      ),
    ).toBeVisible();
    // Assertion: Маркированный список отображается корректно (элемент ul с элементами li)
    await expect(
      page.locator(
        "[data-testid='documentReadonlyEditorField'] ul:has-text('Первый пункт')",
      ),
    ).toBeVisible();

    // Test completed
  },
);

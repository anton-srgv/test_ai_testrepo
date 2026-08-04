const { test, expect } = require('@playwright/test');
const { fillInput } = require('../helpers/fillInput.js');
const { testit } = require('testit-adapter-playwright');
/**
 * @externalId 554
 * @recipeId 019ed4d0-5596-7411-813d-c238dbd47af0
 * @title Успешное отображение пустого раздела настройки проекта
 * @description Automatically generated test
 */
test(
  'Успешное отображение пустого раздела настройки проекта',
  { tag: ['@regression', '@smoke', '@to-automate'] },
  async ({ page }) => {
    testit.workItemIds(['554']);

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

    // Step 1: Нажать на иконку шестеренки
    // Expected result: Проверить элементы что они отображаются: Заголовок страницы: Project settings Подзаголовок: System under test URL Подазголовок: Environment Data Описание: Add reusable values to use in your tests Кнопка: Add
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
              "[data-testid='login-input-email']",
              process.env.login,
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
              "[data-testid='login-input-password']",
              process.env.password,
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
            await page.locator("[data-testid='login-button-submit']").click();

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
            await page
              .locator("[data-testid='sidebar-nav-item-settings']")
              .click();

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
    // Assertion: Заголовок страницы 'Project settings' (в UI — 'Настройки окружения') отображается
    await expect(
      page.locator(
        "[data-testid='environment-page-page'] > span:has-text('Настройки окружения')",
      ),
    ).toBeVisible();
    // Assertion: Подзаголовок 'System under test URL' (в UI — 'URL тестируемого приложения') отображается
    await expect(
      page.locator(
        "[data-testid='project-settings-container-sut-url'] > span:has-text('URL тестируемого приложения')",
      ),
    ).toBeVisible();
    // Assertion: Подзаголовок 'Environment Data' (в UI — 'Данные окружения') отображается
    await expect(
      page.locator(
        "[data-testid='env-data-container'] span:has-text('Данные окружения')",
      ),
    ).toBeVisible();
    // Assertion: Описание 'Add reusable values to use in your tests' (в UI — 'Добавьте данные и параметры...') отображается
    await expect(page.locator('#env-data-description')).toBeVisible();
    // Assertion: Кнопка 'Add' (в UI — 'Добавить') отображается на странице
    await expect(
      page.locator("[data-testid='env-data-button-add']"),
    ).toBeVisible();

    // Test completed
  },
);

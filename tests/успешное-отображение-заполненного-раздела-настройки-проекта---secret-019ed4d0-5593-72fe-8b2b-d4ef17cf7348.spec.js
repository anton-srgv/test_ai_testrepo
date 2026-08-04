const { test, expect } = require('@playwright/test');
const { fillInput } = require('../helpers/fillInput.js');
const { testit } = require('testit-adapter-playwright');
/**
 * @externalId 550
 * @recipeId 019ed4d0-5593-72fe-8b2b-d4ef17cf7348
 * @title Успешное отображение заполненного раздела настройки проекта - secret
 * @description Automatically generated test
 */
test(
  'Успешное отображение заполненного раздела настройки проекта - secret',
  { tag: ['@regression', '@smoke', '@to-automate'] },
  async ({ page }) => {
    testit.workItemIds(['550']);

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
    // Expected result: Проверить элементы что они отображаются: Заголовок страницы: Project settings Подзаголовок: System under test URL Подазголовок: Environment Data Описание: Add reusable values to use in your tests Кнопка: Add Блоки со всеми типами envData где secret=true(значения замаскирвоаны) [/api/v2/Attachments/019a399a-9bda-72dd-b6c4-fe650010a75c]
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
    // Assertion: Страница настроек окружения открыта по правильному URL
    await expect(page).toHaveURL(new RegExp('\\/settings\\/environment'));
    // Assertion: Заголовок страницы 'Project settings' (Настройки окружения) отображается
    await expect(
      page.locator(
        "[data-testid='environment-page-page'] > span:has-text('Настройки окружения')",
      ),
    ).toBeVisible();
    // Assertion: Подзаголовок 'System under test URL' (URL тестируемого приложения) отображается
    await expect(
      page.locator(
        "[data-testid='project-settings-container-sut-url'] span:has-text('URL тестируемого приложения')",
      ),
    ).toBeVisible();
    // Assertion: Подзаголовок 'Environment Data' (Данные окружения) отображается
    await expect(
      page.locator(
        "xpath=//*[@data-testid='env-data-container']//*[contains(text(),'Данные окружения')]",
      ),
    ).toBeVisible();
    // Assertion: Описание 'Add reusable values to use in your tests' (Добавьте данные и параметры...) отображается
    await expect(
      page.locator(
        "xpath=//span[contains(text(),'повторно использовать в тестах')]",
      ),
    ).toBeVisible();
    // Assertion: Кнопка 'Add' (Добавить) отображается
    await expect(
      page.locator("[data-testid='env-data-button-add']"),
    ).toBeVisible();
    // Assertion: Блок envData 'password' с secret=true отображается с меткой 'Секрет'
    await expect(
      page.locator(
        "[data-testid='env-data-container'] [data-testid='env-data-item-card-1']:has-text('Секрет')",
      ),
    ).toBeVisible();
    // Assertion: Значение в блоке 'password' замаскировано (отображается как точки/звёздочки)
    await expect(
      page.locator(
        "[data-testid='env-data-item-card-1'] span:has-text('••••••••')",
      ),
    ).toBeVisible();

    // Test completed
  },
);

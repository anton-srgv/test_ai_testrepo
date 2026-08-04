const { test, expect } = require('@playwright/test');
const { fillInput } = require('../helpers/fillInput.js');
const { testit } = require('testit-adapter-playwright');
/**
 * @externalId 171
 * @recipeId 019ed4c7-1d2d-774c-968f-4313ba1191e0
 * @title Успешная пагинация по тест-кейсам при импорте TestIT
 * @description Automatically generated test
 */
test(
  'Успешная пагинация по тест-кейсам при импорте TestIT',
  { tag: ['@regression', '@smoke', '@to-automate'] },
  async ({ page }) => {
    testit.workItemIds(['171']);

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

    // Step 1: Зайти в браузере на сайт приложения
    // Expected result: Сайт успешно открылся, Отображается: приветствие, форма авторизации
    // Assertion: Сайт успешно открылся — URL содержит /login
    await expect(page).toHaveURL(new RegExp('\\/login'));
    // Assertion: Отображается приветствие на странице авторизации
    await expect(page.locator("text='С возвращением'")).toBeVisible();
    // Assertion: Форма авторизации содержит поле Email
    await expect(page.locator("input[placeholder='Email']")).toBeVisible();
    // Assertion: Форма авторизации содержит поле Пароль
    await expect(page.locator("input[placeholder='Пароль']")).toBeVisible();
    // Assertion: Форма авторизации содержит кнопку входа
    await expect(page.locator("button:has-text('Войти')")).toBeVisible();

    // Step 2: Заполнить поле email значением %email

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

    // Step 3: Заполнить поле password значением %pass
    // Expected result: Значение в поле password маскировано; Есть возможность показать пароль ( глазик иконка)
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
    // Assertion: Значение в поле password маскировано (тип поля = password)
    await expect(
      page.locator("[data-testid='login-input-password']"),
    ).toHaveAttribute('type', 'password');

    // Step 4: Нажать кнопку “Log in“
    // Expected result: Пользователь авторизован; Отображается страница “Default Project”; Отображается слева панель в навигации, в которой: * В верхней части: * Кнопка: Иконка папки + Название проекта * В нижней части доступны кнопки: * TMS Connections * Members * аватар с первой буквой email + email пользователя;
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
    // Assertion: Пользователь авторизован — URL изменился на страницу приложения
    await expect(page).toHaveURL(new RegExp('\\/recipes'));
    // Assertion: Отображается страница 'Default Project' — заголовок виден
    await expect(
      page.locator(
        "[data-testid='sidebar-layout-container'] aside span:has-text('Default Project')",
      ),
    ).toBeVisible();
    // Assertion: В верхней части навигации есть кнопка с иконкой папки и названием проекта
    await expect(
      page.locator("[data-testid='sidebar-nav-item-tests']"),
    ).toBeVisible();
    // Assertion: В нижней части навигации отображается аватар с первой буквой email и email пользователя
    await expect(
      page.locator("[data-testid='sidebar-button-user']"),
    ).toBeVisible();

    // Step 5: На странице рецептов нажать: “Импортировать”
    // Expected result: Открылась страница: /import Заголовок: Импортировать из TestIT Кнопки: * «Сбросить» всегда видна, disabled при счетчике = 0; * «Импортировать» всегда видна, disabled при счетчике = 0; Сверху над секциями тест-кейсов есть дропдаун с выбором проекта: * Если проект в интеграции один – дропдаун скрыт, только название * Если проектов несколько – дропдаун, по умолчанию первый согласно порядку TMS API [/api/v2/Attachments/019e43fa-93c0-740e-b83c-292aaca7ab0b]
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
              .locator("[data-testid='recipes-import-button-import']")
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
    // Assertion: Открылась страница с URL /import
    await expect(page).toHaveURL(new RegExp('\\/import'));
    // Assertion: Заголовок страницы содержит 'Импортировать из TestIT'
    await expect(
      page.locator("h1:has-text('Импортировать из Test')"),
    ).toBeVisible();
    // Assertion: Кнопка 'Сбросить' всегда видна на странице
    await expect(
      page.locator("[data-testid='import-page-top-bar-button-reset']"),
    ).toBeVisible();
    // Assertion: Кнопка 'Сбросить' задизейблена при счётчике = 0
    await expect(
      page.locator("[data-testid='import-page-top-bar-button-reset']"),
    ).toBeDisabled();
    // Assertion: Кнопка 'Импортировать' всегда видна на странице
    await expect(
      page.locator("[data-testid='import-page-top-bar-button-import']"),
    ).toBeVisible();
    // Assertion: Кнопка 'Импортировать' задизейблена при счётчике = 0
    await expect(
      page.locator("[data-testid='import-page-top-bar-button-import']"),
    ).toBeDisabled();
    // Assertion: Сверху над секциями тест-кейсов есть дропдаун с выбором проекта
    await expect(
      page.locator("[data-testid='import-page-sidebar-dropdown']"),
    ).toBeVisible();

    // Step 6: Прокрутить тест-кейсы вниз
    // Expected result: Список тест кейсов актуализировался, lazy loading подгружает тест-кейсы; При прокруте контента шапка таблицы остается сверху;
    // Action: Scroll down in container with xpath locator
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
          const prevContainerScrollDimension = await page
            .locator(
              "//div[@class='flex min-h-0 flex-1 flex-col overflow-auto']",
            )
            .evaluate((el) => el.scrollHeight);
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
            const locator = page.locator(
              "//div[@class='flex min-h-0 flex-1 flex-col overflow-auto']",
            );
            const boundingBox = await locator.boundingBox();

            if (boundingBox) {
              const mouseX = boundingBox.x + boundingBox.width / 2;
              const mouseY = boundingBox.y + boundingBox.height / 2;
              await page.mouse.move(mouseX, mouseY);
              const scrollAmount = Math.round(boundingBox.height * 0.7);
              await page.mouse.wheel(0, scrollAmount);
            }

            await page.waitForTimeout(500);
            if (apiTriggered) {
              if (
                (await page
                  .locator(
                    "//div[@class='flex min-h-0 flex-1 flex-col overflow-auto']",
                  )
                  .evaluate((el) => el.scrollHeight)) ===
                prevContainerScrollDimension
              ) {
                await page
                  .locator(
                    "//div[@class='flex min-h-0 flex-1 flex-col overflow-auto']",
                  )
                  .evaluate(
                    (el, timeout) =>
                      new Promise((resolve) => {
                        let done = false;
                        const finish = () => {
                          if (!done) {
                            done = true;
                            observer.disconnect();
                            resolve();
                          }
                        };
                        const observer = new MutationObserver(finish);
                        observer.observe(el, {
                          childList: true,
                          subtree: true,
                        });
                        setTimeout(finish, timeout);
                      }),
                    3000,
                  );
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
    // Assertion: После прокрутки в таблице отображаются тест-кейсы — lazy loading подгрузил данные
    await expect(
      page.locator(
        "[data-testid='import-page-table-section'] table tbody tr:first-child",
      ),
    ).toBeVisible();
    // Assertion: При прокрутке контента шапка таблицы остаётся видимой сверху (sticky header)
    await expect(
      page.locator("[data-testid='import-page-table-section'] table thead"),
    ).toBeVisible();

    // Test completed
  },
);

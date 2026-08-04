const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { fillInput } = require('../helpers/fillInput.js');
const escapeForCss = function escapeForCss(value) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\A ')
    .replace(/\r/g, '\\D ')
    .replace(/\f/g, '\\C ');
};
const { testit } = require('testit-adapter-playwright');
/**
 * @externalId 1414
 * @recipeId 019e6d42-23f1-75c0-9a73-55635d4c89ee
 * @title Успешное удаление Env Data
 * @description Automatically generated test
 */
test(
  'Успешное удаление Env Data',
  { tag: ['@regression', '@smoke'] },
  async ({ page, request }) => {
    testit.workItemIds(['1414']);

    async function executeApiRequestAndExtract(request, requestData, extract) {
      const apiResponse = await request.fetch(requestData.url, {
        method: requestData.method,
        headers: requestData.headers,
        data: requestData.body,
      });

      const needsJsonBody = extract.some(
        (entry) =>
          entry.from.source === 'body' && entry.from.strategy === 'jsonPath',
      );
      const needsTextBody = extract.some(
        (entry) =>
          entry.from.source === 'body' && entry.from.strategy === 'whole',
      );
      const apiResponseBody = needsJsonBody
        ? await apiResponse.json()
        : needsTextBody
          ? (await apiResponse.text()).trim()
          : undefined;
      const extracted = {};

      for (const entry of extract) {
        if (entry.from.source === 'status') {
          extracted[entry.saveAs] = String(apiResponse.status());
          continue;
        }
        if (entry.from.strategy === 'whole') {
          extracted[entry.saveAs] = String(apiResponseBody);
          continue;
        }
        const value =
          entry.from.selector === '.'
            ? apiResponseBody
            : entry.from.selector
                .split('.')
                .reduce((obj, key) => obj[key], apiResponseBody);
        extracted[entry.saveAs] = String(value);
      }

      return extracted;
    }

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

    // Step 1: Авторизоваться в приложении
    // Expected result: URL страницы: {{TESTAI_HOST}}/recipes
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
    // Assertion: URL страницы содержит /recipes после успешной авторизации
    await expect(page).toHaveURL(new RegExp('\\/recipes'));

    // Step 2: получить access_token из респонса на запрос: https://{{TESTAI_HOST}}/api/call/auth.login?batch=1 , с телом: {"0":{"email": "{userEmail}","password": "{userPassword}"}

    // Action: Execute API request: Make a POST request to https://app.testai.software/api/call/auth.login?batch=1 with JSON body: {"0":{"email":"[[login]]","password":"[[password]]"}}. Content-Type should be application/json. From the response, save the access_token value as 'accessToken'. The response structure is likely nested, so look for the token in the response JSON (e.g., result.data.accessToken or similar path within the batch response format like [0].result.data.accessToken or result[0].data.accessToken).

    const { accessToken } = await executeApiRequestAndExtract(
      request,
      {
        url: '/api/call/auth.login?batch=1',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          0: { email: process.env.login, password: process.env.password },
        },
      },
      [
        {
          from: {
            source: 'body',
            strategy: 'jsonPath',
            selector: '0.result.data.accessToken',
          },
          saveAs: 'accessToken',
        },
      ],
    );

    // Step 3: Получить id организации из GET запроса (+ Bearer токен в заголовке): https://{{TESTAI_HOST}}/api/call/auth.me?batch=1&input={}

    // Action: Execute API request: Make a GET request to https://app.testai.software/api/call/auth.me?batch=1&input={} with an Authorization header set to 'Bearer [[accessToken]]'. From the response JSON, extract the organization ID (look for it in paths like [0].result.data.organizationId or result.data.organizationId or similar nested structure in the batch response format). Save the extracted organization ID value as 'organizationId'.

    const { organizationId } = await executeApiRequestAndExtract(
      request,
      {
        url: '/api/call/auth.me?batch=1&input={}',
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      },
      [
        {
          from: {
            source: 'body',
            strategy: 'jsonPath',
            selector: '0.result.data.data.membership.organizationId',
          },
          saveAs: 'organizationId',
        },
      ],
    );

    // Step 4: Получить projectId из запроса: https://{{TESTAI_HOST}}/api/call/project.list?batch=1&input={"0":{"organizationId":"{{organizationId}}"}}

    // Action: Execute API request: Make a GET request to https://app.testai.software/api/call/project.list?batch=1&input={"0":{"organizationId":"[[organizationId]]"}} with an Authorization header set to 'Bearer [[accessToken]]'. From the response JSON, extract the project ID (look for it in paths like [0].result.data[0].id or result.data[0].id or similar nested structure in the batch response format). Save the extracted project ID value as 'projectId'.

    const { projectId } = await executeApiRequestAndExtract(
      request,
      {
        url: `/api/call/project.list?batch=1&input={\"0\":{\"organizationId\":\"${organizationId}\"}}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      },
      [
        {
          from: {
            source: 'body',
            strategy: 'jsonPath',
            selector: '0.result.data.0.id',
          },
          saveAs: 'projectId',
        },
      ],
    );

    // Step 5: Создать env data by POST API: https://{{TESTAI_HOST}}/api/call/project.createEnvVariable?batch=1 body: {"0":{"projectId":"{{projectId}}","envVariable":{"key":"{{envName}}","value":"{{envValue}}","type":"{{envType}}","description":"{{optional value}}","isSecret":{{true|false}}}}}

    const envName = faker.helpers.fake(
      '{{string.alpha({"length":{"min":3,"max":6},"casing":"upper"})}}_{{string.alpha({"length":{"min":3,"max":6},"casing":"upper"})}}_{{string.alphanumeric({"length":6,"casing":"upper"})}}',
    );
    const envValue = faker.helpers.fake(
      '{{internet.password({"length":24,"memorable":false})}}_{{string.nanoid(6)}}',
    );
    // Action: Execute API request: Make a POST request to https://app.testai.software/api/call/project.createEnvVariable?batch=1 with an Authorization header set to 'Bearer [[accessToken]]' and Content-Type 'application/json'. The JSON body should be: {"0":{"projectId":"[[projectId]]","envVariable":{"key":"[[envName]]","value":"[[envValue]]","type":"string","description":"test env variable","isSecret":false}}}. Verify the response indicates success (look for a successful result in the batch response format).

    await executeApiRequestAndExtract(
      request,
      {
        url: '/api/call/project.createEnvVariable?batch=1',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: {
          0: {
            projectId: projectId,
            envVariable: {
              key: envName,
              type: 'other',
              value: envValue,
              isSecret: false,
              description: 'test env variable',
            },
          },
        },
      },
      [],
    );

    // Step 6: Обновить страницу

    // Action: Navigate to /recipes
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
        await page.goto('/recipes');

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

    // Step 7: Перейти в настройки проекта
    // Expected result: URL: /recipes?projectSettings=true
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

    // Step 8: Удалить ранее созданную енв дату
    // Expected result: Успешное удаление, в списке ранее созданная енв дата отсутсвует.
    // Action: Scroll down in container with css locator
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
            .locator('div.min-h-0')
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
            const locator = page.locator('div.min-h-0');
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
                  .locator('div.min-h-0')
                  .evaluate((el) => el.scrollHeight)) ===
                prevContainerScrollDimension
              ) {
                await page.locator('div.min-h-0').evaluate(
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
                      observer.observe(el, { childList: true, subtree: true });
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
    // Action: Click on element with css locator
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
              .locator(
                `[data-testid^='env-data-item-card']:has-text('${escapeForCss(envName)}') button[data-testid$='-more']`,
              )
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
    // Action: Click on element with css locator
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
            await page.locator('#env-data-heading').click();

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
              .locator("[data-testid='env-data-item-button-5-more']")
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
              .locator("[data-testid='env-data-item-dropdown-item-delete']")
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

    // Test completed
  },
);

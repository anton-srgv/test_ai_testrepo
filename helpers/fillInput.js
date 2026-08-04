async function fillInput(page, target, value) {
  if (value.length <= 50 && !/[\n\r]/.test(value)) {
    const locator = page.locator(target);
    await locator.fill('');
    await locator.pressSequentially(value, { delay: 20 });
  } else {
    await page.fill(target, value);
  }
}

module.exports = { fillInput };

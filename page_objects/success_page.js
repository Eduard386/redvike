// successPage.js
const { expect } = require('@playwright/test');

class SuccessPage {
  constructor(page) {
    this.page = page;
    this.successPageUrl = 'https://qa-task.redvike.rocks/success';
    this.firstLastNamesText = page.locator('li:has-text("Name:")');
    this.emailText = page.locator('li:has-text("Email:")');
    this.imageWIthAlt = page.locator('img[alt="Avatar"]');

  }

}

module.exports = { SuccessPage };

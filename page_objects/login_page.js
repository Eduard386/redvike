// loginPage.js
const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('input[name="first_name"]');
    this.lastNameInput = page.locator('input[name="last_name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.confirmPasswordInput = page.locator('input[name="confirm_password"]');
    this.avatarInput = page.locator('input[name="avatar"]')
    this.submitButton = page.locator('input[value="Submit"]');
    this.slider = page.locator('#slider-thumb');
    this.validation = page.locator('.container li')

  }

  async fillForm(firstName, lastName, email, password, confirmPassword) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async loadAvatar(imagePath) {
    await this.avatarInput.setInputFiles(imagePath);
}

  async moveSlider(targetSliderPosition) {
    await this.slider.scrollIntoViewIfNeeded();

    await expect(this.slider).toHaveText('Slide to Submit');

    const box = await this.slider.boundingBox();
    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;
    const endX = startX + targetSliderPosition;

    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.mouse.move(endX, startY);
    await this.page.mouse.up();
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectErrorMessage(errorMessage) {
    await expect(this.page.locator('.container li')).toHaveText(errorMessage);
  }
}

module.exports = { LoginPage };

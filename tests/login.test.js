const { test, expect } = require('@playwright/test');
const test_data = require('../test_data');
const { LoginPage } = require('../page_objects/login_page');
const { SuccessPage } = require('../page_objects/success_page');

const BASE_URL = 'https://qa-task.redvike.rocks/';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test('check login with moving slider to the center', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.fillForm(
        test_data.valid.first_name,
        test_data.valid.last_name,
        test_data.valid.email,
        test_data.valid.password,
        test_data.valid.password
    );

    await loginPage.loadAvatar('./avatars/avatar.jpeg')
    await loginPage.moveSlider(240);
    await loginPage.submit();

    await loginPage.expectErrorMessage('Please solve the captcha!')

});

test('check login without touching slider', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.fillForm(
        test_data.valid.first_name,
        test_data.valid.last_name,
        test_data.valid.email,
        test_data.valid.password,
        test_data.valid.password
    );

    await loginPage.loadAvatar('./avatars/avatar.jpeg')
    await loginPage.submit();

    await loginPage.expectErrorMessage('Please solve the captcha!')

});

test_data.avatars.forEach(avatar => {
    test(`successful login with ${avatar} avatars`, async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.fillForm(
            test_data.valid.first_name,
            test_data.valid.last_name,
            test_data.valid.email,
            test_data.valid.password,
            test_data.valid.password
        );

        await loginPage.loadAvatar(`./avatars/${avatar}`)
        await loginPage.moveSlider(480);
        await loginPage.submit();

        if (avatar === 'avatar_3mb.jpeg') {
            await loginPage.expectErrorMessage('File size must be less than 2 MB.')
        } else {
            const successPage = new SuccessPage(page);
            await expect(page).toHaveURL(successPage.successPageUrl);
            await expect(successPage.firstLastNamesText).toContainText(`${test_data.valid.first_name} ${test_data.valid.last_name}`);
            await expect(successPage.emailText).toContainText(`${test_data.valid.email}`);
            await expect(successPage.imageWIthAlt).toHaveCount(1);
            await expect(successPage.imageWIthAlt).toBeVisible();
        }
    });
});

test('check validation for inputs', async ({ page }) => {
    const loginPage = new LoginPage(page);
  
    await loginPage.fillForm('', '', '', '','');
    await loginPage.submit();
    const firstNameInputisActive = await page.evaluate(() => document.activeElement.name === 'first_name');
    expect(firstNameInputisActive).toBe(true);

    await loginPage.fillForm(test_data.valid.first_name, '', '', '', '');
    await loginPage.submit();
    const lastNameInputisActive = await page.evaluate(() => document.activeElement.name === 'last_name');
    expect(lastNameInputisActive).toBe(true);
    await loginPage.fillForm('', '', '', '','');

    await loginPage.fillForm(test_data.valid.first_name, test_data.valid.last_name, '', '', '');
    await loginPage.submit();
    let emailInputisActive = await page.evaluate(() => document.activeElement.name === 'email');
    expect(emailInputisActive).toBe(true);
    await loginPage.fillForm('', '', '', '','');

    for (const invalidEmail of test_data.invalid_emails) {
        await loginPage.fillForm(test_data.valid.first_name, test_data.valid.last_name, invalidEmail, '', '');
        await loginPage.submit();
        const emailInputIsActive = await page.evaluate(() => document.activeElement.name === 'email');
        expect(emailInputIsActive).toBe(true);
        await loginPage.fillForm('', '', '', '','');
    }

    await loginPage.fillForm(test_data.valid.first_name, test_data.valid.last_name, test_data.valid.email, test_data.valid.password, '');
    await loginPage.submit();
    const confirmPasswordInputIsActive = await page.evaluate(() => document.activeElement.name === 'confirm_password');
    expect(confirmPasswordInputIsActive).toBe(true);
    await loginPage.fillForm('', '', '', '','');

    await loginPage.fillForm(test_data.valid.first_name, test_data.valid.last_name, test_data.valid.email, test_data.valid.password, '1234567');
    await loginPage.moveSlider(480);
    await loginPage.submit();
    await loginPage.expectErrorMessage('Passwords do not match!')
    await loginPage.fillForm('', '', '', '','');

    await loginPage.fillForm(test_data.valid.first_name, test_data.valid.last_name, test_data.valid.email, '1234567', '1234567');
    await loginPage.moveSlider(480);
    await loginPage.submit();
    await loginPage.expectErrorMessage('Password must be at least 8 characters long!')

  });

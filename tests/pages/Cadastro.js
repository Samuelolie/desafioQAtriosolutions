import { expect } from '@playwright/test';

export class Cadastro {

    constructor(page) {
        this.page = page
    }

    async visitPage() {
        await this.page.goto('https://www.grocerycrud.com/v1.x/demo/bootstrap_theme');
    }

    async selectVersion(version) {
        await this.page.selectOption('#switch-version-select', version)
    }

    async submitForm(name, lastName, contactFirstName, phone, addressLine1, addressLine2, city, state, postalCode, country, employeer, creditLimit) {

        await this.page.click(`a[href='/v1.x/demo/bootstrap_theme_v5/add']`)

        await this.page.locator('#field-customerName').fill(name)

        await this.page.locator('#field-contactLastName').fill(lastName)

        await this.page.locator('#field-contactFirstName').fill(contactFirstName)

        await this.page.locator('#field-phone').fill(phone)

        await this.page.locator('#field-addressLine1').fill(addressLine1)

        await this.page.locator('#field-addressLine2').fill(addressLine2)

        await this.page.locator('#field-city').fill(city)

        await this.page.locator('#field-state').fill(state)

        await this.page.locator('#field-postalCode').fill(postalCode)

        await this.page.locator('#field-country').fill(country)

        await this.page.locator('a.chosen-single.chosen-default').click()

        await this.page.locator('ul.chosen-results li').getByText(employeer).click()

        await this.page.locator('#field-creditLimit').fill(creditLimit)

        await this.page.click('#form-button-save')
    }

    async searchElement() {
        await this.page.click('#cancel-button')

        await this.page.selectOption('.per_page', '100')

        await this.page.click('.next')
    }

    async searchUser(name, lastName, phone) {
        await this.page.getByPlaceholder('Search Name').fill(name)

        await this.page.getByPlaceholder('Search Last Name').fill(lastName)

        await this.page.getByPlaceholder('Search Phone').fill(phone)

        await this.page.getByPlaceholder('Search Phone').press('Enter')

        await this.page.waitForTimeout(6000)
    }

    async deleteUser() {
        await this.page.getByRole('button', { name: 'More' }).click()

        await this.page.getByRole('link', { name: 'Delete' }).click();

        await this.page.getByRole('button', { name: 'Delete' }).click();
    }
}
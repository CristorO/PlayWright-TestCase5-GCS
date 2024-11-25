import { expect, Locator, Page } from "@playwright/test";

export class ToDoHomePageLogIn {
    readonly url = "http://todo.ly/";
    readonly page: Page;
    readonly logo: Locator;
    readonly logInButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly logInModalButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator("#logo");
        this.logInButton = page.locator(".HPHeaderLogin");
        this.emailInput = page.locator("#ctl00_MainContent_LoginControl1_TextBoxEmail");
        this.passwordInput = page.locator("#ctl00_MainContent_LoginControl1_TextBoxPassword");
        this.rememberMeCheckbox = page.locator("#ctl00_MainContent_LoginControl1_CbRemember");
        this.logInModalButton = page.locator("#ctl00_MainContent_LoginControl1_ButtonLogin");
    }

    async clickOnLogIn() {
        await this.logInButton.click();
    }

    async fillUserData(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.rememberMeCheckbox.check();
    }

    async logIn() {
        await this.logInModalButton.click();
    }
}
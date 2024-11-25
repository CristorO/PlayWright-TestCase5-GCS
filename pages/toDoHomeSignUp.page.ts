import { expect, Locator, Page } from "@playwright/test";

export class ToDoHomePageSignUp {
    readonly url = "http://todo.ly/";
    readonly page: Page;
    readonly logo: Locator;
    readonly signUpFreeButton: Locator;
    readonly signUpDialog: Locator;
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly termsOfServiceCheckbox: Locator;
    readonly signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator("#logo");
        this.signUpFreeButton = page.locator(".HPHeaderSignup");
        this.signUpDialog = page.locator("div#SignUp");
        this.fullNameInput = page.locator("#ctl00_MainContent_SignupControl1_TextBoxFullName");
        this.emailInput = page.locator("#ctl00_MainContent_SignupControl1_TextBoxEmail");
        this.passwordInput = page.locator("#ctl00_MainContent_SignupControl1_TextBoxPassword");
        this.termsOfServiceCheckbox = page.locator("#ctl00_MainContent_SignupControl1_CheckBoxTerms");
        this.signUpButton = page.locator("#ctl00_MainContent_SignupControl1_ButtonSignup");
    }

    async clickOnSignUpFree() {
        await this.signUpFreeButton.click();
    }

    async llenarDatosNuevoUsuario(fullName: string, email: string, password: string) {
        await this.fullNameInput.fill(fullName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.termsOfServiceCheckbox.check();
    }

    async guardarNuevoUsuario() {
        await this.signUpButton.click();
    }
}
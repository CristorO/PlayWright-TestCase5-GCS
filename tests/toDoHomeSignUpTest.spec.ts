import {test, expect} from '@playwright/test';
import { ToDoHomePageSignUp } from '../pages/toDoHomeSignUp.page';

test.beforeEach(async ({page}) => {
    await page.goto("http://todo.ly/");
});

test('Registrar nuevo usuario', async ({page}) => {
    const homePage = new ToDoHomePageSignUp(page);
    await homePage.clickOnSignUpFree();
    await homePage.llenarDatosNuevoUsuario("John Doe", "jhondoe@fake.com", "123456");
    await homePage.guardarNuevoUsuario();
});
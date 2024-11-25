import { test, expect } from '@playwright/test';
import { ToDoHomePageLogIn } from '../pages/toDoHomeLogIn.page';
import { ToDoProjects } from '../pages/toDoProjects.page';
import { ToDoItemsOfProject } from '../pages/toDoItemsOfProject.page';

test.beforeEach( 'Log In', async ({ page }) => {
    await page.goto("http://todo.ly/");

    const homePage = new ToDoHomePageLogIn(page);
    await homePage.clickOnLogIn();
    await homePage.fillUserData("jhondoe@fake.com", "123456");
    await homePage.logIn();
});

// test('Log In', async ({ page }) => {
//     const homePage = new ToDoHomePageLogIn(page);
//     await homePage.clickOnLogIn();
//     await homePage.fillUserData("jhondoe@fake.com", "123456");
//     await homePage.logIn();
// });

// test('Add New Project and Change Icon', async ({ page }) => {
//     const projectName = `New Project ${Date.now()}`;
//     const projectsPage = new ToDoProjects(page);
//     await projectsPage.clickOnAddNewProject();
//     await projectsPage.fillNewProjectName(projectName);
//     await projectsPage.addProject();
//     await projectsPage.changeIcon(projectName);
// });

// test('Add New Item and Set Priority', async ({ page }) => {
//     const itemName = `New Item ${Date.now()}`;
//     const toDoItemsOfProject = new ToDoItemsOfProject(page);
//     await toDoItemsOfProject.addNewItem(itemName);
//     await toDoItemsOfProject.setPriority(itemName);
// });

test('Add New Project and Change Icon then Add New Item and Set Priority', async ({ page }) => {
    const projectName = `New Project ${Date.now()}`;
    const projectsPage = new ToDoProjects(page);
    await projectsPage.clickOnAddNewProject();
    await projectsPage.fillNewProjectName(projectName);
    await projectsPage.addProject();
    await projectsPage.changeIcon(projectName);

    const itemName = `New Item ${Date.now()}`;
    const toDoItemsOfProject = new ToDoItemsOfProject(page);
    await toDoItemsOfProject.addNewItem(itemName);
    await toDoItemsOfProject.setPriority(itemName);
});
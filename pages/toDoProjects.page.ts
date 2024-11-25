import { expect, Locator, Page } from "@playwright/test";

export class ToDoProjects {
    readonly url = "http://todo.ly/";
    readonly page: Page;
    readonly logo: Locator;
    readonly addNewProjectButton: Locator;
    readonly newProjectNameInput: Locator;
    readonly addProjectButton: Locator;
    project: Locator;
    projectOptionsButton: Locator;
    readonly projectIcon: Locator;

    constructor (page: Page) {
        this.page = page;
        this.logo = page.locator("#logo");
        this.addNewProjectButton = page.locator(".ProjItemContent").filter({ hasText: "Add New Project"});
        this.newProjectNameInput = page.locator("#NewProjNameInput");
        this.addProjectButton = page.locator("#NewProjNameButton");
        this.projectIcon = page.locator(".IconFrame[iconid='6']").nth(0);
    }

    async clickOnAddNewProject() {
        await this.addNewProjectButton.click();
    }

    async fillNewProjectName(projectName: string) {
        await this.newProjectNameInput.fill(projectName);
    }

    async addProject() {
        await this.addProjectButton.click();
    }

    async changeIcon(projectName: string) {
        // Localizar el proyecto en base al nombre
        this.project = this.page.locator(".ProjItemContent").filter({ hasText: projectName});
        await expect(this.project).toBeVisible();
        await this.project.hover();
        
        // Obtener el itemid del proyecto
        const itemId = await this.project.getAttribute("itemid");

        // Localizar el botón de opciones del proyecto
        this.projectOptionsButton = this.page.locator(`.ProjItemMenu[itemid="${itemId}"]`);
        await expect(this.projectOptionsButton).toBeVisible();
        await this.projectOptionsButton.click();
        
        // Cambiar el icono del proyecto
        await expect(this.projectIcon).toBeVisible();
        await this.projectIcon.click();
        await expect(this.projectIcon).toHaveAttribute("iconid", "6");

        // Validar que el icono del proyecto haya cambiado
        const iconStyle = await this.projectIcon.getAttribute("style");
        const expectedIconStyle = "background: url(Images/icons/favorite.png) no-repeat";
        expect(iconStyle).toContain(expectedIconStyle);

        await this.project.click();

        console.log(`El proyecto ${projectName} se ha creado correctamente y cambio el icono correctamente`);
    }
}
import { expect, Locator, Page } from "@playwright/test";

export class ToDoItemsOfProject {
    readonly url = "http://todo.ly/";
    readonly page: Page;
    readonly refreshButton: Locator;
    project: Locator;
    readonly newItemInput: Locator;
    readonly addNewItemButton: Locator;
    item: Locator;
    itemOptionsButton: Locator;
    readonly itemPriority: Locator;

    constructor (page: Page) {
        this.page = page;
        this.refreshButton = page.locator(".HeaderRefreshDiv");
        this.newItemInput = page.locator("#NewItemContentInput");
        this.addNewItemButton = page.locator("#NewItemAddButton");
        this.itemPriority = page.locator(".PrioFrame[iconid='1']").nth(0);
    }

    // async selectProject(projectName: string) {
    //     // Localizar el proyecto en base al nombre
    //     this.project = this.page.locator(".ProjItemContent").filter({ hasText: projectName});
    //     await expect(this.project).toBeVisible();
    //     await this.project.click();
    // }

    async addNewItem(itemName: string) {
        await this.newItemInput.fill(itemName);
        await this.addNewItemButton.click();
    }

    async setPriority(itemName: string) {
        // Localizar item en base al nombre
        this.item = this.page.locator(".ItemContentDiv").filter({ hasText: itemName });
        await expect(this.item).toBeVisible();
        await this.item.hover();

        // Obtener el itemid del item
        const itemId = await this.item.getAttribute("itemid");

        // Localizar el botón de opciones del item
        this.itemOptionsButton = this.page.locator(`.ItemMenu[itemid="${itemId}"]`);
        await expect(this.itemOptionsButton).toBeVisible();
        await this.itemOptionsButton.click();

        // Cambiar la prioridad del item
        await expect(this.itemPriority).toBeVisible();
        await this.itemPriority.click();
        await expect(this.itemPriority).toHaveAttribute("iconid", "1");
        // await this.refreshButton.click();

        // Validar que la prioridad del item haya cambiado
        await expect(this.item).toHaveAttribute("style", "color: rgb(255, 51, 0); font-weight: bold;");
        
        console.log(`El item ${itemName} se ha creado correctamente y cambio la prioridad correctamente`);
    }
}
const{expect} = require('@playwright/test')
const data= require("../data/data.json");

exports.InteractionSection = class InteractionSection{
    constructor(page){
        this.page=page
        this.interaction=page.locator("//h5[text()='Interactions']")
        this.drag=page.locator("//span[text()='Dragabble']")
        this.dragMeDraggable=page.locator("//div[@id='dragBox']")
        this.dropPage=page.locator("//span[text()='Droppable']")
        this.dragMe=page.locator("//div[@id='draggable']")
        this.drop=page.locator("(//div[@id='droppable']//p[text()='Drop here'])[1]")
        this.dropped=page.locator("//div[@id='droppable']//p[text()='Dropped!']")

    }

    async draggble(){
        await this.interaction.click();
        await this.drag.click();
        await this.dragMeDraggable.hover();
        await this.page.mouse.down();
    }

   async droppable(){
    await this.interaction.click();
    await this.dropPage.click();
    await this.dragMe.dragTo(this.drop);
    await this.page.waitForTimeout(data.timeout.smallTimeout); 
    await expect(this.dropped).toContainText(data.dropData.dropMessage);
   }
}
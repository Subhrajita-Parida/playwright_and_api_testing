const{expect} = require('@playwright/test')
const data= require("../data/data.json");

exports.Frame = class Frame{
    constructor(page){
        this.page=page
        this.alertWindowpath=page.locator("//h5[text()='Alerts, Frame & Windows']")
        this.frames=page.locator("//span[text()='Frames']")
        this.multiFrame =page.frameLocator("#frame1")
        this.frameHeading= this.multiFrame.locator("body")
        this.nestedFrame=page.locator("//span[text()='Nested Frames']")
        this.parentFrame = this.multiFrame.locator("body")
        this.multiChildFrame= this.multiFrame.frameLocator('iframe')
        this.childFrame =  this.multiChildFrame.locator('body')
    }

    async singleFrame(){
        await this.alertWindowpath.click();
        await this.frames.click();

        await expect(this.frameHeading).toBeVisible();

        const textContent= await this.frameHeading.textContent();
        console.log("Text in frame", textContent);
       }


       async multipleFrame(){
        await this.alertWindowpath.click();
        await this.nestedFrame.click();

        const parentContent = await this.parentFrame.textContent();
        expect(parentContent).toContain(data.frame.parentData);
        console.log("Parent ",parentContent);

        const childContent = await this.childFrame.textContent();
        expect(childContent).toContain(data.frame.childData);
        console.log("Child ",childContent);

       }
}
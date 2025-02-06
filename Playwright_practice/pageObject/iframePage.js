const {expect} = require('@playwright/test')
exports.IframePage= class IframePage{
    constructor(page){
        this.page=page;
        this.frame=page.frameLocator('#singleframe');
        this.singleFrame=this.frame.locator("(//input[@type='text'])[1]");
        this.navigateMultiFrame=page.locator("//a[@href='#Multiple']");

                // Nested Iframe
        this.multiFrames=page.frameLocator("//iframe[@src='MultipleFrames.html']");
        this.singleFrames=this.multiFrames.frameLocator("//iframe[@src='SingleFrame.html']");
        this.multiFrameInput=this.singleFrames.locator("//input[@type='text']");
    }

    async navigate(){
        await this.page.goto("https://demo.automationtesting.in/Frames.html");
    }

    async singleFramePage(singleFrameIframe){
        // This is working for 1st index but not for second index
        // await frame.locator("(//input[@type='text'])[2]").fill("Iframes Navigation");
        await this.singleFrame.fill(singleFrameIframe);
    }

    async multiFramePage(){
        await this.navigateMultiFrame.click();
        await this.multiFrameInput.fill("Single Iframe in a multiple Iframe");
    }
}
const{expect} = require('@playwright/test');

exports.Navigate= class Navigate
{
    constructor(page){
        this.page=page;
        this.input=page.locator("//a[text()='Inputs']");
        
    }

    async url(){
        this.page.goto("https://the-internet.herokuapp.com/");
    }

    async checkInput(){
          this.input.click();
        await expect(this.page.locator("//h3")).toBeVisible();
        await expect(this.page.locator("//input[@type='number']")).toBeEditable();
        await this.page.locator("//input[@type='number']").fill(12344);
    }
}
const{expect} = require('@playwright/test')
const data= require("../data/data.json");
const { timeout } = require('../playwright.config');

exports.AlertWindow = class AlertWindow{
constructor(page){
    this.page = page
    this.getConfirm=page.locator("//button[@id='confirmButton']");
    this.getPromptBox=page.locator("//button[@id='promtButton']");
    this.alertWindowpath=page.locator("//h5[text()='Alerts, Frame & Windows']")
    this.browseWindow=page.locator("//span[text()='Browser Windows']")
    this.newTabPage=page.locator("//button[text()='New Tab']")
    this.newWindowButton=page.locator("//button[@id='windowButton']")
    this.alertPage=page.locator("//span[text()='Alerts']")
    this.alertButton=page.locator("//button[@id='alertButton']")
    this.timeAlertButton=page.locator("//button[@id='timerAlertButton']")
}

async alertWindows() {
    await this.alertWindowpath.click();
    await this.browseWindow.click();

  const [newTab] = await Promise.all([
        this.page.context().waitForEvent('page'), 
        this.newTabPage.click(),
    ]);

    await newTab.waitForLoadState();

    const newTabTitle = await newTab.title();
    console.log("New Tab Title:", newTabTitle);
    
    expect(newTab).toHaveTitle(newTabTitle);
   //Switching the tabs
    await this.page.bringToFront(); 

    await newTab.bringToFront(); 

    const content = await newTab.locator("//body").textContent();
    console.log("New Tab Content:", content);

    await newTab.close();
   
}

async alertNewWindow(){
    await this.alertWindowpath.click();
    await this.browseWindow.click();

    const [newWindow] = await Promise.all([
        this.page.context().waitForEvent('page'),
        this.newWindowButton.click()
    ]);
    await newWindow.waitForLoadState();
    //Verifying the new window opened or  not
    await expect(newWindow).toHaveURL(data.alertNewWindow.url);

    await newWindow.setViewportSize({ width: 400, height: 700 });
    const viewport = await newWindow.viewportSize();
    console.log("Viewport Size:", viewport);
    expect(viewport).toEqual({ width: 400, height: 700 });
    await newWindow.close();

}

async simpleAlerts(){
     await this.alertWindowpath.click();
     await this.alertPage.click();
     await this.alertButton.click();

     const simpleAlert = await this.page.waitForEvent('dialog');
    //  this.page.waitForTimeout(data.timeout.mediumTimeout)

    //verify the alert message
     const simpleAlertMessage = simpleAlert.message();
     console.log("Alert Message:", simpleAlertMessage);
     expect(simpleAlertMessage).toBe(data.alertNewWindow.simpleAlertMessage);

    // Accept the alert 
      await simpleAlert.accept();
    
}

async timedAlert(){
     await this.alertWindowpath.click();
     await this.alertPage.click();
     await this.timeAlertButton.click();

     //Wait for 5 or more seconds
     const timeAlert = await this.page.waitForEvent('dialog')
     this.page.waitForTimeout(data.timeout.bigTimeout)


     //verify the message
     const timeAlertMessage=  timeAlert.message();
     console.log("Time alert message",timeAlertMessage);
     expect(timeAlertMessage).toBe(data.alertNewWindow.timedAlertMessage)

     //Dismis the alert
    await timeAlert.accept();
}

async confirmBox() {
    await this.alertWindowpath.click();
    await this.alertPage.click();
    this.page.on("dialog", async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.type()).toContain("confirm");
        expect(dialog.message()).toContain(data.alertNewWindow.confirmBoxMessage);
        await dialog.accept();
     
      });
     
      await this.getConfirm.click(); 
    //   await this.page.waitForEvent("dialog");
    
}

async promptBox(){
    await this.alertWindowpath.click();
    await this.alertPage.click();

    this.page.on("dialog", async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.type()).toContain("prompt");
        expect(dialog.message()).toContain(data.alertNewWindow.promptAlertMessage);
        await dialog.accept(data.alertNewWindow.promptBoxMessage);
     
      });
     
      await this.getPromptBox.click(); 
    //   await this.page.waitForEvent("dialog");
}

}
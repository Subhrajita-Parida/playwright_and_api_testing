const{expect} = require('@playwright/test')
const data= require("../data/data.json");
require('dotenv').config();

exports.ElementSection = class ElementSection{
    constructor(page){
        this.page=page;
        this.element=page.locator("//h5[text()='Elements']")
        this.fullName=page.getByPlaceholder('Full Name')
        this.mail=page.getByPlaceholder('name@example.com')
        this.adress=page.getByPlaceholder('Current Address');
        this.permanentAdress=page.locator("//textarea[@id='permanentAddress']");
        this.submit=page.locator("//button[@id='submit']");
        this.treeNode=page.locator("//button[@class='rct-option rct-option-expand-all']")
        this.yesRadio=page.locator("//label[@for='yesRadio']")
        this.impressiveRadio=page.locator("//label[@for='impressiveRadio']")
        this.textBoxPage=page.locator("//span[text()='Text Box']")
        this.checkBoxPage=page.locator("//span[text()='Check Box']")
        this.home=page.locator("//span[text()='Home']")
        this.collapse=page.locator("//button[@title='Collapse all']")
        this.homeCheckBox=page.locator("//span[@class='rct-checkbox']")
        this.desktop=page.locator("//span[text()='Desktop']")
        this.radioButtons=page.locator("//span[text()='Radio Button']")
        this.noRadio=page.locator("//label[@for='noRadio']")
        this.webTable=page.locator("//span[text()='Web Tables']");
        this.firstName=page.locator("//input[@id='firstName']")
        this.lastName=page.locator("//input[@id='lastName']")
        this.email=page.locator("//input[@id='userEmail']")
        this.age=page.locator("//input[@id='age']")
        this.salary=page.locator("//input[@id='salary']")
        this.department=page.locator("//input[@id='department']")
        this.addButton=page.locator("//button[@id='addNewRecordButton']")
        this.webTableSubmit=page.locator("//button[@id='submit']")
        this.edit=page.locator("(//span[@title='Edit'])[1]")
        this.updatedRecord = page.locator("//div[contains(text(), 'sophia')]")
        this.delete=page.locator("(//span[@title='Delete'])[2]");
        this.deletedRecord = page.locator("(//div[contains(@class, 'rt-tr')])[2]")
        this.search=page.locator("//input[@id='searchBox']")
        this.searchResult = page.locator("//div[contains(text(), 'sophia')]");
    }

    async navigate(){
        await this.page.goto(process.env.navigationUrl);
        await expect(this.page).toHaveURL(process.env.navigationUrl);
    }

    async textBox(name, email, currentAdress, padress){
        await this.element.click();
        await this.textBoxPage.click();
        await this.fullName.fill(name);
        await this.mail.fill(email);
        const emailvalue= await this.mail.inputValue();
        expect(emailvalue).toContain(".com")

        await  this.adress.fill(currentAdress);
        await this.adress.focus();
        await this.page.keyboard.down('Control'); 
        await this.page.keyboard.press('KeyA'); 
        await this.page.keyboard.press('KeyC'); 
        await this.page.keyboard.up('Control');

        await this.permanentAdress.click();
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('KeyV');
        await this.page.keyboard.up('Control');

        const pastedAddress = await this.permanentAdress.inputValue();
        expect(pastedAddress).toBe(currentAdress);
        await  this.adress.fill(data.validInputs.longAddress);

        await expect(this.adress).toHaveCSS('overflow', 'auto');
        await this.submit.click();
        }

     async checkBox(){
        await this.element.click();
        await this.checkBoxPage.click();

        //Clicking all the sub contents of home
        await this.treeNode.click();

        //Checked all the boxes
        await this.home.click();
       
        //Collapsing all the buttons
        await this.collapse.click();
    }

    async checkboxSelection(){
        await this.element.click();
        await this.checkBoxPage.click();
        //Intially checking the parent checkbox should be unchecked
        await expect(this.home).toBeChecked({checked:false})
        //Checked the Parent checkbox(Home)
        await this.home.click();

        //After clicking the checked box checking it's checked or not
        await expect(this.home).toBeChecked()

        await this.treeNode.click();
        const checkingElements=await this.homeCheckBox.elementHandles();
        return checkingElements;

    }

    async disSelectingCheckbox(){
        await this.element.click();
        await this.checkBoxPage.click();
        await this.treeNode.click();
        await this.home.click();
        await this.desktop.click();
        const expandingElement= await this.homeCheckBox.elementHandles();
        return expandingElement;
    }

     //Checking the elements are visible or not after expanding
     async checkboxVisible(){
        await this.element.click();
        await this.checkBoxPage.click();
        await this.treeNode.click();
        const expandNodes= await this.homeCheckBox.elementHandles();
        return await expandNodes;
    }

    async radioButton(){
        await this.element.click();
        await this.radioButtons.click();
        const title= await this.page.title();
        console.log(title);
        await expect(this.page).toHaveTitle(title);
        await this.yesRadio.click();
        await expect(this.yesRadio).toBeChecked();
        await expect(this.impressiveRadio).not.toBeChecked();

        await this.impressiveRadio.click();
        await expect(this.impressiveRadio).toBeChecked();
        await expect(this.yesRadio).not.toBeChecked();
        await expect(this.noRadio).toBeDisabled();
    }

    async webTables(name,surName,email,age,salary,department){
        await this.element.click();
        await this.webTable.click();
        await this.addButton.click();
       await this.firstName.fill(name)
       await this.lastName.fill(surName)
       await this.email.fill(email)
       await this.age.fill(age)
       await this.salary.fill(salary)
       await this.department.fill(department)
       await this.webTableSubmit.click();
        //Verify if the added element is there
        const newRecord = this.page.locator(`//div[contains(text(), '${name}')]`)  
       await expect(newRecord).toBeVisible();    

       //Editing 1st record
       await this.edit.click();
       await this.firstName.fill(data.elementSection.name);
       await this.webTableSubmit.click();
      
       //Verify if the updated element is there
       await expect(this.updatedRecord).toBeVisible();

       //Deleting second record
       await this.delete.click();
       
       // Verify the record is deleted
      await expect(this.deletedRecord).not.toContainText(surName);

       //Searching for records
       await this.search.fill(data.elementSection.name);
       await expect(this.searchResult).toBeVisible();
    }
}
const{expect} = require('@playwright/test')
const path = require('path'); 


exports.FormSection = class FormSection{
    constructor(page){
        this.page = page;
        this.form=page.locator("//h5[text()='Forms']")
        this.practiceForms=page.locator("//span[text()='Practice Form']")
        this.firstName=page.getByPlaceholder('First Name')
        this.surName=page.getByPlaceholder('Last Name')
        this.mail=page.getByPlaceholder('name@example.com')
        this.gender=page.locator("//label[@for='gender-radio-2']")
        this.mobile=page.getByPlaceholder('Mobile Number')
        this.dateOfBirth=page.locator("//input[@id='dateOfBirthInput']")
        this.datePicker=page.locator("//div[@class='react-datepicker']")
        this.month=page.locator("//select[@class='react-datepicker__month-select']")
        this.januaryMonth=page.locator("//select[@class='react-datepicker__month-select']")
        this.year=page.locator("//select[@class='react-datepicker__year-select']")
        this.yearOption=page.locator("//select[@class='react-datepicker__year-select']")
        this.date=page.locator("//div[@aria-label='Choose Sunday, January 7th, 2024']")
        this.subjectInput =page.locator("//input[@id='subjectsInput']")
        this.hobby=page.locator("//label[@for='hobbies-checkbox-3']")
        this.picture=page.locator("//input[@id='uploadPicture']")
        this.address=page.locator("//input[@id='uploadPicture']")
        this.submit=page.locator("//button[@id='submit']")
    }

    async practiceForm(name,lastName,email,phone,subject,currentAdress){
        await this.form.click();
        await this.practiceForms.click();
        await this.firstName.fill(name);
        await this.surName.fill(lastName);
        await this.mail.fill(email);
        await this.gender.click();
        await this.mobile.fill(phone);

       
         await this.dateOfBirth.click();
        // The date picker should be visible
         await expect(this.datePicker).toBeVisible(); 

        //Navigating to the month
         await this.month.selectOption('0'); 
         await expect(this.januaryMonth).toHaveValue('0'); 


        //Navigating to the year
         await this.year.selectOption('2024'); 
         await expect(this.yearOption).toHaveValue('2024');

        await this.date.click();

        //Selecting subject 
        await this.subjectInput.click();
        await this.subjectInput.type(subject); 
        await this.page.keyboard.press('Enter');

        await this.hobby.click();
        await this.picture.click();

        const imagePath = path.join(process.cwd(), 'assets', 'image', 'scenery.jpg'); // Adjust file name as needed

        // Upload the picture
        await this.picture.setInputFiles(imagePath);

        //We can use this below one also for uploading image
    //    const imagePath = process.cwd() + "//assets/image/scenery.jpg"
    //    await this.picture.setInputFiles(imagePath);

       
        //Current adress
        await this.address.type(currentAdress);

        //selecting state
       // const state= this.page.locator("//input[@id='react-select-3-input']").click();
        // await this.page.locator("//input[@id='react-select-3-input']").click(); // Click on state input to activate dropdown
   

      // Selecting city
       // await this.page.locator("//input[@id='react-select-4-input']").click(); 
       
        await this.submit.click();

    }
}
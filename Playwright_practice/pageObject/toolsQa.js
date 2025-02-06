const { expect } = require("@playwright/test");
const { log } = require("console");


exports.Navigation = class Navigation{
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
        this.firstName=page.locator("//input[@id='firstName']")
        this.lastName=page.locator("//input[@id='lastName']")
        this.email=page.locator("//input[@id='userEmail']")
        this.age=page.locator("//input[@id='age']")
        this.salary=page.locator("//input[@id='salary']")
        this.department=page.locator("//input[@id='department']")
        this.getConfirm=page.locator("//button[@id='confirmButton']");
        this.promptBox=page.locator("//button[@id='promtButton']");

    }

    async navigate(){
        await this.page.goto("https://demoqa.com/");
        await expect(this.page).toHaveURL("https://demoqa.com/");
    }

    async textBox(name, email, currentAdress, padress){
    await this.element.click();
    await this.page.locator("//span[text()='Text Box']").click();
    await this.fullName.fill(name);
    await this.mail.fill(email);
    const emailvalue= await this.mail.inputValue();
    expect(emailvalue).toContain(".com")
    await  this.adress.fill(currentAdress);
    await this.permanentAdress.fill(padress);
    await this.submit.click();
    }

    async checkBox(){
        await this.element.click();
        await this.page.locator("//span[text()='Check Box']").click();
        //To show the sub nodes of Home
        // await this.page.locator("//button[@title='Toggle']").click();

        //Clicking all the sub contents of home
          await this.treeNode.click();

        //Checked all the boxes
        await this.page.locator("//span[text()='Home']").click();
       
       //Collapsing all the buttons
       await this.page.locator("//button[@title='Collapse all']").click();
    }

    async checkboxSelection(){
        await this.element.click();
        await this.page.locator("//span[text()='Check Box']").click();
        //Intially checking the parent checkbox should be unchecked
        await expect(this.page.locator("//span[text()='Home']")).toBeChecked({checked:false})
        //Checked the Parent checkbox(Home)
        await this.page.locator("//span[text()='Home']").click();

        //After clicking the checked box checking it's checked or not
        await expect(this.page.locator("//span[text()='Home']")).toBeChecked()

        await this.treeNode.click();
        const checkingElements=await this.page.locator("//span[@class='rct-checkbox']").elementHandles();
        return checkingElements;

    }

    async disSelectingCheckbox(){
        await this.element.click();
        await this.page.locator("//span[text()='Check Box']").click();
        await this.treeNode.click();
        await this.page.locator("//span[text()='Home']").click();
        await this.page.locator("//span[text()='Desktop']").click();
        const expandingElement= await this.page.locator("//span[@class='rct-checkbox']").elementHandles();
        return expandingElement;
    }

    //Checking the elements are visible or not after expanding
    async checkboxVisible(){
        await this.element.click();
        await this.page.locator("//span[text()='Check Box']").click();
        await this.treeNode.click();
        const expandNodes= await this.page.locator("//span[@class='rct-checkbox']").elementHandles();
        return await expandNodes;
    }


    async radioButton(){
        await this.element.click();
        await this.page.locator("//span[text()='Radio Button']").click();
        const title= await this.page.title();
        console.log(title);
        await expect(this.page).toHaveTitle(title);
        await this.yesRadio.click();
        await expect(this.yesRadio).toBeChecked();
        await expect(this.impressiveRadio).not.toBeChecked();

        await this.impressiveRadio.click();
        await expect(this.impressiveRadio).toBeChecked();
        await expect(this.yesRadio).not.toBeChecked();
        await expect(this.page.locator("//label[@for='noRadio']")).toBeDisabled();
    }
    
    async webTables(name,surName,email,age,salary,department){
        await this.element.click();
        await this.page.locator("//span[text()='Web Tables']").click();
        await this.page.locator("//button[@id='addNewRecordButton']").click();
    //    const addFormTitle= await this.page.locator("//div[text()='Registration Form']")
    //    await expect(this.page).toHaveText(addFormTitle);
       await this.firstName.fill(name)
       await this.lastName.fill(surName)
       await this.email.fill(email)
       await this.age.fill(age)
       await this.salary.fill(salary)
       await this.department.fill(department)
       await this.page.locator("//button[@id='submit']").click();
        //Verify if the added element is there
       const newRecord = this.page.locator(`//div[contains(text(), '${name}')]`);
       await expect(newRecord).toBeVisible();    

       //Editing 1st record
       await this.page.locator("(//span[@title='Edit'])[1]").click();
       await this.firstName.fill("sophia");
       await this.page.locator("//button[@id='submit']").click();
      
       //Verify if the updated element is there
       const updatedRecord = this.page.locator("//div[contains(text(), 'sophia')]");
       await expect(updatedRecord).toBeVisible();

       //Deleting second record
       await this.page.locator("(//span[@title='Delete'])[2]").click();
       
       // Verify the record is deleted
      const deletedRecord = this.page.locator("(//div[contains(@class, 'rt-tr')])[2]");
      await expect(deletedRecord).not.toContainText(surName);

       //Searching for records
       await this.page.locator("//input[@id='searchBox']").fill("sophia");
       const searchResult = this.page.locator("//div[contains(text(), 'sophia')]");
       await expect(searchResult).toBeVisible();
    }

    async practiceForm(name,lastName,email,phone,subject,currentAdress){
        await this.page.locator("//h5[text()='Forms']").click();
        await this.page.locator("//span[text()='Practice Form']").click();
        await this.page.getByPlaceholder('First Name').fill(name);
        await this.page.getByPlaceholder('Last Name').fill(lastName);
        await this.page.getByPlaceholder('name@example.com').fill(email);
        await this.page.locator("//label[@for='gender-radio-2']").click();
        await this.page.getByPlaceholder('Mobile Number').fill(phone);

       
         await this.page.locator("//input[@id='dateOfBirthInput']").click();
        // The date picker should be visible
         await expect(this.page.locator("//div[@class='react-datepicker']")).toBeVisible(); 

        //Navigating to the month
         await this.page.locator("//select[@class='react-datepicker__month-select']").selectOption('0'); 
         await expect(this.page.locator("//select[@class='react-datepicker__month-select']")).toHaveValue('0'); 


        //Navigating to the year
         await this.page.locator("//select[@class='react-datepicker__year-select']").selectOption('2024'); 
         await expect(this.page.locator("//select[@class='react-datepicker__year-select']")).toHaveValue('2024');

        await this.page.locator("//div[@aria-label='Choose Sunday, January 7th, 2024']").click();

        //  const selectedDate = await this.page.locator("//input[@id='dateOfBirthInput']").inputValue();
        //  await expect(selectedDate).toBe("07 Jan 2024"); 

        //Selecting subject
        const subjectInput = this.page.locator("//input[@id='subjectsInput']"); 
        await subjectInput.click();
        await subjectInput.type(subject); 
        await this.page.keyboard.press('Enter');

        await this.page.locator("//label[@for='hobbies-checkbox-3']").click();
        await this.page.locator("//input[@id='uploadPicture']").click();

        //Current adress
        await this.page.locator("//textarea[@id='currentAddress']").type(currentAdress);

        //selecting state
       // const state= this.page.locator("//input[@id='react-select-3-input']").click();
        // await this.page.locator("//input[@id='react-select-3-input']").click(); // Click on state input to activate dropdown
   

      // Selecting city
       // await this.page.locator("//input[@id='react-select-4-input']").click(); 
       


        await this.page.locator("//button[@id='submit']").click();


    }

    async alertWindows() {
        await this.page.locator("//h5[text()='Alerts, Frame & Windows']").click();
        await this.page.locator("//span[text()='Browser Windows']").click();
    
      const [newTab] = await Promise.all([
            this.page.context().waitForEvent('page'), 
            this.page.locator("//button[text()='New Tab']").click(),
        ]);
    
        await newTab.waitForLoadState();
        //await newTab.waitForTimeout(500);

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
        await this.page.locator("//h5[text()='Alerts, Frame & Windows']").click();
        await this.page.locator("//span[text()='Browser Windows']").click();

        const [newWindow] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.locator("//button[@id='windowButton']").click()
        ]);

        await newWindow.waitForLoadState();

        //Verifying the new window opened or  not
        await expect(newWindow).toHaveURL("https://demoqa.com/sample");

        await newWindow.setViewportSize({ width: 400, height: 700 });
        const viewport = await newWindow.viewportSize();
        console.log("Viewport Size:", viewport);
        expect(viewport).toEqual({ width: 400, height: 700 });
    
        await newWindow.close();

    }

    async simpleAlerts(){
         await this.page.locator("//h5[text()='Alerts, Frame & Windows']").click();
         await this.page.locator("//span[text()='Alerts']").click();
         await this.page.locator("//button[@id='alertButton']").click();

         const simpleAlert = await this.page.waitForEvent('dialog', { timeout: 45000 });

        //verify the alert message
         const simpleAlertMessage = simpleAlert.message();
         console.log("Alert Message:", simpleAlertMessage);
         expect(simpleAlertMessage).toBe("You clicked a button");

        // Accept the alert 
          await simpleAlert.accept();
        
    }

    async timedAlert(){
         await this.page.locator("//h5[text()='Alerts, Frame & Windows']").click();
         await this.page.locator("//span[text()='Alerts']").click();
         await this.page.locator("//button[@id='timerAlertButton']").click();

         //Wait for 5 or more seconds
         const timeAlert = await this.page.waitForEvent('dialog',{timeout:6000})

         //verify the message
         const timeAlertMessage=  timeAlert.message();
         console.log("Time alert message",timeAlertMessage);
         expect(timeAlertMessage).toBe("This alert appeared after 5 seconds")

         //Dismis the alert
        await timeAlert.accept();
    }

    async confirmBox() {
        await this.page.locator("//h5[text()='Alerts, Frame & Windows']").click();
        await this.page.locator("//span[text()='Alerts']").click();

        
    }

    async widgetsAccordian(){
        await this.page.locator("//h5[text()='Widgets']").click();
        await this.page.locator("//span[text()='Accordian']").click();

         await this.page.locator("//div[@id='section1Heading']").click();
         await expect(this.page.locator("//p[contains(text(),'Lorem Ipsum is simply')]"))
        .toBeHidden({ timeout: 1000 });
         console.log("Expanding Section 2 ");

        // Multiple clicks to test 
         await this.page.locator("//div[@id='section1Heading']").click();
         await expect(this.page.locator("//p[contains(text(),'Lorem Ipsum is simply')]"))
        .toBeVisible({ timeout: 1000 });
         console.log("Section 1 re-expanded.");

         await this.page.locator("//div[@id='section1Heading']").click();
         await expect(this.page.locator("//p[contains(text(),'Lorem Ipsum is simply')]"))
        .toBeHidden({ timeout: 1000 });
          console.log("Section 1 re-collapsed.");

         // Section 2
         await this.page.locator("//div[@id='section2Heading']").click();
         await expect(this.page.locator("//p[contains(text(),'Contrary to popular belief')]"))
        .toBeVisible({ timeout: 1000 });
         console.log("Section 2 expanded.");

         await this.page.locator("//div[@id='section2Heading']").click();
         await expect(this.page.locator("//p[contains(text(),'Contrary to popular belief')]"))
        .toBeHidden({ timeout: 1000 });
         console.log("Section 2 collapsed.");

        await this.page.locator("//div[@id='section2Heading']").click();
        await expect(this.page.locator("//p[contains(text(),'Contrary to popular belief')]"))
        .toBeVisible({ timeout: 1000 });
         console.log("Section 2 re-expanded.");

        await this.page.locator("//div[@id='section2Heading']").click();
        await expect(this.page.locator("//p[contains(text(),'Contrary to popular belief')]"))
        .toBeHidden({ timeout: 1000 });
         console.log("Section 2 re-collapsed.");

         // Section 3
         await this.page.locator("//div[@id='section3Heading']").click();
         await expect(this.page.locator("//p[contains(text(),'It is a long established fact')]"))
        .toBeVisible({ timeout: 1000 });
         console.log("Section 3 expanded.");

        await this.page.locator("//div[@id='section3Heading']").click();
        await expect(this.page.locator("//p[contains(text(),'It is a long established fact')]"))
        .toBeHidden({ timeout: 1000 });
         console.log("Section 3 collapsed.");

        await this.page.locator("//div[@id='section3Heading']").click();
        await expect(this.page.locator("//p[contains(text(),'It is a long established fact')]"))
        .toBeVisible({ timeout: 1000 });
         console.log("Section 3 re-expanded.");

        await this.page.locator("//div[@id='section3Heading']").click();
        await expect(this.page.locator("//p[contains(text(),'It is a long established fact')]"))
        .toBeHidden({ timeout: 1000 });
        console.log("Section 3 re-collapsed.");


    }

    async autoComplete() {
        await this.page.locator("//h5[text()='Widgets']").click();
        await this.page.locator("//span[text()='Auto Complete']").click();
    
        const inputField = this.page.locator("//input[@id='autoCompleteSingleInput']");
        await inputField.click();
        await inputField.fill("Hi");  
    
        // Waiting for suggestion
        // const suggestion = this.page.locator("//div[contains(@class, 'auto-complete__option')]");
        // await suggestion.click();

        await inputField.click();
        await inputField.fill("Blu"); 
        //the input will not be removed here We need to fill second value
        // const SecondSuggestion = this.page.locator("//div[contains(@class, 'auto-complete__option')]");
        // await SecondSuggestion.click();

    
        }

        async multipleValue(){
            await this.page.locator("//h5[text()='Widgets']").click();
            await this.page.locator("//span[text()='Auto Complete']").click();
        
            const inputField = this.page.locator("//input[@id='autoCompleteMultipleInput']");
            await inputField.click();
            await inputField.fill("Hi");  
        
            // Waiting for suggestion
            //Incorrect XPath
            const suggestion = this.page.locator("//div[@class='auto-complete__value-container auto-complete__value-container--is-multi auto-complete__value-container--has-value css-1hwfws3']");
            await suggestion.click();
    
            //Filling the second value
            await inputField.fill("Blu"); 
            const SecondSuggestion = this.page.locator("//div[@class='auto-complete__value-container auto-complete__value-container--is-multi auto-complete__value-container--has-value css-1hwfws3']");
            await this.page.waitForTimeout(1000);
            await SecondSuggestion.click();
    
            // Clearing the  button
            const clearButton = this.page.locator("//div[@class='auto-complete__indicator auto-complete__clear-indicator css-tlfecz-indicatorContainer']");
            await this.page.waitForTimeout(1000);
            await clearButton.click();
        
        }

        async datePicker(){
            await this.page.locator("//h5[text()='Widgets']").click();
            await this.page.locator("//span[text()='Date Picker']").click();
            
            await this.page.locator("//input[@id='datePickerMonthYearInput']").click();

            //Navigating to the month
            await this.page.locator("//select[@class='react-datepicker__month-select']").selectOption('11'); 
            await expect(this.page.locator("//select[@class='react-datepicker__month-select']")).toHaveValue('11'); 


           //Navigating to the year
            await this.page.locator("//select[@class='react-datepicker__year-select']").selectOption('2001'); 
            await expect(this.page.locator("//select[@class='react-datepicker__year-select']")).toHaveValue('2001');

            await this.page.locator("//div[@aria-label='Choose Thursday, November 29th, 2001']").click();
           }



           async dateTimePicker() {
            await this.page.locator("//h5[text()='Widgets']").click();
            await this.page.locator("//span[text()='Date Picker']").click();
        
            const dateTimeInput= this.page.locator("//input[@id='dateAndTimePickerInput']");
            await dateTimeInput.click();
        
        
            const month = this.page.locator("//span[text()='November']");
            await month.waitFor({ state: 'visible' });
            await month.click();

            await this.page.locator("//div[@class='react-datepicker__month-option react-datepicker__month-option--selected_month']").click();

            const year = this.page.locator("//span[text()='2024']");
            await year.waitFor({ state: 'visible' });
            await year.click();

            await this.page.locator("//div[@class='react-datepicker__year-option react-datepicker__year-option--selected_year']").click();
        
            await this.page.locator("//div[@aria-label='Choose Friday, November 1st, 2024']").click();
        
            await this.page.locator("//li[text()='20:30']").click();
        
            // Verifying the DateTime
            const selectedDateTime = await dateTimeInput.inputValue();
            console.log("Selected Date and Time:", selectedDateTime);
        
            expect(selectedDateTime).toMatch(/November 1, 2024 8:30 PM/);
        
           
        }
        
        async draggble(){
            await this.page.locator("//h5[text()='Interactions']").click();
            await this.page.locator("//span[text()='Dragabble']").click();
           
           const dragMe= this.page.locator("//div[@id='dragBox']")
           await dragMe.hover();
           await this.page.mouse.down();
        }

       async droppable(){
        await this.page.locator("//h5[text()='Interactions']").click();
        await this.page.locator("//span[text()='Droppable']").click();
        const dragMe= this.page.locator("//div[@id='draggable']")
        const drop= this.page.locator("(//div[@id='droppable']//p[text()='Drop here'])[1]")

        await dragMe.dragTo(drop);
        await this.page.waitForTimeout(700); 
        const dropped= this.page.locator("//div[@id='droppable']//p[text()='Dropped!']")
        await expect(dropped).toContainText("Dropped");
       
       }

       async singleFrame(){
        await this.page.locator("//h5[text()='Alerts, Frame & Windows']").click();
        await this.page.locator("//span[text()='Frames']").click();

        const singleFrame = this.page.frameLocator("#frame1")

        const frameHeading= singleFrame.locator("body")
        await expect(frameHeading).toBeVisible();

        const textContent= await frameHeading.textContent();
        console.log("Text in frame", textContent);
       }


       async multiFrame(){
        await this.page.locator("//h5[text()='Alerts, Frame & Windows']").click();
        await this.page.locator("//span[text()='Nested Frames']").click();

        const multiFrame = this.page.frameLocator("#frame1")
        const parentFrame = await multiFrame.locator("body").textContent();
        expect(parentFrame).toContain("Parent frame");
        console.log("Parent ",parentFrame);

        const multiChildFrame= multiFrame.frameLocator('iframe')
        const childFrame = await multiChildFrame.locator('body').textContent();
        expect(childFrame).toContain("Child Iframe");
        console.log("Child ",childFrame);


       }


        // async draggble() {
        //     await this.page.locator("//h5[text()='Interactions']").click();
        //     await this.page.locator("//span[text()='Dragabble']").click();
        
        //     const dragMe = this.page.locator("//div[@id='dragBox']");
        //     const initialBox = await dragMe.boundingBox();
        
        //     if (initialBox) {
        //         const { x, y } = initialBox;
        
        //         await this.page.mouse.move(x + 10, y + 10); 
        //         await this.page.waitForTimeout(2000);
        //         await this.page.mouse.down();
        //         await this.page.waitForTimeout(2000);
        
        //         await this.page.mouse.move(x + 100, y + 100); 
        //         await this.page.waitForTimeout(2000);

        //         await this.page.mouse.up();
        //         await this.page.waitForTimeout(2000);  
        //     }
        // }
        
        
        

        
        
    
    
    

}


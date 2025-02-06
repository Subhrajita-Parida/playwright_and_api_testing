const{expect} = require('@playwright/test')
const data= require("../data/data.json");

exports.WidgetSection = class WidgetSection{
    constructor(page){
        this.page=page
        this.widgetpage=page.locator("//h5[text()='Widgets']")
        this.accordian=page.locator("//span[text()='Accordian']")
        this.firstHeading=page.locator("//div[@id='section1Heading']")
        this.firstConetent=page.locator("//p[contains(text(),'Lorem Ipsum is simply')]")
        this.secondHeading=page.locator("//div[@id='section2Heading']")
        this.secondContent=page.locator("//p[contains(text(),'Contrary to popular belief')]")
        this.thirdHeading=page.locator("//div[@id='section3Heading']")
        this.thirdContent=page.locator("//p[contains(text(),'It is a long established fact that a reader ')]")
        this.autoCompletepage=page.locator("//span[text()='Auto Complete']")
        this.inputField =page.locator("//input[@id='autoCompleteSingleInput']");
        this.multipleInputField =page.locator("//input[@id='autoCompleteMultipleInput']");
        this.clearButton =page.locator("//div[@class='auto-complete__indicator auto-complete__clear-indicator css-tlfecz-indicatorContainer']");
        this.datePickerPage=page.locator("//span[text()='Date Picker']")
        this.monthYearInput=page.locator("//input[@id='datePickerMonthYearInput']")
        this.month=page.locator("//select[@class='react-datepicker__month-select']")
        this.year=page.locator("//select[@class='react-datepicker__year-select']")
        this.date=page.locator("//div[@aria-label='Choose Thursday, November 29th, 2001']")
        this.dateTimeInput=page.locator("//input[@id='dateAndTimePickerInput']");
        this.dateTimemonth =page.locator("//span[text()='November']");
        this.monthOption=page.locator("//div[@class='react-datepicker__month-option react-datepicker__month-option--selected_month']")
        this.dateTimeYear=page.locator("//span[text()='2024']");
        this.yearOption=page.locator("//div[@class='react-datepicker__year-option react-datepicker__year-option--selected_year']")
        this.exactDate=page.locator("//div[@aria-label='Choose Friday, November 1st, 2024']")
        this.exactTime=page.locator("//li[text()='20:30']")
    }

    async widgetsAccordian(){
        await this.widgetpage.click();
        await this.accordian.click();

         await this.firstHeading.click();
         await expect(this.firstConetent).toBeHidden();
         await this.page.waitForTimeout(data.timeout.normalTimeout)
         console.log("Expanding Section 2 ");

        // Multiple clicks to test 
         await this.firstHeading.click();
         await expect(this.firstConetent).toBeVisible();
         await this.page.waitForTimeout(data.timeout.normalTimeout)
         console.log("Section 1 re-expanded.");

         await this.firstHeading.click();
         await expect(this.firstConetent) .toBeHidden();
         await this.page.waitForTimeout(data.timeout.normalTimeout)
          console.log("Section 1 re-collapsed.");

         // Section 2
         await this.secondHeading.click();
         await expect(this.secondContent).toBeVisible();
         await this.page.waitForTimeout(data.timeout.normalTimeout)
         console.log("Section 2 expanded.");

         await this.secondHeading.click();
         await expect(this.secondContent).toBeHidden();
         await this.page.waitForTimeout(data.timeout.normalTimeout)
         console.log("Section 2 collapsed.");

         await this.secondHeading.click();
        await expect(this.secondContent).toBeVisible();
        await this.page.waitForTimeout(data.timeout.normalTimeout)
         console.log("Section 2 re-expanded.");

         await this.secondHeading.click();
         await expect(this.secondContent).toBeHidden();
         await this.page.waitForTimeout(data.timeout.normalTimeout)
         console.log("Section 2 re-collapsed.");

         // Section 3
         await this.thirdHeading.click();
         await expect(this.thirdContent).toBeVisible();
         await this.page.waitForTimeout(data.timeout.normalTimeout)
         console.log("Section 3 expanded.");

         await this.thirdHeading.click();
         await expect(this.thirdContent).toBeHidden();
         await this.page.waitForTimeout(data.timeout.normalTimeout)
         console.log("Section 3 collapsed.");

         await this.thirdHeading.click();
         await expect(this.thirdContent).toBeVisible();
         await this.page.waitForTimeout(data.timeout.normalTimeout)
         console.log("Section 3 re-expanded.");

         await this.thirdHeading.click();
         await expect(this.thirdContent).toBeHidden();
         await this.page.waitForTimeout(data.timeout.normalTimeout)
        console.log("Section 3 re-collapsed.");


    }

    async autoComplete() {
        await this.widgetpage.click();
        await this.autoCompletepage.click();
    
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
            await this.widgetpage.click();
            await this.autoCompletepage.click();
        
            await multipleInputField.click();
            await multipleInputField.fill("Hi");  
        
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
            await this.page.waitForTimeout(1000);
            await clearButton.click();
        
        }

        async datePicker(){
            await this.widgetpage.click();
            await this.datePickerPage.click();
            
            await this.monthYearInput.click();

            //Navigating to the month
            await this.month.selectOption('11'); 
            await expect(this.month).toHaveValue('11'); 


           //Navigating to the year
            await this.year.selectOption('2001'); 
            await expect(this.year).toHaveValue('2001');

            await this.date.click();
           }



           async dateTimePicker() {
            await this.widgetpage.click();
            await this.datePickerPage.click();
        
            await this.dateTimeInput.click();
        
            await this.dateTimemonth.waitFor({ state: 'visible' });
            await this.dateTimemonth.click();

            await this.monthOption.click();

            await this.dateTimeYear.waitFor({ state: 'visible' });
            await this.dateTimeYear.click();

            await this.yearOption.click();
        
            await this.exactDate.click();
        
            await this.exactTime.click();
        
            // Verifying the DateTime
            const selectedDateTime = await this.dateTimeInput.inputValue();
            console.log("Selected Date and Time:", selectedDateTime);
        
            expect(selectedDateTime).toMatch(/November 1, 2024 8:30 PM/);
        
           
        }
}
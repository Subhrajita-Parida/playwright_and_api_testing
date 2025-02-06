const{test,beforeEach} = require('@playwright/test')
const index = require("../utils/index")
const data= require("../data/data.json");

let elementSelection;
let formSection;
let alerWindow;
let frame;
let widgetSection;
let interactionSection;

beforeEach(async({page})=>{
     elementSelection = new index.ElementSection(page)
     formSection = new index.FormSection(page)
     alerWindow = new index.AlertWindow(page)
     frame = new index.Frame(page)
     widgetSection= new index.WidgetSection(page)
     interactionSection = new index.InteractionSection(page)
     await elementSelection.navigate();
})

test("Valid Inputs", async()=>{
   
    await elementSelection.textBox(data.validInputs.name,data.validInputs.email,data.validInputs.adress,data.validInputs.permanentAdress);
})

test("Invalid Inputs", async()=>{
    await elementSelection.textBox(data.invalidInputs.fullName,data.invalidInputs.mail,data.invalidInputs.current,data.invalidInputs.present)
})
test("Checking Check Box", async()=>{
    await elementSelection.checkBox();
})

test("Visible Elements",async()=>{
    const visibleElement = await elementSelection.checkboxVisible();
    let count=0;
    for(const element of visibleElement){
         const visible= await element.isVisible();
         count++;
         console.log("Visible elements",visible)
    }
    console.log(count);
})

test("Checking the elements are checked or not", async()=>{
    const checkElement= await elementSelection.checkboxSelection();
    let count=0;
    for(const element of checkElement){
        const checked= await element.isChecked();
        if(checked==true){
            count++;
        }
    }
    console.log(count);
})
    test("Checking the partial elements", async()=>{
    const checkPartialSeelection= await elementSelection.disSelectingCheckbox();
    let counting=0;
    for(const partialElement of checkPartialSeelection){
        const partialCheckedElement= await partialElement.isChecked();
        if(partialCheckedElement==true){
            counting++;
        }
    }
    console.log(counting);
})

test("Checking the Radio button", async()=>{
    await elementSelection.radioButton();
})

test("Web-Tables validation", async()=>{
    await elementSelection.webTables(data.webTables.name,data.webTables.lastName,data.webTables.email,data.webTables.age,data.webTables.salary,data.webTables.department);
})

test("Practice forms", async()=>{
    await formSection.practiceForm(data.webTables.name,data.webTables.lastName,data.webTables.email,"98765434567","Chemistry",data.validInputs.adress)
})

test.only("Alert Windows and browsers", async()=>{
    await alerWindow.alertWindows();
})

test("New Window Alerts", async()=>{
    await alerWindow.alertNewWindow();
})

test("Simple Alert Message", async()=>{
    await alerWindow.simpleAlerts();
})

test("Time alert message", async()=>{
     await alerWindow.timedAlert();
})

test("Confirm Alert",async()=>{
//    await alerWindow.confirmBox();
   await alerWindow.promptBox();

})

test("Widgets Accordian", async()=>{
    await widgetSection.widgetsAccordian()
})

test("Widgets Auto complete",async()=>{
    //For singleValue auto complete
    // await widgetSection.autoComplete();

    //For mutiple value auto complete
    await widgetSection.multipleValue();
})

test("Date Picker", async()=>{
    //For date picker
    // await widgetSection.datePicker();

    //For DateTime picker
    await widgetSection.dateTimePicker();
})

test("Draggable Interactions", async()=>{
    await interactionSection.draggble();
})

test("Droppable Interactions", async()=>{
    await interactionSection.droppable();
})

test("Frames", async()=>{
    await frame.singleFrame();
    // await frame.multipleFrame();
})




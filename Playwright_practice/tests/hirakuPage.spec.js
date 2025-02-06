const{test} = require('@playwright/test')
const{Navigate} = require('../pageObject/hirakuPage');


test.describe.configure({ mode: 'parallel' });

test.beforeAll(async()=>{
    const navigate = new Navigate(dialog);
    await navigate.url();
    
})
// test("Checking the Input field", async({page})=>{
   
//    await navigate.checkInput();
// })

test("Checking the alerts",async({alerts})=>{
    alerts.on('Alerts Handling', await `${alerts.message}`);
    await alerts.accept();
   
    
})
const{test, expect} = require('@playwright/test');
const { SignUpPage } = require('../pageObject/swagLabs');

test("Navigating to Swag Lab Page", async({page})=>{
    const signUpPage = new SignUpPage(page);
    await signUpPage.navigate();
    await signUpPage.signUp("standard_user","secret_sauce");
})
import { LoginPage } from '../pageObject/swagLabPage';

const {test,expect}= require('@playwright/test');
require('dotenv').config();

test("Logingin to the Page",async({page})=>{
const loginPage=new LoginPage(page);
await loginPage.navigate();
await loginPage.loginFunctionality("standard_user","secret_sauce" );

// Checking if the page has any Title or not
await expect(page).toHaveTitle("Swag Labs");

await loginPage.cartPage();
loginPage.checkoutCart('process.env.firstName','process.env.lastName','process.env.zipcode');


})
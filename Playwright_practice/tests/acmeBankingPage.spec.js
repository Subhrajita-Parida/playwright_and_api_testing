const {test,expect} = require('@playwright/test');
const { AcmeLoginPage } = require('../pageObject/AcmeBankingPage');
test('ACME sign in Navigation', async({page})=>{
     const logInAcme=new AcmeLoginPage(page);
     logInAcme.navigate();
     logInAcme.acmeBankingLogin("Subhrajita","password");
})
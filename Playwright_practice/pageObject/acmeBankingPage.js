const{expect} = require('@playwright/test');
const exp = require('constants');

exports.AcmeLoginPage= class AcmeLoginPage{
    constructor(page){
        this.page=page;
        this.userName=this.page.locator('#username')
        this.password=this.page.locator('#password')
        this.signIn=this.page.locator('#log-in')
        this.rememberMe=this.page.locator("//label[text()='Remember Me']//input");
    }

    async navigate(){
        await this.page.goto("https://demo.applitools.com/");
    }

    async acmeBankingLogin(name,password){
        await expect(this.rememberMe).toBeChecked({checked:false});
         await this.userName.fill(name);
         await this.password.fill(password);
         await this.rememberMe.click();
         await expect(this.rememberMe).toBeChecked();
         await this.signIn.click();
        //  toBeChecked() is not working here
         
    }
}
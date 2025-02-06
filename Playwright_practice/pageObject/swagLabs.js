const{expect} = require('@playwright/test');

exports.SignUpPage = class SignUpPage{
constructor(page){
    this.page=page;
    this.name=page.getByPlaceholder('Username');
    this.password=page.getByPlaceholder('Password');
    // We can't use the input for role(we can use button, checkbox, heading etc)
    // this.button=page.getByRole('input', {name:'login-button'});
    // this.button=page.locator("//input[@name='login-button']");
}

async navigate(){
    this.page.goto("https://www.saucedemo.com/");
} 

async signUp(userName, password){
   await expect(this.page).toHaveTitle('Swag Labs');
   await this.name.fill(userName);
   await this.password.fill(password);
   await this.button.click();
}
}
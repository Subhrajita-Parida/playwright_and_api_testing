const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator("#user-name");
        this.password = page.locator('#password');
        this.submit = page.locator('#login-button');
        this.firstName = page.locator("//input[@id='first-name']");
        this.lastName = page.locator("//input[@id='last-name']");
        this.zipcode = page.locator("//input[@id='postal-code']");
        this.continue = page.locator("//input[@type='submit']");
        this.checkOut = page.locator("//a[text()='CHECKOUT']");
        this.addToCart = page.locator("//div[text()='Sauce Labs Backpack']//ancestor::div[@class='inventory_item']//child::button");
        this.cart = page.locator("//div[@id='shopping_cart_container']");
    }

    async navigate() {
        await this.page.goto("https://www.saucedemo.com/v1/");
    }

    async loginFunctionality(name, password) {
        await this.userName.fill(name);
        await this.password.fill(password);
        await this.submit.click();
    }

    async cartPage() {
        // Ensure the cart is visible before accessing its text content
        await expect(this.cart).toBeVisible();
    
        const count1Text = await this.cart.textContent(); 
        const count1 = parseInt(count1Text) || 0; // converting it to integer
    
        await this.addToCart.click(); 
    
        // Ensure the cart is visible again after adding the item
        await expect(this.cart).toBeVisible();
    
        const count2Text = await this.cart.textContent(); 
        const count2 = parseInt(count2Text) || 0;
    
        // Checking if previous value and new value in cart are not the same
        await expect(count1).not.toEqual(count2);
    
        await this.cart.click();
        const cartText = await this.page.locator("//div[@class='subheader']");
    
        // Checking whether the nav bar contains the expected text
        await expect(cartText).toContainText('Your Cart');
        await this.checkOut.click();
    }
    

    async checkoutCart(yourName, surName, postalCode) {
        await this.firstName.fill(yourName);
        await this.lastName.fill(surName); 
        await this.zipcode.fill(postalCode);
        await this.continue.click();
        
    }
}

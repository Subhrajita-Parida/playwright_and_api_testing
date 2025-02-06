const {test,expect}=require('@playwright/test');
test.describe.configure({ mode: 'parallel' });
test("login",async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page).toHaveTitle("OrangeHRM");
    await page.locator("//input[@name='username']").fill("Admin");
    await page.locator("//input[@name='password']").fill("admin123");
    await page.locator("//button[@type='submit']").click();
    await page.waitForTimeout(1000);

    await page.locator("//input[@name='username']").fill("-");
    await page.locator("//input[@name='password']").fill("-");
    await page.locator("//button[@type='submit']").click();


})


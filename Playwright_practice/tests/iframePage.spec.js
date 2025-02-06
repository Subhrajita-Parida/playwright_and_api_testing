import { IframePage } from '../pageObject/iframePage';
const {test,expect} =require('@playwright/test');

require('dotenv').config();

test("iframe Navigation", async({page})=>{
    const iframePage= new IframePage(page);
   await iframePage.navigate();
   await  iframePage.singleFramePage(process.env.singleFrameIframe);
   await iframePage.multiFramePage();
   
})
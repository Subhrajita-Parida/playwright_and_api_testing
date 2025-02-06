const { test, expect, request } = require('@playwright/test');

let apiContext;

test.describe('Book Store API with Authorization', () => {
  const authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkRpc2hhIiwicGFzc3dvcmQiOiJkaXNoYUAxMjNWYXJzaGEiLCJpYXQiOjE3MzcxMDU3MDN9.O1vqCgp38mWZMB2ZqgP06A3dJ8x-tSoxKowY5TIi_CE';

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://demoqa.com',
      extraHTTPHeaders: {
        Authorization: `Bearer ${authToken}`, 
        'Content-Type': 'application/json',
      },
    });
  });

  test('GET Request - Fetch and Log Books Data', async () => {
    const response = await apiContext.get('/BookStore/v1/Books');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log('Books Data:', JSON.stringify(responseBody.books, null, 2));
    expect(responseBody).toHaveProperty('books');
    expect(responseBody.books.length).toBeGreaterThan(0);
    responseBody.books.forEach((book, index) => {
      console.log(`Book ${index + 1}:`);
      console.log(`  Title: ${book.title}`);
      console.log(`  Author: ${book.author}`);
      console.log(`  ISBN: ${book.isbn}`);
      console.log(`  Publisher: ${book.publisher}`);
      console.log('--------------------------------');
    });
  });

  test('POST Request - Create a Product', async () => {
    const requestBody = {
      userId: "f48f64cc-6cf6-4561-a50f-e3a34921f27f",
      collectionOfIsbns: [
        {
          isbn: "9881993277571"
        }
      ]
    };
    const response = await apiContext.post('/BookStore/v1/Books', {data: requestBody});
    const status = await  response.status();
    console.log("Response status",status);
    expect(response.status()).toBe(201); 
    const responseBody = await response.json();
    console.log('Product Creation Response:', JSON.stringify(responseBody, null, 2));
    // expect(responseBody).toHaveProperty('Title'); 
});

  

  test.afterAll(async () => {
    await apiContext.dispose();
  });
});

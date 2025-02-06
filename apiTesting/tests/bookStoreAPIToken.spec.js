const{test, expect} = require('@playwright/test')
const { BookstoreApi } = require('../pageObject/bookStoreAPIToken')
const { logToFile } = require('./utils/helper')
const apiData = require('../data/data.json')


test.describe('API Testing Bookstore API',async()=>{
    let bookstoreApi;
    test.beforeEach('Intializing the class object', async()=>{
        bookstoreApi = new BookstoreApi();
    })
    test('Get All the Books from the library', async()=>{
        const response = await bookstoreApi.getAllRecords();
        // logToFile(`Response: ${response}`);
        const status = response.status;
        expect(status).toBe(200);
        const data = await response.data;
        logToFile(`Status: ${status}`)
        logToFile(`Data: ${JSON.stringify(data,null,2)}`);
        // console.log("Console Data", data)
    })

    test('Get a book using isbn',async()=>{
        const response = await bookstoreApi.getBook(apiData.isbn);
        expect(response.status).toBe(200);
        const bookData = response.data;
        // logToFile(`Data for 1 Book: ${JSON.stringify(bookData,null,2)}`);
    })

    test.only("Add a new book to a user id", async()=>{
        const response = await bookstoreApi.addABookInUserCollection(apiData.tikimaUserId,apiData.isbn);
        expect(response.status).toBe(201);
        const status = response.status;
        logToFile(`Status for adding book: ${status}`);
        const data = response.data;
        logToFile(`The book added is: ${JSON.stringify(data,null,2)}`);
    })

    test('Update the existing book isbn in user collection',async()=>{
        const response = await bookstoreApi.updateBookInUserCollection(apiData.tikimaUserId,"9781593275846");
        //Here isbn is from user collection
        expect(response.status).toBe(200);
        console.log("Status for update",response.status);
        console.log("Update Data", response.data);
    })

    test('Get Books of User Collection',async()=>{
        const response = await bookstoreApi.getBooksOfUser(apiData.tikimaUserId);
        expect(response.status).toBe(200);
        console.log("Get Books: ",JSON.stringify(response.data,null,2));
    })

    test('Delete a book from User Collection', async()=>{
        const response = await bookstoreApi.deleteBookOfUser("9781449331818", apiData.tikimaUserId);
        expect(response.status).toBe(204);
        console.log(("Deleted book", response.data));
        
    })
})

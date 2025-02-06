const axios = require('axios');
require('dotenv').config();
const data = require('../data/data.json')
const axiosInstance = axios.create({
    baseURL: process.env.baseURL,
    headers: {
        'Authorization': `Bearer ${data.authToken}`,  
        'Content-type': 'application/json'
    }
});

exports.BookstoreApi = class BookstoreApi {
    async getAllRecords() {
        const endPoint = process.env.books;
        const response = await axiosInstance.get(endPoint);
        return response;
    }

    async getBook(isbn) {
        const endPoint = `${process.env.getAbook}${isbn}`;
        const response = await axiosInstance.get(endPoint);
        return response;
    }

    async addABookInUserCollection(userId, isbn) {
        const endPoint = process.env.books;
        const payload = {
            userId: userId,
            collectionOfIsbns: [
                { isbn: isbn }
            ]
        };

        try {
            const response = await axiosInstance.post(endPoint, payload);
            console.log('Response:', response.data);
            return response;
        } catch (error) {
            console.error('Error while adding the book to the collection:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async updateBookInUserCollection(userId, isbn) {

        const payload = {
            userId: userId,
            isbn: "9781449331818" 
            //in payload isbn is from book library
        };
        const endPoint = `${process.env.updateUserBookCollection}${isbn}`;
        //in url the isbn is from collection
        try {
            const response = await axiosInstance.put(endPoint, payload);
            console.log('Response:', response.data);
            return response;
        } catch (error) {
            console.error('Error while adding the book to the collection:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
    async getBooksOfUser(userId) {
        const base = process.env.baseURL;
        const endPoint = `${process.env.getBooksOfUser}${userId}`;
        const response = await axiosInstance.get(base + endPoint);
        return response;
    }

    async deleteBookOfUser(isbn, userId){
       const endPoint = process.env.deleteAbook;
       const payload = {
         isbn : isbn,
         userId : userId
       }
       try{
        const response = await axiosInstance.delete(endPoint, {data:payload})
        return response;
       }
       catch{
        console.log("Error while deleting the book");
        
       }
    }
}

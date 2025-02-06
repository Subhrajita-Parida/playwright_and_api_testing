const {test, expect, request} = require('@playwright/test');

let apiContext;
test.describe('Typicode Api Testing', async()=>{
    test.beforeAll('Testing the typicode api', async()=>{
        apiContext = await request.newContext({baseURL : 'https://jsonplaceholder.typicode.com/posts'})
    })

    test.only('Get first post from the api', async()=>{
        const response = await apiContext.get('/1')
        const firstPost = await response.json();
        expect(response.status()).toBe(200);
        expect(firstPost).toHaveProperty("id",1)
        console.log("First Post",firstPost);
    })

    test('Posting the new post',async()=>{
        const newPost = {
            title: 'New post',
            body: 'JSONPlaceholder is a free online REST API that you can use whenever you need some fake data.'
        }
        const response = await apiContext.post('/posts',{data:newPost})
        const createdPost = await response.json();
        expect(response.status()).toBe(201);
        expect(createdPost.title).toBe(newPost.title);
        console.log("New Post", createdPost)
    })

    test('Updating the particular field',async()=>{
        const updatedProduct = {
            title: 'Updated Post'
        }
        const response = await apiContext.patch('/posts/101',{data:updatedProduct});
        const product = await response.json();
        expect(response.status()).toBe(200);
        expect(product).toHaveProperty('title','Updated Post');
        console.log("Updated Post is: ", product)
    })

    test('Delete one post', async()=>{
        const response = await apiContext.delete('/posts/101');
        expect(response.status()).toBe(200);
        const deletedPost = await response.json();
        expect(deletedPost).not.toHaveProperty('id',101);
        console.log("Deleted Post: ", deletedPost);
    })
})
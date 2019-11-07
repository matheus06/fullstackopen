const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = 'mongodb+srv://fullstack:123qwe@fullstackopencluster-2qzax.azure.mongodb.net/blog-app?retryWrites=true&w=majority';
mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true })

app.use(cors());
app.use(bodyParser.json());

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        });
});

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        });
});

const PORT = config.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

const express = require('express')
const path = require('path')
const PORT = 3000;

const app = express()
//set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//memory
let posts = [];

//shows all recipes/posts
app.get('/', 
    (req, res) => {
        res.render('index', { posts });
});

//create form
app.get('/create', 
    (req, res) => {
        res.render('create');
    });

//add a new recipe/post
app.post('/create',
    (req, res) => {
        const {title, author, content, category} = req.body;
        const time = new Date().toLocaleDateString();
        post.push({ id: Date.now(), title, author, content, category, time});
        res.redirect('/');
    });

//edit form recipe/post     
app.get('/edit/:id', 
    (req, res) => {
        const id = Number(req.params.id);
        const post = posts.find(p => p.id == id);
        res.render('edit', { post });
    });

//edit recipe/post
app.post('/edit/:id', 
    (req, res) => {
        const { title, author, content, category } = req.body;
        const id = Number(req.params.id);
        const post = posts.find(p => p.id == id);
        if (post) {
            post.title = title;
            post.author = author;
            post.content = content;
            post.category = category;
        }
        res.redirect('/');
    });

//Delete a recipe/post
app.delete('/posts/:id',
    (req, res) => {
        const id = Number(req.params.id);
        posts = posts.filter(p => p.id !== id);
        res.redirect('/');
    });

//server
app.listen(PORT, () => {
    console.log('Baking Blog running on http://localhost:${PORT}');
});

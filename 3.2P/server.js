const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const bookList = [
    {
        title: "The Great Gatsby",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
        link: "F. Scott Fitzgerald",
        description: "A novel about the American dream and the roaring twenties."
    },
    {
        title: "1984",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
        link: "George Orwell",
        description: "A dystopian social science fiction novel and cautionary tale."
    },
    {
        title: "To Kill a Mockingbird",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
        link: "Harper Lee",
        description: "A novel about the serious issues of rape and racial inequality."
    }
];

app.get('/api/books', (req, res) => {
    res.json({ statusCode: 200, data: bookList, message: "Success" });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

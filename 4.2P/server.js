const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri = "mongodb+srv://sazeenaf_db_user:jYAmNAxr8u3KM47m@cluster1.um1z8bp.mongodb.net/";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let collection;

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

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    const db = client.db('classic_books');
    collection = db.collection('books');

    // Seed the database if empty
    const count = await collection.countDocuments();
    if (count === 0) {
        console.log("Seeding database with initial books...");
        await collection.insertMany(bookList);
        console.log("Database seeded!");
    } else {
        console.log("Database already seeded containing " + count + " books.");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

run();

app.get('/api/books', async (req, res) => {
    try {
        const books = await collection.find({}).toArray();
        res.json({ statusCode: 200, data: books, message: "Success" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: "Error fetching data from database" });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

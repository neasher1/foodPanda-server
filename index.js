const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const { query } = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://foodpanda:foodpanda@cluster0.hlzaati.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {
    
    const foodsCollection = client.db('foodsApp').collection("foodsCollection");

    try {
        app.post('/add-foods', async (req, res) => {
            const service = req.body;
            const result = await foodsCollection.insertOne(service);
            res.send(result);
        });

        app.get('/all-foods', async (req, res) => {
            const query = {};
            const cursor = foodsCollection.find(query);
            const allFoods = await cursor.toArray();
            res.send(allFoods);
        });

        app.delete('/all-foods/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await foodsCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/all-foods/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const food = await foodsCollection.findOne(query);
            res.send(food);
        });

    }

    finally {

    }

}
run().catch(error => console.log(error))


app.get('/', (req, res) => {
    res.send('Food Panda Server is Running');
})

app.listen(port, () => {
    console.log(`Food Panda Server is running on port: ${5000}`);
})
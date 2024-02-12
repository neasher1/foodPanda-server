const express = require('express');
const app = express();
const port = 5001;
const cors = require('cors');
const { query } = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://employee:employee@cluster0.hlzaati.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {
    
    const employeeCollection = client.db('employeeInformation').collection("employeeCollection");

    try {
        app.post('/add-employee', async (req, res) => {
            const service = req.body;
            console.log(service);
            const result = await employeeCollection.insertOne(service);
            res.send(result);
        });

        app.get('/all-employee', async (req, res) => {
            const query = {};
            const cursor = employeeCollection.find(query);
            const allFoods = await cursor.toArray();
            res.send(allFoods);
        });

        app.delete('/all-employee/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await employeeCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/all-employee/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const food = await employeeCollection.findOne(query);
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
    console.log(`Food Panda Server is running on port: ${5001}`);
})
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())





const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dudbtcu.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection

        const userCollection = client.db('houseHunterDB').collection('users')
        const houseCollection = client.db('houseHunterDB').collection('houses')

        // user management
        // same email database push blocked
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const query = { email: newUser.email }
            const existingUser = await userCollection.findOne(query)
            if (existingUser && existingUser.email === newUser.email) {
                res.send({ message: 'User already exist.' })
            }
            else {
                const result = await userCollection.insertOne(newUser)
                res.send(result)
            }
        })

        // login check
        app.get('/login', async (req, res) => {
            const email = req.query.email
            const password = req.query.password
            const query = {
                email: email,
                password: password
            }
            const existingUser = await userCollection.findOne(query)
            if (existingUser) {
                res.send(existingUser)
            }
            else {
                res.send({ message: 'user not found!' })
            }
        })

        // house admin api
        app.post('/newhouse', async (req, res) => {
            const newHouse = req.body;
            const result = await houseCollection.insertOne(newHouse)
            res.send(result)
        })

        app.get('/newhouse', async (req, res) => {
            const email = req.query.email
            const query = { email: email }
            const result = await houseCollection.find().toArray()
            res.send(result)
        })

        app.get('/newhouse/:id', async (req, res) => {
            const id = req.params.id
            // console.log(id);
            const query = { _id: new ObjectId(id) }
            const result = await houseCollection.findOne(query)
            res.send(result)
        })

        app.put('/newhouse/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const updateHouseData = req.body
            const houseData = {
                $set: {
                    name: updateHouseData.name,
                    address: updateHouseData.address,
                    city: updateHouseData.city,
                    bedrooms: updateHouseData.bedrooms,
                    bathrooms: updateHouseData.bathrooms,
                    picture: updateHouseData.picture,
                    availability: updateHouseData.availability,
                    rent: updateHouseData.rent,
                    phone: updateHouseData.phone,
                    description: updateHouseData.description,
                    size: updateHouseData.size
                }
            }
            const result = await houseCollection.updateOne(filter, houseData, options)
            res.send(result)
        })








        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`Running on port ${5000}`);
})
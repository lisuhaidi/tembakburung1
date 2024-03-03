
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://lisuhaidi:135790@cluster0.qun4zz0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Fungsi untuk terhubung ke MongoDB dan mengambil koneksi
async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");
        return client.db('tembakburung');
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas", error);
        throw error;
    }
}

module.exports = { connectDB };
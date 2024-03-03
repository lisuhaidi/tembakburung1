const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const path = require('path');
const { connectDB } = require('./utils/db');
const { render } = require('express/lib/response');

// set up express
const app = express()
const port = 3008
// set up ejs
// set up ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

// setup file
app.use(express.static('public'))


// route halaman start
app.get('/', async (req, res) => {
    const db = await connectDB();
    const HighScore =  await db.collection('score').aggregate([
        { $sort: { score: -1 } },
        { $limit: 1 }
      ]).toArray();
      const checkNama = [];

    res.render('start', {
      layout: 'layouts/main-layouts',
      title: 'Home',
      HighScore,
      checkNama,
      error: 'Masukkan nama'
    });
  })

  app.post('/', async (req, res) => {
    const db = await connectDB();
    const Score = await db.collection('score');
    const HighScore =  await db.collection('score').aggregate([
      { $sort: { score: -1 } },
      { $limit: 1 }
    ]).toArray();
    const checkNama = await Score.find({nama: req.body.nama}).toArray();
    if (checkNama.length > 0) {
      res.render('start', {
        layout: 'layouts/main-layouts',
        title: 'Home',
        HighScore,
        checkNama,
        error: 'Nama sudah ada! Ganti nama lain.'
      });
    } else {
      await Score.insertOne({ nama: req.body.nama, score: '0' })
      res.render('player', {
        layout: 'layouts/main-layouts',
        title: 'Home',
        HighScore,
        nama: req.body.nama,
      })
    }
});



// route halaman play
app.get('/play', async (req, res) => {
    const db = await connectDB();
    const HighScore = await db.collection('score').aggregate([
        { $sort: { score: -1 } },
        { $limit: 1 }
      ]).toArray();

    res.render('play', {
        layout: 'layouts/main-layouts',
        title: 'Play',
        HighScore,
    })
})

app.post('/score', async (req, res) => {
    const { nama, score } = req.body;
    const db = await connectDB();
    const Score = await db.collection('score');
    const existingData = await Score.findOne({ nama });
    if ( score > existingData.score){
      await Score.findOneAndUpdate({ nama }, { $set: { score } }, { new: true });
    }
});

app.get('/score', async (req, res) => {
  const db = await connectDB();
  const HighScore = await db.collection('score').aggregate([
    { $sort: { score: -1 } },
    { $limit: 1 }
  ]).toArray();
  const ScoreSort = await db.collection('score').find().sort({score: '-1'}).limit(10).toArray()
  res.render('high-score', {
    layout: 'layouts/main-layouts',
    title: 'Home',
    HighScore,
    ScoreSort,
  })
})


app.get('/about', async (req, res) => {
  const db = await connectDB();
  const HighScore =  await db.collection('score').aggregate([
        { $sort: { score: -1 } },
        { $limit: 1 }
      ]).toArray();
      const checkNama = [];
  res.render('about', {
    layout: 'layouts/main-layouts',
    title: 'About',
    HighScore,
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
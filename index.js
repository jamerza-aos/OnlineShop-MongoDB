require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5542
app.use(express.static('public'))
app.set('view engine', 'ejs')
const mongoose = require('mongoose');
const prudectItem = require('./models/PrudectItem')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Connected to my DB')
        app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
    })
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    prudectItem.find()
    .then(result => {
        res.render('index', {prudectData: result})
    })
    .catch(err => console.log(err) )
})

app.get('/add', (req, res) => {
    prudectItem.find().limit(6)
    .then(result => {
        res.render('add', {prudectData: result})
    })
})

app.post('/add-product', (req, res) => {
    console.log(req.body);
    //neu projeckt 
    const newGalleryItem = new prudectItem(req.body)
    // zeile 30 (req.body) kann ich auch schreiben statt (req) die name,url ,company,price
    newGalleryItem.save()
    .then(result => {
        //35 save in Home (redirect)
        res.redirect('/')
        console.log('prudect ist add');
    })
    .catch(err => console.log(err))
})

app.get('/single/:pictureId',(req,res) => {
    console.log(req.params.pictureId)
    prudectItem.findById(req.params.pictureId)
    .then(result => {
        res.render('details', {picture: result})
    })
    .catch(err => console.log(err))
})

app.get('/Lessthan', (req, res) => {
    res.render('Lessthan')
})
app.get('/WeeklyRec', (req, res) => {
    res.render('WeeklyRec')
})


app.get('/single/:pictureId/delete',(req,res) => {
    console.log(req.params.pictureId)
    prudectItem.findByIdAndDelete(req.params.pictureId)
    .then(result => {
        res.redirect('/')
})
    .catch(err => console.log(err))
})

app.post('/single/:pictureId/edit',(req,res) => {
    console.log(req.params.pictureId)
    prudectItem.findByIdAndUpdate(req.params.pictureId,req.body)
    .then(result => {
        res.redirect(`/single/${req.params.pictureId}`)
})
    .catch(err => console.log(err))
})

app.get('/Lessthan', (req, res) => {
    // Match ist function 
    prudectItem.aggregate([{ $match: { Price: { $lte: 30 } } }])
        .then((result) => {
            res.render("Lessthan", { prudectData: result });
        })
        .catch((err) => console.log(err));
});



const express = require('express');
const mongoose = require("mongoose");
const {Schema} = mongoose;
const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

const multer = require("multer");

var pathimg;

const storage = multer.diskStorage({
    destination : function(req, fikle, cb){
        return cb(null, '../src/img/');
    },
    filename : function(req, file, cb){
        pathimg = `${Date.now()}_${file.originalname}`;
        return cb(null, pathimg);
    }
});

const uploads =  multer({storage:storage});
app.use('static', express.static('uploads'));

app.use( (req, res , next) => {
    res.header('Access-Control-Allow-Origin' , '*');
    res.header('Access-Control-Allow-Headers' , 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

//myDB=collection's name
mongoose.connect("mongodb://127.0.0.1:27017/myDB",{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const productsch = new Schema({
    name: String,
    price: Number,
    category: String,
    bestS: Boolean,
    img: String,
    pricemini: Number,
    priceTwo:Number
} ,{collection : 'cake'})

const ordersch = new Schema({
    name: String,
    cakeSize: String,
    taste:String,
    textCake: String,
    addressUser: String,
    date: String,
    totalPrice: Number,
    img: String
} ,{collection : 'Orders'})

const CakeModel = mongoose.model('cake', productsch);

const UpdateModel = mongoose.model('Orders', ordersch);

app.get('/orders', async(req, res) => {
    const allCake = await UpdateModel.find({})
    res.send(allCake);
})
app.post('/updateorder/:cakeId', async(req, res) => {
    let orderData = new UpdateModel({
        name: req.query.name,
        cakeSize: req.query.cakeSize,
        taste:req.query.taste,
        textCake: req.query.textCake,
        addressUser: "99 หมู่ที่ 18 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120",
        date: req.query.date,
        totalPrice: req.query.totalPrice,
        img: req.query.imgCake
    })
    orderData.save();
    console.log(orderData._id);
    // res.send(orderData);
    res.redirect(`http://localhost:3000/basket/${orderData._id}`)
})

app.get('/', async(req, res) => {
    const allCake = await CakeModel.find({})
    res.send(allCake);
})
app.post('/addcake', async(req,res) =>{
    let cakeData = new CakeModel({
        id:req.query.id,
        name: req.query.name,
        price: req.query.price,
        category: req.query.category,
        bestS: req.query.bestS,
        img: req.query.img
    })
    await cakeData.save();
    // res.send(`${cakeData} \nCreated!`);
    //res.send(cakeData + "created");
    res.send(cakeData);
    //res.send("create");
})
app.delete('/delete/:id' , (req, res) =>{
    CakeModel.findByIdAndDelete(req.params.id).then(cake =>{
        if(!cake){
            return res.status(404).send();
        }
        console.log("delete");
        res.status(200).json({message: "Deleted Succeded"});
    }).catch(err =>{
        res.status(500).send(err);
    })
})

app.patch('/edit/:id', (req, res) => {
    let query = { _id: req.params.id };
    let update = {"$set" : {"price": req.query.price }};
    CakeModel.findOneAndUpdate( query , update).then(cake => {
        if(!cake) {
            return res.status(404).send();
        }
    })
    res.send("update cake succeed");
    
});

app.listen(port,() =>{
    console.log(`run sever on port : ${port}`)
})
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const User = require('./schema/user')
const body = require('body-parser')


app.use(express.urlencoded({ extended: true }))
app.use(body.json())
mongoose.connect('', function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("connected");
    }
})
app.get('/user', async function (req, res) {
    await User.find({}).then(function (user) {
        res.send(user)
    })
        .catch((err) => {
            res.send(err)
        })
})
app.post('crtuser',async function(req,res){
    await User.create({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email
    })
    .then(function(user){
        res.send(user)
    })
    .catch((err)=>{
        res.send(err)
    })
    console.log(req.body);
})
app.get('/user/:id',async function(req,res){
    await User.findById(req.params.id)
    .then(function(user){
        res.send(user)
    })
    .catch((err)=>{
        res.send(err)
    })
})
app.put('/updateuser/:id',async function(req,res){
    await User.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
    })
    .then(function(user){
        res.send(user)
    })
    .catch((err)=>{
        res.send(err)
    })
})
app.delete('/deluser',async function(req,res){
    await User.findByIdAndDelete(req.params.id)
    .then(function(user){
        res.send()
    })
})
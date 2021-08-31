const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const LoginModel = require('./db.js')
const app = express()

app.use(express.json())
app.use(cors())
mongoose.connect('mongodb+srv://123:12345@food.0wi7d.mongodb.net/Loginy?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
var message = ""
var wiadomosc = ""
app.post('/rejestracja', async(req,res) =>{
    
    const username = req.body.username;
    const haslo = req.body.haslo;
    const confirmpassword = req.body.confirmpassword;
    // console.log(username+haslo+confirmpassword)
    if(username === "" || haslo === "" )
    {
        message = "wypelnij wszystkie pola"
    }
    else if(haslo === confirmpassword)
    {
        if(haslo.length<7) 
        {
            message = "za krotkie haslo"
        }
       var szukaj = await LoginModel.findOne({email: username}).exec();
       if(szukaj === null)
       {
           const nowylogin = new LoginModel({ email:username, password:haslo})
           nowylogin.save()
           message = "stworzono konto :-)"
       }
       else{
           message = "istnieje juz konto z takim emailem"
       }

    }
    else{
        message = "powtorzone haslo jest bledne"
    }
    console.log(message)
})
app.post('/login',async(req,res) =>{
    const uzytkownik =req.body.uzytkownik
    const hasuo = req.body.hasuo
    const loginmod = await LoginModel.findOne({email: uzytkownik}).exec();
    console.log(loginmod)
    console.log(hasuo+" "+uzytkownik)
    if(loginmod === null) {
        wiadomosc = "bledne dane logowania/brak konta"
    }
    else if(loginmod.email === uzytkownik && loginmod.password === hasuo)
    {
        wiadomosc = "udalo ci sie zalogowac brawo :-)"
    } 
    else if(loginmod.email === uzytkownik && !(loginmod.password === hasuo))
    {
        wiadomosc = "zle haslo"
    }
    else{
        wiadomosc = "bledne dane logowania/brak konta"
    }
    console.log(wiadomosc)
})
app.get('/otrzymaj', async(req,res) =>{
    res.send(wiadomosc)
})
app.get('/otrzymaj2', async(req,res) =>{
    res.send(message)
})
app.listen('3004', () =>{
    console.log('dziaal na porice 3004')
})
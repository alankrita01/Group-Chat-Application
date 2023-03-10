const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
//const { fstat } = require('fs');
const app = express();
const data = require('./')

app.use(bodyParser.urlencoded());


app.get("/",(req,res,next) =>{
  fs.readFile('username.txt',(err,data) =>{
    if(err){
      console.log(err);
      data = 'NO chat Exists';
    }
  })
  res.send(
    `${data}<form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
      <input type="text" name="message" id="message">
      <input type="hidden" name="username" id="username">
      <br>
      <button type="submit">Login</button>
    </form>`
  );

})

app.post("/",(req,res,next) =>{
  console.log(req.body.username);
  console.log(req.body.message)
  fs.writeFile("username.txt",`${req.body.username}:${req.body.message}`,{flag:"a"},(err) => err?console.log(err) : res.redirect("/")
  )
})

app.get('/login',(req,res,next) =>{
  res.send(
    `<form action="/login" method="POST" onsubmit="localStorage.setItem('username',document.getElementById('username'))">
          <input type="text" name="username" placeholder="username" id="username">
          <br>
          <button type="submit">Login</button>
    </form>`
  )
})

app.post('/login',(req,res,next) =>{
  console.log(req.body);
  localStorage.setItem('username');
  res.redirect('/');
})

//adding error page
app.use((req,res,next) =>{
  res.status(404).send('<h1>Page not Found</h1>')
})

app.listen(4000);

/*
//importing login and Users file
const loginRouter= require('./routes/login');
const UsersRouter= require('./routes/users');

//exporting login and Users file
app.use(loginRouter);
app.use(UsersRouter);
*/
const createError = require('http-errors');

const express =require("express");
const app=express();
const path = require('path');

const jwt = require('jsonwebtoken');
const db=require("./models");
const {User}=require("./models");
const dotenv = require('dotenv');
const bcrypt=require('bcrypt');
dotenv.config();

app.use(express.static(path.resolve(__dirname,'../fitness-frontend/build')));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../fitness-frontend/build', 'index.html'));
});

app.get("/" ,(req,res)=>{
    res.send("Hello World")
});
app.get("/one/:id", function (req, res, next) {
  let id = parseInt(req.params.id);
  models.users
      .find({where: {id: id}})
      .then(user => res.render("specificUser", {user: user}));
});

app.get("/signup", (req,res)=>{
res.send("users")
});
app.post("/signup", async(req, res)=>{
    const salt=await bcrypt.genSalt(10)
    User.create({
    firstName:req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password,salt)
}).then()

.catch((err)=>{
    if (err){
        console.log(err)
    }
});
res.send("signup");
});


app.post('/login',async(req,res,next)=>{
 const user = await User.findOne({ where : {email : req.body.email }});
 if(user){
    const password_valid = await bcrypt.compare(req.body.password,user.password);
    if(password_valid){
        token = jwt.sign({ "id" : User.id,"firstName" : User.firstName,"lastName:user": User.lastName, "email":User.email},'${process.env.SECRET}');
        res.status(200).json({ token : token });
    } else {
      res.status(400).json({ error : "Password Incorrect" });
    }
  
  }else{
    res.status(404).json({ error : "User does not exist" });
  }
  
  });

  app.get('/me',
   async(req,res,next)=>{
    try {
      let token = req.headers['authorization'].split(" ")[1];
      let decoded = jwt.verify(token,process.env.SECRET);
      req.user = decoded;
      next();
    } catch(err){
      res.status(401).json({"msg":"Couldnt Authenticate"});
    }
    },
    async(req,res,next)=>{
      let user = await User.findOne({where:{id : req.user.id},attributes:{exclude:["password"]}});
      if(user === null){
        res.status(404).json({'msg':"User not found"});
      }
      res.status(200).json(user);
   });
   app.use(function(req, res, next) {
    next(createError(404));
  });

app.use(function (err, req, res, next) {
    res.sendStatus(500)
    res.render('error', { error: err })
  });
db.sequelize.sync().then((res)=>{
app.listen(3000);
})

const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const methodOverride=require('method-override');
const passport=require("passport");
const localStrategy = require("passport-local");


const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));


// to run in mlab db server
// const uri = "mongodb+srv://abhijeet:dirtyclown@cluster0-lyzlv.mongodb.net/test?retryWrites=true&w=majority";
// mongoose.connect( uri,{ useNewUrlParser: true ,useUnifiedTopology: true });
// to run in local environment 

/**********************DB CONFIG*******************/
mongoose.connect("mongodb://localhost/todoList",{ useNewUrlParser: true ,useUnifiedTopology: true });
const Task=require("./models/task");
const User=require("./models/user");

/**********************PASSPORT CONFIG*****************/
app.use(require("express-session")({
    secret : "do you know god of death likes apples",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    next();
});

/**********************ROUTES***************************/

app.get('/',(req,res)=>{
    res.redirect("/home");
});

app.get("/home",isLoggedIn,(req,res)=>{
    User.findById(req.user._id).populate("tasks").exec((err,user)=>{
        if(err){
            console.log("error while recieving entries from the database");
        }else{
            res.render("home.ejs",{task:user.tasks});
        }
    });
});

app.get('/new',isLoggedIn,(req,res)=>{
    res.render('new');
});

app.post('/home',isLoggedIn,(req,res)=>{
    var newTask=req.body;
    newTask.userID=req.user._id;
    Task.create(newTask,(err,task)=>{
        if(err){
            console.log("err has occured while inserting an entry into the database");
        }else{
            console.log(`a new task has been created : ${task}`);
            User.findById(req.user._id,(err,newUser)=>{
                if(err){console.log(err);}
                else{
                    newUser.tasks.push(task);
                    newUser.save();
                    res.redirect("/home");
                }
            })
        }
    });
});

app.get('/home/:id/edit',isLoggedIn,(req,res)=>{
    Task.findById(req.params.id,(err,task)=>{
        if(err){
           console.log("trouble finding the entry with id : "+req.params.id);
        }else{
           res.render('edit',{task:task});
        }
    });
})

app.put("/home/:id/",isLoggedIn,(req,res)=>{
    Task.findOneAndUpdate({_id:req.params.id},req.body.task,(err,editedTask)=>{
        if(err){
            console.log("trouble updating the entry with id : "+req.param.id);
        }else{
            console.log("task is edited");
            res.redirect("/home");
        }
    })
});

app.delete("/home/:id/delete",isLoggedIn,(req,res)=>{
    Task.findByIdAndDelete(req.params.id,(err,deletedTask)=>{
        if(err){
            console.log("problem encountered while deleting");
        }else{
            console.log(`task with id ${deletedTask._id} is deleted`);
            res.redirect("/home");
        }
    })
});
// passport routes

app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",(req,res)=>{
    var newUser = {
        username:req.body.username,
        email:req.body.emailID,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    };
    User.register(newUser,req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,()=>{
            res.redirect("/home");
        });
    })
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/home",
    failureRedirect:"/login"
}),(req,res)=>{
});

app.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect("/");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}

app.listen(3000,()=>{
    console.log('server is running...')
});

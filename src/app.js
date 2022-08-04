const express = require ('express');
const app = express();
const path =require("path");
const hbs=require("hbs");
const mongo = require("./db/conn");
const Register=require("./models/reg");
// const mongoose = require("mongoose");
// const mongoPath ='mongodb+srv://lasttry:qwer@olyampic1.1faaixp.mongodb.net/hihello?retryWrites=true&w=majority'


// mongoose.connect(mongoPath,{
//     useNewUrlParser:true,
//     // useUnifiedTopology: true,
//     // useCreateIndex: true,
//     // useFindAndModify:false
// }).then(() => {
//     console.log(`connection Successful`);
// }).catch((e) => {
//     console.log(`no connectiosns `)
// })




const connectRe = async ()=>{
    await mongo().then(mongo=>{
        try {
            console.log("connect to mongodb!!!")
        }catch(err){
            console.log('no connected')
        } finally {
            
            // mongo.connection.close()
        }
    })
}


const port =process.env.PORT || 3000;

const static_path =path.join(__dirname ,"../public")
const templates_path =path.join(__dirname ,"../templates/views")
const partials_path =path.join(__dirname ,"../templates/partials")
// console.log()


app.use(express.json());
app.use(express.urlencoded({extended:false}))

connectRe();


app.use(express.static(static_path))

app.set("view engine","hbs");
app.set("views",templates_path);
hbs.registerPartials(partials_path);

app.get('/',(req,res)=>{
    res.render("index")
})

app.get("/register",(req,res)=>{
    res.render("register")
})

// create new user in our data base
app.post("/register",async(req,res)=>{
   try {
        // console.log(req.body.fullname)
        // res.send(req.body.fullname)

        const password =req.body.password;
        const cpassword =req.body.confirm;

        if(password===cpassword){
                var registerpassword =new Register({
                    fullname:req.body.fullname,
                    email:req.body.email,
                    password:password,
                    confirm:cpassword
                })

                console.log(req.body.fullname)
             registerpassword.save((err,data)=>{

                if(err){
                    console.error(err)
                }else{
                    res.status(201).render("index");

                }

             });
        }else{
            res.send("passwords are not matching")
        }

   } catch (error) {
    res.status(400).send(error);
   }
})

app.get("/login",(req,res)=>{
    res.render("login")
})

// login check
app.post("/login", async(req,res)=>{

try{

    const email=req.body.email;
    const pass=req.body.password;

    const useremail = await Register.findOne({email:email});
    // res.send(useremail.password);
    // console.log(useremail);

    if(useremail.password===pass){
        res.status(201).render("home");
                
        app.get('/about',(req,res)=>{
            res.render("about")
        })
        app.get('/home',(req,res)=>{
            res.render("home")
        })
        app.get('/services',(req,res)=>{
            res.render("services")
        })
        app.get('/contact',(req,res)=>{
            res.render("contact")
        })

    }
    else{
        res.send("password is not matching");
    }

}catch(error){
    res.status(400).send("invalid email")
}
})




app.listen(port ,()=>{
    console.log(`server is runing at poort no ${port}`);
})
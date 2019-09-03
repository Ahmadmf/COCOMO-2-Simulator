var express=require("express"),
    mongoose=require("mongoose"),
    passport=require("passport"),
    methodOverride=require("method-override"),
    bodyParser=require("body-parser"),
    User=require("./models/user"),
    LocalStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"); 
    
mongoose.connect('mongodb://localhost/student_record', {useNewUrlParser: true});
var app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
    secret:"ahmad firoz",
    resave:false,
    saveUninitialized:false
    
}));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var studentSchema=new mongoose.Schema({
    faculty_number:String,
    enrollment_number:String,
    name:String,
    course:String,
    department:String
})
var Student=mongoose.model("Student",studentSchema);


app.get("/",function(req,res){
    res.render("authentiaction");
});
app.get("/home",isLoggedIn,function(req,res){
    res.render("home");
});
app.get("/student_detail",isLoggedIn,function(req,res){
    //get all students detail from database
    Student.find({},function(err,allStudents){
        if(err){
            console.log(err);
        }else{
              res.render("student_detail",{students:allStudents});
        }
    });
});
//Destroy student detail

app.delete("/:id",function(req,res){
    res.send("you are trying to delete something");
});


app.get("/register",function(req,res){
    res.render("register");
    
})

app.post("/register",function(req,res){
   // res.send("jniknjh");
    req.body.username
    req.body.password
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err)
        {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/home");
        });
    });
});
app.get("/functionpoint",function(req,res){
    var fp=0;
    res.render("functionpoint",{fpcalculated:fp});
   // res.render("functionpoint");
});
app.post("/functionpoint",function(req,res){
    var simple_sum=3*req.body.simple_1+4*req.body.simple_2+3*req.body.simple_3+7*req.body.simple_4+5*req.body.simple_5;
    var average_sum=4*req.body.average_1+5*req.body.average_2+4*req.body.average_3+10*req.body.average_4+7*req.body.average_5;
    var complex_sum=6*req.body.complex_1+7*req.body.complex_2+6*req.body.complex_3+15*req.body.complex_4+10*req.body.complex_5;
    var ufp=simple_sum+average_sum+complex_sum;
    var di=parseInt(req.body.first,10)+parseInt(req.body.second,10)+parseInt(req.body.third,10)+parseInt(req.body.fourth,10)+parseInt(req.body.fifth,10)+parseInt(req.body.sixth,10)+parseInt(req.body.seventh,10)+parseInt(req.body.eight,10)+parseInt(req.body.ninth,10)+parseInt(req.body.tenth,10)+parseInt(req.body.eleventh,10)+parseInt(req.body.twelveth,10)+parseInt(req.body.thirteenth,10)+parseInt(req.body.fourteenth,10);
    var caf=(0.65+0.01*di);
    var fp=ufp*caf;
    console.log(fp);
    res.render("functionpoint",{fpcalculated:fp});
   /* Student.create(fp,function(err,fpcalculated){
          if(err){
              console.log(err);
          }else {
             //redirect back to home page
             res.render("functionpoint",{fpcalculated:fpcalculated});
             // res.redirect("function_point");
          }
    
});*/
});

app.get("/sloc",function(req,res){
    var sloc=0;
    res.render("sloc",{sloccalculated:sloc});
   // res.render("sloc");
});
app.post("/sloc",function(req,res){
    var fp=parseFloat(req.body.fp);
    var lf=req.body.lf;
    var value;
    if(lf=="Ada")
        value=71;
    else if(lf=="Assembly")
        value=320;
    else if(lf=="Basic")
         value=64;
    else if(lf=="C")
         value=128;
    else if(lf=="C++")
         value=53;
    else if(lf=="Java")
         value=53;
    else if(lf=="HTML 3.0")
         value=64;
    else if(lf=="Pascal")
         value=91;
    else if(lf=="PERL")
         value=27;
    else if(lf=="Spreadsheet")
         value=6;
    else
         value=40;
    var sloc=fp*value;
    console.log(sloc);
    res.render("sloc",{sloccalculated:sloc});
    /*Student.create(fp,function(err,fpcalculated){
          if(err){
              console.log(err);
          }else {
             //redirect back to home page
             res.render("functionpoint",{fpcalculated:fpcalculated});
             // res.redirect("function_point");
          }
    
});*/
});
app.get("/effort",function(req,res){
    //var sloc=0;
    var PM=0;
    var develTime=0;
    var Cost=0;
    res.render("effort",{effort:PM,time:develTime,Cost:Cost});
   // res.render("effort");
   // res.render("sloc");
});
/*post route for effort ,cost estimation   */
app.post("/effort",function(req,res){
    var sloc=parseFloat(req.body.sloc);
    var precedentedness=parseFloat(req.body.precedentedness);
    var risk_resolution=parseFloat(req.body.risk_resolution);
    var process_maturity=parseFloat(req.body.process_maturity);
    var development_flexibility=parseFloat(req.body.development_flexibility);
    var team_cohesion=parseFloat(req.body.team_cohesion);
    var rely=parseFloat(req.body.rely);
    var data=parseFloat(req.body.data);
    var cplx=parseFloat(req.body.cplx);
    var ruse=parseFloat(req.body.ruse);
    var docu=parseFloat(req.body.docu);
    var asap=parseFloat(req.body.asap);
    var pcap=parseFloat(req.body.pcap);
    var pcon=parseFloat(req.body.pcon);
    var apex=parseFloat(req.body.apex);
    var plex=parseFloat(req.body.plex);
    var ltex=parseFloat(req.body.ltex);
    var time=parseFloat(req.body.time);
    var stor=parseFloat(req.body.stor);
    var pvol=parseFloat(req.body.pvol);
    var tool=parseFloat(req.body.tool);
    var site=parseFloat(req.body.site);
    var sced=parseFloat(req.body.sced);
    var labourRate=parseFloat(req.body.cost);
     
    
    //calculation for effort
     
     var SF=precedentedness+risk_resolution+process_maturity+development_flexibility+team_cohesion;
     var E=0.91+(0.01*SF);
     var EM=rely*data*cplx*ruse*docu*asap*pcap*pcon*apex*plex*ltex*time*stor*pvol*tool*site*sced;
     var PM=2.94*Math.pow(sloc,E)*EM;
     console.log(PM);
     
   //  console.log(precedentedness);
   //  console.log(risk_resolution);
   //  console.log(process_maturity);
   //  console.log(development_flexibility);
   //  console.log(team_cohesion);
   //  console.log(SF);
   
   
   
   //Calculation of Development Time
   
   var F=0.28+(0.2*0.01*SF);
   var develTime=3.67*Math.pow(PM,F);
   console.log(develTime);
   
   
   
   //Calculation of Cost of Project
   var Cost=labourRate*PM;
   console.log(Cost);
   
     
     
     
    res.render("effort",{effort:PM,time:develTime,Cost:Cost});
    /*
    res.render("functionpoint",{fpcalculated:fp});
   Student.create(fp,function(err,fpcalculated){
          if(err){
              console.log(err);
          }else {
             //redirect back to home page
             res.render("functionpoint",{fpcalculated:fpcalculated});
             // res.redirect("function_point");
          }
    
});*/
});


app.get("/addstudent",isLoggedIn,function(req,res){
    //res.send("Ok I will log out!");
    res.render("addstudent");
})
app.post("/addstudent",function(req,res){
    var faculty_number=req.body.faculty_number;
    var enrollment_number=req.body.enrollment_number;
    var name=req.body.name;
    var course=req.body.course;
    var department=req.body.department; 
    var newStudent={faculty_number:faculty_number,
        enrollment_number:enrollment_number,
        name:name,
        course:course,
        department:department}
        
    Student.create(newStudent,function(err,newlyCreated){
          if(err){
              console.log(err);
          }else {
             //redirect back to home page
              res.redirect("student_detail");
          }
    
});
});

app.get("/login",function(req,res){
    res.render("login");
})

app.post("/login",passport.authenticate("local",{
        successRedirect:"/home",
        failureRedirect:"/login"
}),function(req,res){
    
});

app.get("/logout",function(req,res){
    //res.send("Ok I will log out!");
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/authentiaction");
}
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Sever Started...");
})

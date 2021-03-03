const { UV_FS_O_FILEMAP } = require("constants")
let express=require("express")
let app=express()

let twilio=require("twilio")("","")
let path=require("path")
const { Message } = require("twilio/lib/twiml/MessagingResponse")

app.use(express.static("public"));
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("index.ejs")
})
function message(number,compliment){
    console.log("Entered Function")
    twilio.messages.create({
        body:compliment,
        from:"",
        to:number
    }).then((mess)=>{
        console.log(mess.sid)
    }).catch((error)=>{
        console.log(error)
    })
}

app.post("/",(req,res)=>{
    let {number,person,id_name,compliment}=req.body
    

    if(typeof(parseInt(number))==="undefined"){
        console.log("Error! Enter correct number")
    }
    else{
        console.log("Entered")
        
        message(number,compliment)
        console.log(number,person,id_name,compliment)
    }
    
})


app.listen(3000,()=>{
    console.log("Website Started")
})
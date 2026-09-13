const mongoose=require("mongoose")

async function connectionDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
    console.log("db connected sucessfully")
    }catch(err){
        console.log("mongoose connect failed",err)
    }
}

module.exports=connectionDB;

require("dotenv").config()
const app=require("./src/app")
const connectionDB=require("./src/config/db")




connectionDB()
app.listen(3000,()=>{
    console.log(`server is runing at port ${3000}`)
})
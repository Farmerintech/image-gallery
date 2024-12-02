import express from "express"
import { connectDB } from "./config/db.js"
import authRoute from "./route/auth.route.js"
import uploadRoute from "./route/upload.route.js"
import userRoute from "./route/user.route.js"

const PORT = process.env.PORT || 8000

const app = express()

connectDB()
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/uploads", uploadRoute);
app.use("/api/v1/users", userRoute)
app.use(express.static('client'))

app.listen(PORT, ()=>{
    console.log(`Server running at PORT ${PORT}`)
})
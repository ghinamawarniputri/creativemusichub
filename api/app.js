import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import PaymentsRoute from "./routes/PaymentsRoutes.js"

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/api/payments", PaymentsRoute)

export default app;
import express, { response } from "express"
import Midtrans from "midtrans-client";

const router = express.Router()

router.post("/process-transaction", (req,res) =>{
    try {
        const snap = new midtransClient.snap({
            isProduction: false,
            serverKey: process.env.SECRET,
            clientKey: process.env.NEXT_PUBLIC_CLIENT
        })

        const parameter = {
            item_details: [{
                name: req.body.name,
                price: req.body.price,
            }],
            transaction_details: {
                order_id: req.body.id,
                gross_amount: req.body.price
            }
        };

        snap.createTransaction(parameter).then((transaction) => {
            const dataPayment =  {
                response: JSON.stringify(transaction)
            }

            const token = transaction.token
            res.status(200).json({message: "Berhasil", dataPayment, token: token})
        
        });

        // console.log("Midtrans Token:", token);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


export default router

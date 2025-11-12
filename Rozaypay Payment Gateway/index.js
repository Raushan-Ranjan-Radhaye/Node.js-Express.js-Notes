const express = require('express')
const ejs = require('ejs')
const path = require('path')
const crypto = require('crypto')
const Razorpay = require('razorpay')
const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils')
require('dotenv').config()


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


//Middleware
const app = express()
app.use(express.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')
//Routes


app.get('/', (req, res) => {
    res.render('index', {key: process.env.RAZORPAY_KEY_ID})
})


//Create Order Route
app.post("/create-order", async(req, res)=>{
    try{
        const amount = parseInt(req.body.amount);
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        }

        const order = await razorpay.orders.create(options);
        res.json(order);

    }catch(err){
        res.status(500).send({error: err.message})
    }
})



//Verify Payment Route
app.post("/verify-payment", (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');

        if (expectedSignature === razorpay_signature) {
            res.status(200).json({ message: "Payment verified successfully" });
        } else {
            res.status(400).json({ message: "Payment verification failed" });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});



//Payment Success Route
app.get("/payment-success", (req, res) => {
    res.sendFile(path.join(__dirname, "views/success.html"));
});



//Server
const PORT = process.env.PORT || 3000
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
const express = require('express')
const dotenv = require("dotenv")
const app = express();
const twilio = require('twilio')
dotenv.config();


console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN ? 'Loaded' : 'Missing');
console.log('TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER);


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;


if (!accountSid || !authToken || !twilioPhoneNumber) {
    console.warn('Warning: Missing one or more required Twilio environment variables: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER');
}


if (accountSid !== 'your_twilio_account_sid_here' && !accountSid.startsWith('AC')) {
    console.warn('Warning: Invalid TWILIO_ACCOUNT_SID: It must start with "AC". Please check your .env file.');
}


if (twilioPhoneNumber !== 'your_twilio_phone_number_here' && !twilioPhoneNumber.match(/^\+\d+$/)) {
    console.warn('Warning: Invalid TWILIO_PHONE_NUMBER: It must be in E.164 format starting with + followed by digits. Please check your .env file.');
}


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')

let client;
if (accountSid === 'your_twilio_account_sid_here' || authToken === 'your_twilio_auth_token_here') {
    console.warn('Twilio client not initialized: Using placeholder credentials. Update .env with real values to enable SMS sending.');
    client = null;
} else {
    client = new twilio(accountSid, authToken);
}


app.post('/send-sms', async (req,res)=>{
    const {to, message} = req.body

    if (!client) {
        return res.status(500).json({
            message: 'Twilio client not initialized. Please update .env with real Twilio credentials.'
        });
    }


    try{
        const result = await client.messages.create({
            body: message,
            from : process.env.TWILIO_PHONE_NUMBER,
            to : to
        })

        res.status(200).json({
            sid: result.sid,
            message: 'SMS sent successfully'
        })
    }catch(error){
        res.status(500).json({
            message: 'Failed to send message',
            error : error.message
        })
    }
})

app.get('/', (req, res)=>{
    res.render('smspage');
})

app.listen(3001, ()=>{
    console.log('server is started on port 3001');
})

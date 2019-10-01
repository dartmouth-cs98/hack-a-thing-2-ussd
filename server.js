const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
  res.send('Welcome to Simple USSD Mobile Wallet by Ally Mahmoud <allymahmoud64@gmail.com>')
})

app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  if (text == '') {
    // This is the first request. Note how we start the response with CON
    let response = `CON What would you want to check
    1. My Account
    2. My phone number`
    res.send(response)
  } else if (text == '1') {
    // Business logic for first level response
    let response = `CON Choose account information you want to view
    1. Account number
    2. Account balance
    3. Top Up balance`
    res.send(response)
  } else if (text == '2') {
    // Business logic for first level response
    let response = `END Your phone number is ${phoneNumber}`
    res.send(response)
  } else if (text == '1*1') {
    // Business logic for first level response
    let accountNumber = 'ACC1001'
    // This is a terminal request. Note how we start the response with END
    let response = `END Your account number is ${accountNumber}`
    res.send(response)
  } else if (text == '1*2') {
    // This is a second level response where the user selected 1 in the first instance
    let balance = '$7,000'
    // This is a terminal request. Note how we start the response with END
    let response = `END Your balance is ${balance}`
    res.send(response)
  } else if (text == '1*3') {
    // This is a second level response where the user selected 1 in the first instance
    let balance = '$7,000'
    // This is a terminal request. Note how we start the response with END
    let response = `Enter money to top up`
    res.send(response)
  }else if (text.startsWith('1*3*')) {
    // This is a second level response where the user selected 1 in the first instance
    const balanceArray = text.split('*');
    const balanceSplit = parseInt(balanceArray[2]);
    let balance = 7000;
    if (!isNaN(balanceSplit){
      balance+=balanceSplit;

    }
    // This is a terminal request. Note how we start the response with END
    let response = `Your New Balance is $${balance}`
    res.send(response)
  }


  else {
    res.status(400).send('Bad request!')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
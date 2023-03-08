const { response, application } = require('express')
const express = require('express')
const router = express.Router()
const { validateToken } = require('../middlewares/AuthMiddleware')
const { Users, Sequelize } = require('../models');
const bcrypt = require('bcryptjs')

let refreshTokens = []

const { sign, verify } = require('jsonwebtoken')

var bodyParser = require('body-parser');
router.use(bodyParser.json());



router.post("/sign",  async (req, res) => {

    let {nome, cognome, email, telefono, corso_interesse, pwd } = req.body

    await bcrypt.genSalt(10,  (err, salt) => {
        bcrypt.hash(pwd, salt, async (err, hash) => {
            
            await Users.create({
                nome: nome,
                cognome: cognome,
                email: email,
                telefono: telefono, 
                corso_interesse: corso_interesse,
                pwd: hash
            }).then((response) => {
                console.log(response)
                res.json({
                    status: true,
                    data: response
                })
            }).catch(err => {
                res.json({
                    status: false,
                    err: err
                })
            })
        })
    })
})

router.post('/login', async (req, res) => {

    let { email, pwd } = req.body

    const user = await Users.findOne({
        where: { email: email}
    })

    if (!user) {
        res.json({
            status: false,
            err: "L'email non corrisponde a nessun utente registrato."
        })
    } else {
        bcrypt.compare(pwd, user.pwd).then(async (match) => {
            if (!match) {
                res.json({
                    status: false,
                    err: "Combinazione di email e password non valida."
                })
            } else {

                const User = await Users.findOne({ where: { email: email}})
                
                const accessToken = sign({ 
                    userId: User.id,
                }, "access", { expiresIn: '20s'})

                const refreshToken = sign({
                    userId: User.id
                }, "refresh", { expiresIn: '7d'})


                refreshTokens.push(refreshToken)
                //if success then...
                res.json({
                    token: accessToken,
                    refreshToken: refreshToken
                })
            }
        })
    }

})


router.get('/user-info', validateToken, async (req, res) => {
    if (req.userId) {
        const User = await Users.findOne({ where: { id: req.userId}})
        res.json(User)
    } else {
        res.json({
            error: req.error
        })
    }
})


router.post('/renewAccessToken', (req, res) => {
    const refreshToken = req.body.token

    console.log(refreshToken)
    
    if (!refreshToken) {
        res.json({ error: "Sessione non valida. L'utente non è autenticato."})
    }

    verify(refreshToken, "refresh", (err, userId) => {
        if (!err) {
            const accessToken = sign({userId: userId}, 'access', { expiresIn: '20s'})
            res.json({ token: accessToken })
        } else {
            res.json({ error: "2 Sessione non valida. L'utente non è autenticato."})
        }
    })

    

})



module.exports = router
//middleware that we put inside router.post("/", MIDDLEWARE, (res, req))
// to check whether the token is valid or not
const {verify} =  require('jsonwebtoken')


const validateToken = (req, res, next) => {
    let accessToken = req.header('authorization')
    accessToken = accessToken.split(' ')[1]


    if (!accessToken) {
        req.error = "Utente non autenticato. Fare il login."
        return next()
    } 

    try {
        const validToken = verify(accessToken, "access")

        if(validToken) {
            console.log(validToken)
            req.userId = validToken.userId
            return next()
        }

    } catch(err) {
        req.error = "Token scaduto."
        return next()
    }
}


module.exports = { validateToken }
const router = require('express').Router();

router.post('/login', (req, res) => {
    res.send('login success');
});

router.post('/signup', (req,res)=>{
    res.send('signup success');
})


module.exports = router;
// This code defines the authentication routes for login and signup.
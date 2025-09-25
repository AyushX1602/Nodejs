const express = require('express');

const app = express();
app.use(express.json());

const users =[];

function generate_token(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    const tokenLength = 32;
    
    for (let i = 0; i < tokenLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }
    
    return token;
}

app.post('/signup', function(req,res){

    const username =req.body.username;
    const password =req.body.password;

     if(users.find(u=>u.username===username)){
        res.json({
            message: "user alredy exist"
        })
    return
    }

    users.push({
        username: username,
        password : password
    })
    res.json({
        message:"user created"
    })
console.log(users);
}
);

app.post('/signin', function(req,res){

        const username =req.body.username;
        const password =req.body.password;

        let founduser=null;

        for(let i=0;i<users.length;i++){
            if(users[i].username==username && users[i].password==password){
                founduser=users[i];
                break;
            }
        }
        if (founduser) {
            const token = generate_token();
            founduser.token=token;
            res.json({
                token:token
            })
        }else{
            res.status(403).send({
                message:"user not found"
            })
        }

        console.log(users);
});





app.listen(3000)
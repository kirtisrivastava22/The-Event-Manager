const express=require('express');
const app=express();
const path=require('path');
const PORT =process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.sendFile('./main/index.html',{root:__dirname});
    //OR res.sendfile(path.join(__dirname,'views','index.html'));
});


app.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile('./main/index.html',{root:__dirname});
    //OR res.sendfile(path.join(__dirname,'views','index.html'));
});

//(.html)? means .html is not needed

app.get('/login(.html)?',(req,res)=>{
    res.sendFile('./main/login.html',{root:__dirname});
    //OR res.sendfile(path.join(__dirname,'views','index.html'));
});


app.get('/corporate(.html)?',(req,res)=>{
    res.sendFile('./main/corporate.html',{root:__dirname});
    //OR res.sendfile(path.join(__dirname,'views','index.html'));
});


app.get('/noncorporate(.html)?',(req,res)=>{
    res.sendFile('./main/noncorporate.html',{root:__dirname});
    //OR res.sendfile(path.join(__dirname,'views','index.html'));
});




app.use(express.static(path.join(__dirname,'main')));

app.listen(PORT,() => console.log(`SERVER IS RUNNING ON PORT ${PORT}`)); 
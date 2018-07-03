var MongoClent=require('mongodb').MongoClient;
var util=require('util');
var express=require('express');
var crypto=require('crypto');

var app=express();
var port=4000;
var mySecreteMsg;

var myPromise=util.promisify(MongoClent.connect);
myPromise('mongodb://127.0.0.1:27017/mySecretDB').then(function(client){
    const db=client.db('mySecretDB');
    db.collection('homework7').findOne({},function(err,data){
        if(err) throw err;
        mySecreteMsg=data.message;
        client.close();
    });

}).catch(err=>{console.log('Error: ',err)});

app.get('/secret',function(req,res){
    var myKey = crypto.createDecipher('aes256', 'asaadsaad');
     var myString = myKey.update(mySecreteMsg, 'hex', 'utf8')
     res.send(myString)
});

app.listen(port,()=>{
    console.log('Server is running on port %s',port);
})
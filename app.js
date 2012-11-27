var express = require('express'),
    app = express()
    util  = require('util'),
    rest = require('restler')
    access_token = null;
    
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.post('/textMe', function(req, res) {
    rest.post('https://api.att.com/rest/sms/2/messaging/outbox', {
            data: {
                "Address": "tel:8588228604",
                "Message": req.body.name + ": " + req.body.message
            },
            headers: {
                "Authorization": "BEARER " + access_token
            }
        }).on('complete', function(data) {
            console.log(data);
            res.send(200);
    });
});

app.post('/getText', function(req, res) {
    rest.post('https://api.att.com/rest/1/MyMessages', {
            data: {
                Addresses: 'tel:' + req.body.number.replace(/-/g, "").replace(/ /g, "").replace("tel:", "").replace("(","").replace(")",""),
                Text: 'Hello, you are receiving this from my personal number. You can reply to this message to contact me (task 4).',
                Subject: '',
                Group: false
            },
            headers: {
                "Authorization": "BEARER c0f1db35f658ad2c70496ded98990779"
            }
        }).on('complete', function(data) {
            console.log(data);
            res.send(200);
    });
});

app.get('/locateMe', function(req, res) {
    rest.get('https://api.att.com/2/devices/location?requestedAccuracy=10000&acceptableAccuracy=10000&Tolerance=DelayTolerant', {
            headers: {
                "Authorization": "BEARER c0f1db35f658ad2c70496ded98990779"
            }
        }).on('complete', function(data) {
            console.log(data);
            res.send(data);
    });
});

rest.post('https://api.att.com/oauth/token', {
    data: {
        "client_id": "42d5fa46a2b4df9376e3eb68996d5b8b",
        "client_secret": "75a316ff9b55681b",
        "scope": "SMS,SPEECH,PAYMENT,CCS",
        "grant_type": "client_credentials"
    }
}).on('complete', function(data) {
    console.log(data);
    access_token = data.access_token;
});

// Listen only from localhost, since this will be routed through a local Nginx proxy
app.listen(8084);

console.log('Started up successfully.');

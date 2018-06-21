const io = require('../index').io;
const request = require('request');
const crypto = require('crypto');
const fs =require('fs');
const env = require('../config/env/env');

const Chat = require('../models/chatMessage');

module.exports = (client) => {
    console.log("[*] Client connected");

    let pubkey; //  = fs.readFileSync('./test_keys/bob/pubkey.pem').toString();
    client.on('authenticate', (username, hash, token) => {
        // get public key from TruYou server
        const options = {
            url: "http://"+env.truYou_api+":"+env.truYou_api_port+'/api/v1/users/'+username,
            headers: {
                'token': token
            }
        };
        request.get(options, (err, response, body) => {
            if(err) {
                // If there's an error log it, and notify the user.
                console.log(err);

                client.emit('error', 'couldn\' retreive public key');
                client.disconnect();
                return;
            }

            // Retreive public key from body
            const o = JSON.parse(body);
            pubkey = o.publicKey.toString();
            console.log(pubkey)

            // Check Hash
            if(checkHash(hash, username)) {
                client.emit('authenticate', "Success");
            } else {
                client.emit('error', 'Invalid hash');
            }
        })
    });

    // subscribe to room
    client.on('subscribe', (id, hash) => {
        if(checkHash(hash, id)) {
            client.join(id);
        } else {
            client.emit('error', "Incorrect Hash");
        }
    });

    // chat message subject: send a roomID, username and message.
    // then emits it it to all other sockets in the room.
    client.on('chat message', (id, username, msg, hash, timestamp) => {
        if(checkHash(hash, username)) {
            io.to(id).emit('chat message', id, username, msg, timestamp);
            Chat.create({
                username: username,
                chatroom: id,
                message: msg,
                timeStamp: timestamp,
                hash: hash
            })
                .then((message)=>{})
                .catch(err => console.log(err));
        } else {
            client.emit('error', 'Incorrect Hash');
        }
    });

    // unsubscribe from room
    client.on('unsubscribe', (id, hash) => {
        if(checkHash(hash, id)) {
            client.leave(id);
        } else {
            client.emit('error', "Incorrect Hash");
        }
    });

    function checkHash(encHash, string) {
      console.log(encHash)

        // Decrypt hash
        console.log("before hashcheck")
        //console.log(pubkey)
        //let hash = crypto.publicDecrypt(pubkey, encHash);
        // create hash from string

        //console.log(hash.toString())

        console.log('decrypted hash')
        const newHash = crypto.createHash('sha256').update(string).digest('hex');

        console.log(newHash)
        // return check
        return newHash === encHash;
    }
};

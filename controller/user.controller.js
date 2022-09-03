const fs = require('fs');
const { reset } = require('nodemon');

module.exports.getAllUsers = (req, res) => {
    const limit = req.query.limit;
    fs.readFile('users.json', (err, data) => {
        if (err) throw err;
        let dataParsed = JSON.parse(data);
        res.send(dataParsed.slice(0, limit))
    })
}
module.exports.getRandomUser = (req, res) => {
    fs.readFile('users.json', (err, data) => {
        if (err) throw err;
        let dataParsed = JSON.parse(data);
        const random = Math.floor(Math.random() * dataParsed.length);
        console.log(random)
        res.send(dataParsed[random])
    })
}

module.exports.saveAUser = (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    if (newUser.Id && newUser.gender && newUser.contact && newUser.address && newUser.name && newUser.photoUrl) {
        fs.readFile('users.json', (err, data) => {
            if (err) throw err;
            let dataParsed = JSON.parse(data);
            dataParsed.push(newUser);
            let newData = JSON.stringify(dataParsed, null, 2)
            fs.writeFile('users.json', newData, (err) => {
                if (err) throw err;
                fs.readFile('users.json', (err, data) => {
                    if (err) throw err;
                    let dataParsed = JSON.parse(data);
                    res.send(dataParsed);
                })
            })
        })
    }
    else {
        res.send("All the required properties are not present.")
    }
}

module.exports.updateAUser = (req, res) => {
    const Id = req.params.id;
    const userData = req.body;
    if (!isNaN(Id)) {
        fs.readFile('users.json', (err, data) => {
            if (err) throw err;
            let dataParsed = JSON.parse(data);
            const matchedUser = dataParsed.find(user => user.Id == Id);
            if (matchedUser) {
                matchedUser.name = userData.name;
                matchedUser.address = userData.address;
                matchedUser.contact = userData.contact;
                matchedUser.photoUrl = userData.photoUrl;
                matchedUser.gender = userData.gender;
                let newData = JSON.stringify(dataParsed, null, 2)
                fs.writeFile('users.json', newData, (err) => {
                    if (err) throw err;
                    fs.readFile('users.json', (err, data) => {
                        if (err) throw err;
                        let dataParsed = JSON.parse(data);
                        res.send(dataParsed);
                    })
                })
            }
            else {
                res.send("Not valid ID!!!")
            }

        })
    }
    else {
        res.send("Not valid ID!!!")
    }
}

module.exports.bulkUpdate = (req, res) => {
    const Ids = req.body;
    if (Ids.length) {
        fs.readFile('users.json', (err, data) => {
            if (err) throw err;
            let dataParsed = JSON.parse(data);
            Ids.forEach(element => {
                const matchedUser = dataParsed.find(user => user.Id == element)
                matchedUser.address = "Gopalgonj"
            });
            let newData = JSON.stringify(dataParsed, null, 2)
            fs.writeFile('users.json', newData, (err) => {
                if (err) throw err;
                fs.readFile('users.json', (err, data) => {
                    if (err) throw err;
                    let dataParsed = JSON.parse(data);
                    res.send(dataParsed);
                })
            })
        })
    }
    else {
        res.send("Not valid Input!!!")
    }
}

module.exports.deleteAUser = (req, res) => {
    const Id = req.params.id;
    if (!isNaN(Id)) {
        fs.readFile('users.json', (err, data) => {
            if (err) throw err;
            let dataParsed = JSON.parse(data);
            const matchedUser = dataParsed.find(user => user.Id == Id);
            if (matchedUser) {
                const updatedCollection = dataParsed.filter(user => user.Id != Id)
                let newData = JSON.stringify(updatedCollection, null, 2)
                fs.writeFile('users.json', newData, (err) => {
                    if (err) throw err;
                    fs.readFile('users.json', (err, data) => {
                        if (err) throw err;
                        let dataParsed = JSON.parse(data);
                        res.send(dataParsed);
                    })
                })
            }
            else {
                res.send("Not valid ID!!!")
            }

        })
    }
    else {
        res.send("Not valid ID!!!")
    }
}
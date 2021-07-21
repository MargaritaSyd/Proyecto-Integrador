const bcryptjs = require('bcryptjs');

let encryptedPassword = bcryptjs.hashSync(req.body.password , 10)




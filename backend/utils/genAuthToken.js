const jwt = require("jsonwebtoken");

const genAuthToekn = (user) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
        {
        _id: user._id, 
        firstname: user.firstname, 
        lastname: user.lastname, 
        email: user.email,
        isAdmin: user.isAdmin,
    },
    jwtSecretKey 
    );

    return token;
}

module.exports = genAuthToekn
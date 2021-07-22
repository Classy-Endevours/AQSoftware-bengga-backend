const passport = require('passport');
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const {User} = require('../models/index.js');

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.jwt_token_signing_key,
            issuer: process.env.jwt_token_issuer
		},
		(jwtPayload, cb) => {
            User.findAll({
                where : {
                    id:jwtPayload.id
                }
            })
            .then((user)=> {
                cb(null, user.length? user[0]: null)
            })
            .catch((err) => console.log(err) || cb(err))}
	)
);
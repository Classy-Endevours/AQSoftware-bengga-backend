const passport = require('passport');
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const db = require('../models/index.js');

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.jwt_token_signing_key,
            issuer: process.env.jwt_token_issuer
		},
		(jwtPayload, cb) => 
            db.sequelize.query('CALL spSelect_UserById (:in_id)', { 
                replacements: { 
                    in_id: jwtPayload.id
                }
            })
            .then((user)=> {
                cb(null, user.length? user[0]: null)
            })
            .catch((err) => console.log(err) || cb(err))
	)
);
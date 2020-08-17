// module.exports = function () {
//     return function secured (req, res, next) {
//         if (req.user) { return next(); }
//         req.session.returnTo = req.originalUrl;
//         res.redirect('/login');
//     };
// };
// import * as JWT from "jsonwebtoken";
//
// app.use(function(req,res,next) {
//     JWT.verify(req.cookies['token'], 'JWT_SECRET', function(err, decodedToken) {
//         if(err) { /* handle token err */ }
//         else {
//             req.userId = decodedToken.id;   // Add to req object
//             next();
//         }
//     });
// });
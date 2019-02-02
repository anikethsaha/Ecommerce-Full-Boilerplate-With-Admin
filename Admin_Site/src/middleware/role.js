module.exports = {
    isSuperAdmin: (req, res, next) => {

        if ( req.isAuthenticated() && req.user.role_type != "super_admin") {
            res.send("NOT ALLOWED")
        } else {
            next();
        }

    },
    isCcare: (req, res, next) => {

        if (req.isAuthenticated() && req.user.role_type != "Ccare") {
            res.send("NOT ALLOWED")
        } else {
            next();
        }

    }
}
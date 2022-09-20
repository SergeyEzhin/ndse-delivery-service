module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated && req.isAuthenticated()) {
            return next();
        }

        // res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            return next();
        }
        // res.redirect('/users/profile');
    }
}
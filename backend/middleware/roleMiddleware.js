module.exports = function(roles) {
    return function(req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            // req.user додається нашим authMiddleware
            const { role: userRole } = req.user;
            let hasRole = false;
            if (roles.includes(userRole)) {
                hasRole = true;
            }

            if (!hasRole) {
                return res.status(403).json({ message: "У вас немає доступу" });
            }
            next();
        } catch (e) {
            console.log(e);
            return res.status(403).json({ message: "Помилка доступу" });
        }
    }
};
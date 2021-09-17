
const checkRole = (permission) => {
    return (req, res, next) => {
        const userRole = req.user.role
        if(permission.includes(userRole)){
            next()
        } else {
            return res.status(401).send("You dont have permission")
        }
    }
};


export default checkRole;


const canModify = (role)=>{
    return async (req,res,next)=>{
        const fetchedRole = req.user.role
        if(role===fetchedRole){
            next()
        }
        else{
            return res.json('you are not premietted to this')
        }
    }
}

exports.canModify = canModify





class auth{

    static async isLoggedIn(req,res,next){
     try {
        if(!req.user){
            res.redirect('/auth/login')
         }
    
         next()
     } catch (error) {
        console.log(error);
     }
    }
}


module.exports = auth

const AdminMiddlewares = (req,res,next) => {
     try {
          const perfil = req.user.perfil

          if (perfil != 'admin') {
               return res.status(400).json({
                    "error": "Voce não possui autorização suficiente para essa ação"
               })
          }

          next()
     } catch (error) {
          return res.status(400).json({
               "error": error.message
          })
     }
}

export default AdminMiddlewares
// const User = require('../model/user.js');

// const UserController = {
//     createUser: async (socket,userData) => {
//         try{
//             const newUser = await User.create(userData);
//             socket.to(socket.id).emit('user-created',{message:`New user ${newUser} has been created Successfully `})
//         }catch(e){
//             console.error(`An error occurred ${e.message}`);
//             socket.to(socket.id).emit('user-creation-failed',{message:`An error occured while creating creating user ${e.message} `})
//         }
//     }
// }


// module.exports = {UserController};



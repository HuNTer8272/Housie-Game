      const PORT = 4000;
      const express = require("express");
      const Razorpay = require('razorpay');
      const http = require('http')
      const {Server} = require('socket.io');
      const cors = require('cors');
      const {filterBadWords} = require('./Helper/Helper');
      const passport = require("passport");
      const { v4: uuidv4 } = require('uuid');

      const cookieSession = require("cookie-session");

      const mysql = require("mysql");
      const session = require("express-session");
      const multer = require("multer");
      const path = require("path");
      const OAUth2Strategy = require("passport-google-oauth2").Strategy
      const { createConnection } = require('mysql');
      const { diskStorage } = require('multer');
      const { error } = require("console");

      const app = express();
      const clientid = "911320807195-eee2c555j1ad9v8349i45d23gtcvib8j.apps.googleusercontent.com";
      const clientsecret = "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";
        
      app.use(express.json());

      app.use(cors());



      const db = createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"housie-game"
      })

      db.connect(function(err){
        if(err){
          console.log("Error in connection",err)
        }else{
          console.log("connected")
        }
      })

      // const storage = diskStorage({
      //   destination: (req, file, cb) =>{
      //     db(null, 'public/uploads')
      //   },
      //   filename: (req, file, cb) => {
      //     db(null, file.fieldname + "_"+ Date.now() + extname(file.originalname));
      //   }
      // })

      // const upload = multer({
      //   storage:storage
      // })

      

   /*  
      !Old login code  
       app.post('/storeProfileData', upload.single('profileImage'), (req, res) => {
        const { UserId, userId, email, name, picture, password } = req.body;
        const profileImage = picture // Get the filename from multer

        // Check if the user already exists based on UserId or UserEmail
        const checkUserSql = 'SELECT * FROM users WHERE UserEmail = ? OR UserId = ?';
        db.query(checkUserSql, [email, UserId || userId], (checkUserErr, checkUserResult) => {
          if (checkUserErr) {
            console.error('Error checking user existence:', checkUserErr);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }

          // If user exists, update the existing record
          if (checkUserResult.length > 0) {
            const updateUserSql = 'UPDATE users SET UserName = ?, UserPic = ?, UserPass = ? WHERE UserEmail = ?';
            db.query(updateUserSql, [name, profileImage, password, email], (updateUserErr, updateUserResult) => {
              if (updateUserErr) {
                console.error('Error updating profileData:', updateUserErr);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
              }

              console.log('ProfileData updated in the database:', updateUserResult);
              res.json({ success: true });
            });
          } else {
            // If user doesn't exist, insert the new record
            const insertUserSql = 'INSERT INTO users(UserId, UserName, UserPic, UserEmail, UserPass) VALUES (?, ?, ?, ?)';
            db.query(insertUserSql, [UserId || userId, name, profileImage, email, password], (insertUserErr, insertUserResult) => {
              if (insertUserErr) {
                console.error('Error storing profileData:', insertUserErr);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
              }

              console.log("Profile Image:",profileImage);
              console.log('ProfileData stored in the database:', insertUserResult);
              res.json({ success: true });
            });
          }
        });
      });
        
        app.post('/login', (req, res) => {
          const { email, password } = req.body;
        
          // Check the user's credentials against the database
          const sql = 'SELECT * FROM users WHERE UserEmail = ? AND UserPass = ?';
          db.query(sql, [email, password], (err, results) => {
            if (err) {
              console.error('Error querying the database:', err);
              res.status(500).json({ success: false, message: 'Internal Server Error' });
              return;
            }
        
            if (results.length > 0) {
              res.json({ success: true });
            } else {
              res.json({ success: false });
            }
          });
        });

        app.post('/logout', (req,res) => {
          res.json({success:true});
        })

        app.get('/userData', (req, res) => {
          const userEmail = req.query.userEmail; // Extract userId from the query parameter
        
          // Replace with your actual user data retrieval logic using a SQL query
          const sql = 'SELECT * FROM users WHERE UserEmail = ?';
          db.query(sql, [userEmail], (err, results) => {
            if (err) {
              console.error('Error querying the database:', err);
              res.status(500).json({ error: 'Internal Server Error' });
              return;
            }
        
            if (results.length > 0) {
              // Assuming you have a single user with the given ID
              const user = results[0];
              const userData = {
                image: user.UserPic,
                name: user.UserName,
                email: user.UserEmail,
                rank: user.UserRank,
              };
              res.json(userData);
            } else {
              res.status(404).json({ error: 'User not found' });
            }
          });
        }); */

        app.get('/',(req,res) => {
          res.send('Backend server for houise game');
        })

      /* Game functionality */

      // this array will contain the all the instances of class Rooms 
      const roomInstance = [];


      /*
        *The Main function that will fetch the appropriate class instance
        !This was causing the hasBinary issue becuase of find method (linear search recursive nature)   
      // const fetchRoomInstance = (roomId) => {
      //   let room = roomInstance.find((room) => room.roomId === roomId);
      //   return room ? room.instance : null;
      // };
    */
    
      /*
        *The Main function that will fetch the appropriate class instance
        ?roomid:string
      */
      const fetchRoomInstance = (roomId) => {
        // gaurd clause for if the roomId is null 
        if(!roomId){
          return null;
        }
        // gaurd clause for if the roomInstance[] is empty
        if(roomInstance.length === 0){
          return null;
        }
        // looping through every room
        for(let room in roomInstance){
          if(roomInstance[room].roomId === roomId){
            return roomInstance[room].instance?roomInstance[room].instance:null;
          }
        }
        // return null if the room is not found
        return null;
      };


      // Function to create the an instance of class Room
      // ?{roomId:string,visibility:string,size:number,name:string}
      const createRoom = ({roomId,visibility='public',size=5,name}) => {
        //?type:true|false
        let doesRoomExist;
        // Find if the room exists or not
        for(let room in roomInstance){
          if(roomInstance[room].roomId === roomId){
            doesRoomExist = roomInstance[room].instance?true:false;
            break;
          }
        }
        // Check if the room with the same ID already exists
        if(doesRoomExist){
          console.log("Room Already Exist");
          return 0;
        }
        //Else create the new room and append it
        let room = new Rooms({roomId,visibility,size,name});
        roomInstance.push({ roomId: roomId, instance: room });
        return 1;
        //  console.log(roomInstance);
      };

      // ?visibility:string
      const fetchAllSpecifiedRoom = (visibility) => {
        const specifiedRoom=[];
        for(let rooms in roomInstance){
          if(roomInstance[rooms].instance.visibility === visibility){
            specifiedRoom.push(roomInstance[rooms].instance);
          }
        }
        return specifiedRoom
      }

      // fetch all rooms 
      const fetchAllRooms = () => {
        return roomInstance.map(room => room.instance)
      }

      // Class for handling all the room data and functions
      class Rooms {
        // class constructor for initializing the room
        constructor({roomId,visibility,size,name}) {
          this.roomId = roomId;
          this.participants = [];
          this.useNumber = [];
          this.time = 0;
          this.name = name
          this.visibility = visibility;
          this.size = size
          this.clock;
          this.code = this.visibility === 'private'?uuidv4():null;
        }

        // return the generated code for joining the room 
        showCode(){
          return this.code;
        }

        // ?uid:string
        deleteParticipants = (uid) => {
        /*
          *Finding the specified users from the participants[] 
          *finding the index of the user from the participants 
          ?user:[{}]
          ?indexOfUser:number
        */
          let user;
          let indexOfUser = -1 ;
          // Finding the user index and user from particiapants[]
          for(let i=0;i<this.participants.length;i++){
            if(this.participants[i].uid === uid){
              user = this.participants[i];
              indexOfUser = i;
              break;
            }
          }
          if(indexOfUser === -1){
            console.log(`The user doesnt exist in the room ${this.roomId}`);
            return
          }
          // removing the user from the participants list 
          console.log(`The user ${user.name} has been removed from the chatroom ${this.roomId}`);
          this.participants.splice(indexOfUser,1)
          return user
        }

        // function to handle add Participant
        addParticipant(participant,code=null) {
          if(this.visibility === 'public'){
            return this.addParticipantPublic(participant)
          }

          return this.addParticipantPrivate(participant,code)
        }

        addParticipantPublic(participant){
          // if the room is full then dont add the new user 
          if(this.participants.length === this.size){
            console.log(`The Room ${this.roomId} is already full`);
            return 0
        }

        // gaurd clause: Check if there are less than 2 participants already
        if (!this.participants.length > 1) return 0;

        // check if the user already exist or not
        for (let i in this.participants) {
          if (this.participants.uid === participant.uid) {
            console.log("User already exist");
            return 0;
          }
        }

        // if all of the above condition is false then only add the Participant
        this.participants.push(this.participants.length === 0?{...participant,moderator:true}:participant);
        return 1; 
        }

        addParticipantPrivate(participant,code){
          // check the code is correct or not
          if(this.code !== code && this.participants.length>=1){
            console.log(`Invalid code, Can't add the new member `);
            return 0;
          }
          // if the room is full then dont add the new user 
          if(this.participants.length === this.size){
            console.log(`The Room ${this.roomId} is already full`);
            return 0
          }  
          // gaurd clause: Check if there are less than 2 participants already
          if (!this.participants.length > 1) return 0;  
          // check if the user already exist or not
          for (let i in this.participants) {
            if (this.participants.uid === participant.uid) {
              console.log("User already exist");
              return 0;
            }
          }  
          // if all of the above condition is false then only add the Participant
          this.participants.push(this.participants.length === 0?{...participant,moderator:true}:participant);
          return 1;   
        }

        // function to generate unique number for houise
        randomizer() {
          let randomNumber;
          /* generate random numbers until the generated number is not in the 
              usedNumber array        
            */
          do {
            randomNumber = Math.floor(Math.random() * 100) + 1;
          } while (this.useNumber.includes(randomNumber));
          // push the newly generated number in the usedNumber array
          this.useNumber.push(randomNumber);
          return randomNumber;
        }

        // function to fetch the top 3 player in the lobby
        fetchRankers() {
          // creating a copy of the og participant
          const newArr = this.participants;
          // sorting in the increasing order of score
          newArr.sort((a, b) => b.score - a.score);
          // to slice the array depending upon its length
          return newArr.slice(0, newArr.length > 3 ? 3 : newArr.length);
        }

        //function to handle the timer
        timer(socket) {
          if (this.time >= 33) {
              clearInterval(this.clock);
          } else {
              this.time++;
              console.log(this.time);
              socket.in(this.roomId).emit("timer", this.time);
          }
      }
      
      // Function to start the timer
      startTimer(socket) {
          this.clock = setInterval(() => this.timer(socket), 1000);
      }
              //increament the score of the participant
        increamentScore(uid,scoreToAdd){

          // gaurd clause that check if the participant array is empty or not 
          if(!this.participants.length === 0){
            console.log(`There are no participant in the room ${this.roomId}`);
            return ;
          }

          //Find the user and add the score  
          for(let member in this.participants){
              if(this.participants[member].uid === uid){
                this.participants[member].score += scoreToAdd;
                return 
              }
          }
          
        }

        fetchParticipants() {
          return this.participants;
        }
        
      }

      //  Main code for the backend 

      const server = http.createServer(app);


      // cors is used  to specify from which port the backend will be used
      const io = new Server(server,{
          cors:{
              origin: "http://localhost:3000",
              methods: ["*"],    
          },
      });

      const razorpay = new Razorpay({
          key_id: 'rzp_test_CtWF9px27auejT',
          key_secret: 'bq0MlnI7DKkwwewipJR56MGy',
      }); 

      // all the backend routes here
      io.on('connection',(socket) => {
        console.log(`user has connected to the server: ${socket.id}`);
   
        // !emit signup-completed not working
        socket.on('sign-up', (data) => {
          // Check if the user exists or not
          console.log('Storing the data in the database...');
          const checkUserSQL = `SELECT * FROM users WHERE email = ? OR userId = ?`;
          db.query(checkUserSQL, [data.email, data.uid], (checkUserSQLErr, checkUserSQLRes) => {
              if (checkUserSQLErr) {
                  console.log(`Error checking user existence`, checkUserSQLErr);
                  return;
              }
      
              if (checkUserSQLRes.length > 0) {
                  const updateUserSQL = `UPDATE users SET userName = ?, password = ? WHERE email = ?`;
                  db.query(updateUserSQL, [data.name, data.password, data.email], (updateUserErr, updateUserResult) => {
                      if (updateUserErr) {
                          console.error(`Error updating user information`, updateUserErr);
                          return;
                      }
                      socket.emit('signup-completed', { success: true, message: 'User signed up successfully' });
                      console.log('User data updated in the database:', updateUserResult);
                      return;
                  });
              } else {
                  // If the user doesn't exist then add them
                  const insertSQL = 'INSERT INTO users(userId, userName, email, password, point, rank, photoURL) VALUES (?, ?, ?, ?, ?, ?, ?)';
                  db.query(insertSQL, [data.uid, data.name, data.email, data.password, data.point, data.rank, data.photoURL], (insertSQLErr, insertSQLResult) => {
                      if (insertSQLErr) {
                          console.error(`Error storing user`, insertSQLErr);
                          return;
                      }
                      socket.emit('signup-completed', { success: true, message: 'User signed up successfully' });
                      console.log("user instered in the database",insertSQLResult);
                  });
              }
          });
      });
      
      // !emit login-completed not working
      socket.on("login", (data) => {
        const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
        db.query(sql, [data.email, data.password], (err, results) => {
          if (err) {
            console.error('Error querying the database:', err);
            return;
          }
          
          if (results.length > 0) {
            console.log('User exists');
            console.log('login',results);
            socket.emit('login-completed', {  success: true, message: 'Login successful' });
          } else {  
            console.log('User does not exist');
            socket.emit('login-completed', { success: false, message: 'User does not exist',userData:results });
          }
        });
      });
            

      // * fetch-user data 
      // !profile-data emit is not working 
      socket.on('fetch-profile-data', (data) => {
        const sql = 'SELECT * FROM users WHERE email = ? OR userId = ?';
        db.query(sql, [data.email, data.userId], (err, res) => {
          if (err) {
            console.error('Error fetching profile data', err);
            return;
          }
      
          if (res.length > 0) {
            const userData = res[0]; // Assuming there's only one matching row
            console.log('profileData',userData);
            socket.emit('profile-data', { success: true, data: userData });
          } else {
            console.log('User does not exist');
            socket.emit('profile-data', { success: false, message: 'User does not exist' });
          }
        });
      });

      // * change user profile
      // !change-profile emit is not working
      socket.on('change-profile', (data) => {
        console.log(data);
        const sql = 'SELECT * FROM users WHERE email = ? OR userId = ?';
        db.query(sql, [data.email, data.uid], (err, res) => {
          if (err) {
            console.log('Error fetching profile data', err);
            return;
          }
      
          if (res.length > 0) {
            const updateProfileSQL = `UPDATE users SET userName = ?, photoURL = ? WHERE email = ? OR userId = ?`;
            db.query(updateProfileSQL, [data.name, data.photoURL, data.email, data.uid], (updateProfileErr, updateProfileResult) => {
              if (updateProfileErr) {
                console.error('Error updating profileData:', updateProfileErr);
                return;
              }
              console.log('User profile updated successfully');
              console.log("update query result:",updateProfileResult);
              // Emit success event
              socket.emit('profile-data', { success: true, message: 'Profile updated successfully' });
            });
          }
        });
      });
      
      socket.on('store-customisation', (data) => {
        console.log(data);
        const sql = 'SELECT * FROM users WHERE email = ? OR userId = ?';
        db.query(sql, [data.email, data.uid], (err, res) => {
          if (err) {
            console.log('Error fetching profile data', err);
            return;
          }
      
          if (res.length > 0) {
            const updateProfileSQL = `UPDATE users SET fontStyle = ?, ticketImage = ? WHERE email = ? OR userId = ?`;
            db.query(updateProfileSQL, [data.fontStyle, data.ticketImage, data.email, data.uid], (updateProfileErr, updateProfileResult) => {
              if (updateProfileErr) {
                console.error('Error updating profileData:', updateProfileErr);
                return;
              }
              console.log('User profile updated successfully');
              console.log("update query result:",updateProfileResult);
              // Emit success event
              socket.emit('profile-data', { success: true, message: 'Profile updated successfully' });
            });
          }
        });
      });
      

      // For handling room join
      /*
        data = {roomId,visibility,size,partipant:{name,uid,roomId}} 
      */
      socket.on('joined-room', (data) => {
        // gaurd clause for if the data recieved by the frontend is empty 
        if(!data){
          console.log(`The data recieved is empty`);
          return
        }
        console.log(data);
        // main join logic z
        try{
        
        createRoom({roomId:data.roomId, visibility: data.visibility || 'public', size: data.size || 5,name:data.roomName})
        let currentRoomInstance = fetchRoomInstance(data.roomId);
        console.log(fetchAllRooms());
        let joinStatus = currentRoomInstance.addParticipant(data.participant,data.code||null);
        
        if(!joinStatus){
            console.log(`Couldn't join the user ${data.participant.name} into the room ${data.roomId} due to some error`);
            return ;
        }

        socket.join(data.roomId);
        // Broadcast the message to other users
        //  socket.broadcast.to(data.roomId).emit('receive-message', {
        //    sender: 'server',
        //    message: `${data.participant.name} has joined the room`,
        //    id: 'server'
        //  });
        socket.emit('send-all-rooms',fetchAllRooms());
        console.log('sending frontend the room code ',currentRoomInstance.showCode());
        io.to(data.roomId).emit('send-code',currentRoomInstance.showCode())

        console.log(`the user${data.participant.name} has successfully joined the room${data.roomId}`);

        }catch(e){
          console.log(`An error error occured ${e} `);
        }
      });

      socket.on('get-all-rooms',() => {
        console.log('sending all rooms to the frontend ');
        socket.emit('send-all-rooms',fetchAllRooms());
      })

          // For sending participants of specified room id 
          socket.on('get-participants',(roomId) =>{
              let currentRoomInstance = fetchRoomInstance(roomId);
              if(currentRoomInstance === null){
                  socket.emit("error-room-instance", `Cant find the room instance`);
                  return ;
              };

              io.to(roomId).emit("participants-data", currentRoomInstance.fetchParticipants());
              
              console.log(`participant in the room `);
              console.log(currentRoomInstance.fetchParticipants());

          });

        // handle the message send feature 
  socket.on('send-message', (data) => {
    console.log('message data');
    console.log(data);
    const msgStruct = {
      sender:data.name,
      message:filterBadWords(data.message),
      id:data.uid,
      // timestamp:date.toLocaleTimeString()
    }
    io.in(data.roomId).emit('receive-message',msgStruct);
  });

          // Generate random number for housie 
          socket.on('send-number', (roomId) => {
              let currentRoomInstance = fetchRoomInstance(roomId);
              if(currentRoomInstance === null){
                  socket.emit("error-room-instance", `Cant find the room instance`);
                  return ;
              };
          
              let generatedNumber = currentRoomInstance.randomizer();
              //Emit the generated number to the frontend   
              io.in(roomId).emit("get-number",generatedNumber);
              console.log(`Sending the generated number ${generatedNumber} to the frontend `);
          });

          // Handle row-1 complete
          socket.on('row-1', (data) => {
              let currentRoomInstance = fetchRoomInstance(data.roomId);
              if(currentRoomInstance === null){
                  socket.emit("error-room-instance", `Cant find the room instance`);
                  return ;
              };
              // increment the score from here  
              currentRoomInstance.increamentScore(data.uid,50);

              const dataObj={
                  message:`User ${data.participant.name} has completed the first row`,
                  uid:data.uid
              }

              io.in(data.roomId).emit('row-1-completed',dataObj);
              io.in(data.roomId).emit('participants-data',currentRoomInstance.fetchParticipants());     
          });

          // Handle row-2 complete
          socket.on('row-2', (data) => {
              let currentRoomInstance = fetchRoomInstance(data.roomId);
              if(currentRoomInstance === null){
                  socket.emit("error-room-instance", `Cant find the room instance`);
                  return ;
              };
              // increment the score from here  
              currentRoomInstance.increamentScore(data.uid,50);

              const dataObj={
                  message:`User ${data.participant.name} has completed the second row`,
                  uid:data.uid
              }

              io.in(data.roomId).emit('row-2-completed',dataObj);
              io.in(data.roomId).emit('participants-data',currentRoomInstance.fetchParticipants());     
          });

          // Handle row-3 complete
          socket.on('row-3', (data) => {
              let currentRoomInstance = fetchRoomInstance(data.roomId);
              if(currentRoomInstance === null){
                  socket.emit("error-room-instance", `Cant find the room instance`);
                  return ;
              };
              // increment the score from here  
              currentRoomInstance.increamentScore(data.uid,50);

              const dataObj={
                  message:`User ${data.participant.name} has completed the third row`,
                  uid:data.uid
              }

              io.in(data.roomId).emit('row-3-completed',dataObj);
              io.in(data.roomId).emit('participants-data',currentRoomInstance.fetchParticipants());     
          });

          // Handle houise complete 
          socket.on('housie', (data) => {
              let currentRoomInstance = fetchRoomInstance(data.roomId);
              if(currentRoomInstance === null){
                  socket.emit("error-room-instance", `Cant find the room instance`);
                  return ;
              };

              // increment the score from here  
              currentRoomInstance.increamentScore(data.uid,200);
          
              const dataObj={
                  message:`User ${data.participant.name} has completed houise`,
                  uid:data.uid
              }
              
              io.in(data.roomId).emit('housie-completed',dataObj);
              io.in(data.roomId).emit('participants-data',currentRoomInstance.fetchParticipants());     
              
          });

          // For handling payment 
          socket.on('payment', async (amount) => {
            console.log(`Got the Emit from the frontend now processing it , the amount is :${amount}`);
            try{
              const order = await razorpay.orders.create({
                  amount: amount * 100,
                  currency:"INR",
                  receipt:"receipt#1",
              });
              io.to(socket.id).emit('payment-sucess',{sucess:true,order,amount});
              console.log("Processing Complete the payment is now sucessful");
            } catch(e){
              console.error(`An error occured ${e.message}`);
              io.to(socket.id).emit('payment-failure', { success: false, error: e.message });
              console.log(`Processing Complete, transaction failed due to ${e.message}`);
            }
          });

          socket.on('ticket-completed', (data) => {
              let currentRoomInstance = fetchRoomInstance(data.roomId);
              if(currentRoomInstance === null){
                  socket.emit("error-room-instance", `Cant find the room instance`);
                  return ;
              };
              
              // add 10 points to the score   
              currentRoomInstance.increamentScore(data.uid,10);
              io.to(data.roomId).emit('participants-data',currentRoomInstance.fetchParticipants());
          });

          socket.on('ticket-checked', (data) => {
              let currentRoomInstance = fetchRoomInstance(data.roomId);
              if(currentRoomInstance === null){
                  socket.emit("error-room-instance", `Cant find the room instance`);
                  return ;
              };
              
              console.log(data);
              // add 10 points to the score   
              currentRoomInstance.increamentScore(data.uid,10);
              io.to(data.roomId).emit('participants-data',currentRoomInstance.fetchParticipants());
          });


          socket.on('game-over',(data) => {
              let currentRoomInstance = fetchRoomInstance(data.roomId);
              if(currentRoomInstance === null){
                  socket.emit("error-room-instance", `Cant find the room instance`);
                  return ;
              };

              //Fetch the top 3 players from the lobby   
              const rankers = currentRoomInstance.fetchRankers();
              io.in(data.roomId).emit('show-rankers',rankers);
          });


        //  
        socket.on('start-game',(roomId) =>{
          console.log('emiting the game-join event');
          console.log(roomId);
          io.to(roomId).emit('game-join');
        })

          // start the timer for the particular room 
          socket.on('start-timer', (roomId) => {
            console.log(roomId);
              let currentRoomInstance = fetchRoomInstance(roomId);
              if(currentRoomInstance === null){
                  socket.emit("error-room-instance", `Cant find the room instance`);
                  return ;
              };

              // starting the timer   
              currentRoomInstance.startTimer(socket);
          })

          // send the room code to the frontend 


          // remove participants from the list
          /*
            data={ roomId, uid}  
          */  
          socket.on('remove-participant', (data) => {
            let currentRoomInstance = fetchRoomInstance(data.roomId);
            if(currentRoomInstance ===  null){
              socket.emit("error-room-instance", `Cant find the room instance`);
              return ;
            }

            //  deleting the user from the list  
            let deletedUser =currentRoomInstance.deleteParticipants(data.uid)     
            io.in(data.roomId).emit('user-deleted',deletedUser);   
          });

          
          socket.on('fetch-specified-room',(visibility) => {
            // sending all the specified rooms to the frontend 
            if(fetchAllSpecifiedRoom(visibility).length > 0){
              socket.emit('specified-room',fetchAllSpecifiedRoom(visibility));
            }
          });

      });



      server.listen(PORT || 8000, () => {
          console.log(`Server is running on port: http://localhost:${PORT || 8000}`);
      });

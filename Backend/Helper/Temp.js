/* Logic for creating the class for room id '
   
   *The constructor should take the roomid and check if the room exist or not
   and if it does then append the new user into the room else create a new room 
   and append them

   *Data Members
    1.Participants : for managing all the participants across multiple room
    2.Rooms: For manageming all the different room for now mainly store the roomID
    3.usedNumber: manage All the number that has been send from the backend to a particular room
    4.Date: A date object
    5.clock: a clock object for managing the clock for all the room 
    6.timer: the variable that define the timer for all the different room 
   
   *Functions for room 
   0.Connection
   1.Creating a room
   2.Join room
   3.Send Number 
   4.Send Message
   5.Fetch Participants 
   6.Start Timer 
   7.Row 1 completed
   8.Row 2 completed
   9.Row 3 completed
   10.Houise completed 
   11.Score Management Backend 
   
*/
const { ComputeSingleFaceDescriptorTask } = require('face-api.js');
const create = require('prompt-sync');
const { v4: uuidv4 } = require('uuid');


// this array will contain the all the instances of class Rooms 
const roomInstance = [];

// Function that will fetch the appropriate class instance
/*
  !This is causing the error  
*/
// const fetchRoomInstance = (roomId) => {
//   let room = roomInstance.find((room) => room.roomId === roomId);
//   return room ? room.instance : null;
// };


    /* 
     *New fetchroomInstance Method
     ?param: roomId:string 
     !roomInstance:[{roomId:string,instance:Room}]
     TODO: fix the recurive issue of this code 
    */

   const fetchRoomInstance = (roomId) => {
    /*
     *If the roomInstance is empty return null 
    */
     if(roomInstance.length === 0){
       return null
      }
      
      
      // looping through every room
      for(let room in roomInstance){
        if(roomInstance[room].roomId === roomId){
          return roomInstance[room].instance?roomInstance[room].instance:null;
        }
      }
      return null ;
    };

// Function to create the an instance of class Room

//  !Incursive error because of find 
const createRoom = ({roomId,visibility='public',size=5}) => {
  // ?params: true|false
  let doesRoomExist; 
 // *Find if the room exists or not  
 for(let room in roomInstance){
   if(roomInstance[room].roomId === roomId){
     doesRoomExist = roomInstance[room].instance?true:false;
     break;
   }
 }

  // check if there is already a room with the same ID
  if (doesRoomExist) {
    console.log("Room Already Exist");
    return 0;
  }

  //Else create the new room and append it
  let room = new Rooms({roomId,visibility,size});
  roomInstance.push({ roomId: roomId, instance: room });
  return 1;
  //  console.log(roomInstance);
};

// !Linear Search Error 
// const fetchAllSpecifiedRoom = (visibility) => {
//   const roomMap = new Map(roomInstance.map(room => [room.instance.roomId, room.instance]));
//   return Array.from(roomMap.values()).filter(room => room.visibility === visibility);
// };
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

const fetchAllRooms = () => {
  return roomInstance.map(room => room.instance);
}


/* Moderator functionalities */

class Rooms {
  // class constructor for initializing the room
  constructor({roomId,visibility,size}) {
    this.roomId = roomId;
    this.participants = [];
    this.useNumber = [];
    this.time = 0;
    this.clock;
    this.visibility = visibility;
    this.size = size;
    this.code = this.visibility==='private'?uuidv4():null;
  }

  showCode(moderatorUid){
     return this.participants[0].uid === moderatorUid? this.code:null;
  }

  // !Incursive error because of find 
  // TODO: fix this error we are encountering 
  deleteParticipants = (uid) => {
    /*
      *Finding the specified users from the participants[] 
      *finding the index of the user from the participants 
      ?type:[{}]
      ?type:number
    */
     let user;
     let indexOfUser = -1 ;
    for(let i=0;i<this.participants.length;i++){
      if(this.participants[i].uid === uid){
        user = this.participants[i];
        indexOfUser = i;
        break;
      }
    }
    if(indexOfUser === -1){
      console.log(`The user is not present in the given array`);
      return
    }
    // removing the user from the participants list 
    console.log(`The user ${user.name} has been removed from the chatroom ${this.roomId}`);
    this.participants.splice(indexOfUser,1)
    return user
  }


  fetchMember(uid){
    return this.participants.find(member => member.uuid === uid );
  }

  // function to handle add Participant
  addParticipant(participant,code='') {
    if(this.visibility==='public'){
      return this.addParticipantPublic(participant);
    }

    return this.addParticipantPrivate(participant,code);
  }

  // handle the functionality of handle user in public mode
  addParticipantPublic(participant){
     // if the room is full then dont add the new user 
     if(this.participants.length === this.size){
      console.log(`the room ${this.roomId} is already full`);
      return
   }

   // gaurd clause: Check if there are less than 2 participants already
   if (!this.participants.length > 1) return;

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

  // add participants func for private mode
  addParticipantPrivate(participant,code){
    // check the code is correct or not
    if(this.code !== code && this.participants.length>=1 ){
      console.log(`Invalid code, Cant add the new member`);
      return 0;
    }
      
    // if the room is full then dont add the new user 
    if(this.participants.length === this.size){
     console.log(`the room ${this.roomId} is already full`);
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
    if (this.time > 33) clearInterval(clock);
    time++;
    socket.in(this.roomId).emit("timer", time);
  }

  //function to start the timer
  startTimer() {
    this.clock = setInterval(this.timer, 60000);
  }

  //increament the score of the participant
  increamentScore(uid,scoreToAdd){

    // gaurd clause that check if the participant array is empty or not 
    if(!this.participants.length === 0 ){
      console.log(`There are no participant in the room ${this.roomId}`);
      return ;
    }

    //Find the user and add the score  
    //  this.participants.forEach(member => {
    //     if(member.uid === uid){
    //       member.score += scoreToAdd;
    //       return ;
    //     }
    //  });
    for(let member in this.participants){
       if(this.participants[member].uid === uid){
            this.participants[member].score += scoreToAdd;
            return ; 
       }
    }
  }
  
  fetchParticipants() {
    return this.participants;
  }
  
}

const vis = 'private'

// createRoom({roomId:2,visibility:vis});
// createRoom({roomId:3,visibility:'private'})

// let room1 = fetchRoomInstance(1);
// let room2 = fetchRoomInstance(2);
// let room3 = fetchRoomInstance(3);
// const room3Code = room3.showCode()
// console.log(room3Code);
// room3.addParticipant( {
//   name: 'Hassaan',
//   roomid: '1',
//   uid: 'P0WfTY92dGdXJ8RFAAAB',
//   score: 100
// });
// console.log(room3.fetchParticipants());
// room3.addParticipant({

//   name: 'ruv',
//   roomid: '3',
//   uid: 'P0WfTY92dGdXJ8RFAAAB',
//   score: 100
// },
// room3Code
// );
// console.log(room3.fetchParticipants());


// createRoom({roomId:1})


const creatingNewRoom =  (data) => {
  if(!data){
    console.log(`The data recieved is empty`);
    return
  }
  // console.log(data.visibility || 'public');
  // creating the room 
  createRoom({ roomId: data.roomId, visibility: data.visibility || 'public' , size: data.size || 5})
  let currentRoomInstance = fetchRoomInstance(data.roomId);
  const joinStatus = currentRoomInstance.addParticipant(data.participant); 
  // console.log(currentRoomInstance.visibility);
  // console.log(`Room ${data.roomId} members ${currentRoomInstance.visibility === 'private'? `(${currentRoomInstance.code})`:""}`);
  // console.log(currentRoomInstance.fetchParticipants());    

  if(joinStatus){
     console.log(`User joined the room ${data.roomId}`);
  }

}
createRoom({roomId:1});

creatingNewRoom({roomId:1,visibility:'public',size:5,participant:{ name: 'HuNTer',roomid: '1',uid: 'P0WfTY92dGdXJ8RFAAAB',score: 100}})
creatingNewRoom({roomId:1,visibility:'public',size:5,participant:{ name: 'Hassaan',roomid: '1',uid: 'abc',score: 100}})
creatingNewRoom({roomId:2,visibility:'private',size:5,participant:{ name: 'Hassaan',roomid: '2',uid: 'P0WfTY92dGdXJ8RFAAAB',score: 100}})

const room2 = fetchRoomInstance(2);
const room2Code = room2.showCode('P0WfTY92dGdXJ8RFAAAB');
console.log(`Adding new member after fetching the code `);
const joinStatus =room2.addParticipant({ name: 'xyz',roomid: '2',uid: 'asasdadasd',score: 100},room2Code)
console.log(joinStatus);
// creatingNewRoom({roomId:2,visibility:'private',size:5,participant:{ name: 'HuNTer',roomid: '2',uid: 'asdasd',score: 100},code:room2Code});
console.log(room2.fetchParticipants());
// console.log(`room 2 code from none moderator ${room2.showCode('asdasd')}`);
// creatingNewRoom({roomId:2,visibility:'private',size:5,participant:{ name: 'xyz',roomid: '2',uid: 'asasdadasd',score: 100}});
console.log(fetchAllRooms());

const room1 = fetchRoomInstance(1);
console.log(room1.fetchParticipants());
console.log(room1.deleteParticipants('abc'));
console.log(room1.fetchParticipants());

// room3.visibility === 'private'? room3.addParticipant({name: 'ruv',romid: '3',uid: 'P0WfTY92dGdXJ8RFAAAB',score: 100},room3Code):room3.addParticipant({name: 'ruv',roomid: '3',uid: 'P0WfTY92dGdXJ8RFAAAB',score: 100});



// room1.addParticipant( {
//   name: 'HuNTer',
//   roomid: '1',
//   uid: 'P0WfTY92dGdXJ8RFAAAB',
//   score: 100
// });

// room2.addParticipant({
//   name: 'abc',
//   roomid: '2',
//   uid: 'P0WfTY92dGdXJ8RFAAAB',
//   score: 100
// });
// room2.addParticipant({
//   name: 'xyz',
//   roomid: '2',
//   uid: 'P0WfTY92dGdXJ8RFAAAB',
//   score: 100
// });

// room1.deleteParticipants("P0WfTY92dGdXJ8RFAAAB")
// room1.increamentScore('P0WfTY92dGdXJ8RFAAAB',100)
// console.log(room1.fetchParticipants());
// console.log(room2.fetchParticipants());
// console.log("room 3 participants");
// console.log(room3.fetchParticipants());

// // room1.increamentScore("P0WfTY92dGdXJ8RFAAAB",100)

// // console.log(room1.fetchParticipants());
// console.log(`All private rooms`);
// console.log(fetchAllSpecifiedRoom('private'));

// const data = {visibility:'public',roomid:1,participant:{name:'hassaan',roomId:1}}

// console.log(data.participant);



// const roomInstance = [];

// class Rooms {
//   constructor({ participants, room }) {
//     this.participants = participants ? [participants] : [];
//     this.rooms = room;
//   }
  
//   getData() {
//     console.log(this.participants, this.rooms);
//   }
// }

// const createParticipant = ({ roomid, participant }) => {
//   let newParticipant = new Rooms({ participants: participant, room: roomid });
//   roomInstance.push({ roomid: roomid, instance: newParticipant, uid: participant.uid });
// }

// const fetchInstance = (roomid, uid) => {
//   const fetchedUser = roomInstance.find(e => e.roomid === roomid && e.uid === uid);
//   return fetchedUser ? fetchedUser.instance : null;
// }

// createParticipant({ roomid: "1", participant: { name: "Hassaan", uid: 1 } });
// createParticipant({ roomid: "1", participant: { name: "HuNTer", uid: 1 } });
// let instance = fetchInstance("1", 1);
// let instance2 = fetchInstance("2", 1);
// console.log(instance);
// console.log(instance2);











// class CrearteRoom {
//    room= [];
//    constructor(){

//    }
// }


/* Format for create room data 
  {roomid,uid,username,score=0} 
*/

// const checkParticipant  =(obj, roomid, uidToCheck) =>{
//     if(obj && obj[roomid].uid ===uidToCheck){
//         console.log("User Already Exist");
//         return 0
//     }
//     return 1
// }


// const createRoom = ({roomid,...participant}) =>{
//     const rooms =[];
//     const participants ={};
    
//     // if the room already exist append the participants into the participant object 
//     if (rooms.indexOf(roomid)!==-1){
//         console.log("Room already exist appending the user into the participant of the room");
//         if(checkParticipant(participants,roomid,participant.uid)){
//             participants[roomid] = participant;
//             console.log(participants);
//         }
//         return;
//     }
    
//     console.log("The room doesnt exist creating a room");
//     // Else append the roomid into the room array and the participants into the partipants obj
//     rooms.push(roomid);
//     participants[roomid] = participant;
    
//     console.log(participants);
//     console.log(roomid);
// }

// createRoom({roomid:"1",uid:"101",username:"Hassaan",score:0} )
// createRoom({roomid:"1",uid:"101",username:"HuNTer",score:0} )






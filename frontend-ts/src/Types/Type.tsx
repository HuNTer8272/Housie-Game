import { MdEmail } from 'react-icons/md';
export interface UserData{
    name:string,
    email:string,
    password:string,
    roomId:string ,
    uid:string ,
    point:number
    participant:Participant
    rank:string
    photoURL:string
  }

export interface Participant{
    name:string;
    uid:string;
    roomId:string;
    score:number;
    moderator?:boolean
}
  

export interface message{
    sender:string,
    message:string,
    id:string
}

export interface Ranker {
    name: string;
    uid: string;
    roomId: string;
    score: number;
}

export interface Rooms {
    deleteParticipants: (uid: string) => void;
    roomId:string;
    participants:Participant[]
    useNumber:number[],
    time:number;
    visibility:string;
    size:number;
    code:string|null;
    name:string;
}

// oomId: "", visibility: "public",  roomName: '', size: 5, code: ""

export interface JoinRoomData {
 roomId:string;
 visibility:string;
 roomName:string;
 size:number;
 code:string
}


export interface UserState {
    name:string,
    email:string,
    password:string,
  }
  
  
  export interface BackendStatus<Data> {
    message:Data,
    success:boolean
  }     

  export interface ProfileData {
    userName: string;
    email?: string;
    password?: string;
    userId: string;
    photoURL:string;
    point:number;
    rank:string;
  }
  
  export interface LoginData {
    sucess:boolean;
    message:string;
    userData:{
      userId:string,
      userName:string,
      photoURL:string
      password:string,
      rank:string,
      point:number
      email:string;
    }
  } 
export interface UserData{
    name:string;
    roomId:string ,
    uid:string ,
    participant:Participant
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
import { atom } from "jotai";

// interface for userData
 interface userData{
    name: string;
    uid:string;
    roomId:string;
    participants:Object[],
  }
  
  // userDataAtom (for global access without props drilling)
  const userDataAtom = atom<userData>(() => {
    const data = localStorage.getItem('userData');
     return data? JSON.parse(data) : {name:"",uid:"",roomId:'',participants:[]}
  })

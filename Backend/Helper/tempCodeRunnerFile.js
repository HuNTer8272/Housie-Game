const participant = [
  {
    name: 'Hassaan',
    roomid: '1',
    uid: 'P0WfTY92dGdXJ8RFAAAB',
    score: 100
  },
  {
    name: 'HuNTer',
    roomid: '1',
    uid: 'Pc9VBUh8kwPKA45rAAAL1',
    score: 20
  },
  {
    name: 'XYZ',
    roomid: '1',
    uid: 'Pc9VBUh8kwPKA45rAAAL',
    score: 60
  },
  {
    name: 'XYZ',
    roomid: '2',
    uid: 'Pc9VBUh8kwPKA45rAAAL3',
    score: 60
  },
  {
    name: 'PQR',
    roomid: '2',
    uid: 'Pc9VBUh8kwPKA45rAAAL2',
    score: 90
  },
  {
    name: 'ABC',
    roomid: '1',
    uid: '8ajfG5DprCdo_ZX6AAAH',
    score: 50
  },
]


const deleteUser = (uid) => {
  const user = participant.find(member => member.uid === uid)
  const indexOfUser = participant.indexOf(user);
  if(indexOfUser === -1){
     console.log(`The user is not present in the given array`);
     return
  }

  console.log(`the user ${user.name} has beeen successfully removed from the participants list `);
  participant.splice(indexOfUser,1)
}

const indexOfUser = (uid) => {
  return participant.indexOf(participant.find(user => user.uid === uid))
}



// console.log(`before deleting participants`);
// console.log(participant);
console.log(indexOfUser('P0WfTY92dGdXJ8RFAAAB'));
// console.log(`After deleting participants`);
// console.log(participant);

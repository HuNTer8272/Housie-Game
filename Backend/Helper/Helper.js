// Helper.js
const Filter = require('bad-words');
const filter = new Filter();

let time = 0;

// Function to filter badwords
const filterBadWords = (message) => {
  return filter.clean(message);
}

// Function to fetch all the user in the specified room 
const FetchUsers = (arr, roomID) => {
  if (arr.length === 0) return null;

  const filteredParticipants = arr.filter(participant => participant.roomid === roomID);
  return filteredParticipants;
}

// Function to generate random numbers between 1-100
const randomizer = () => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  return randomNumber;
}

// Function for timer 
const timer = (timer, interval) => {
  timer++;
  if (timer == 33)
    clearInterval(interval);
}

// Fetch the top 3 players from the participants 
const fetchRankers = (arr, roomid) => {
  const newArr = arr.filter(member => member.score === roomid);
  newArr.sort((a, b) => b.score - a.score);
  return newArr.slice(0, newArr.length > 3 ? 3 : newArr.length);
}

module.exports = { filterBadWords, FetchUsers, randomizer, timer, fetchRankers };

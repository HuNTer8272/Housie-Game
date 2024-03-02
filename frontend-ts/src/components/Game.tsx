  import React, { useEffect, useState } from 'react';
  import server from '../Server/Server';
  import { UserData } from '../Types/Type';



  // Function to create housie ticket format
  const insertRandomNumbers = (arr:any[], numOfNumbers: number): number[][] => {
    const newArray = arr.slice();
    const zeroIndices: number[] = newArray.reduce((indices, val, index) => (val === 0 ? [...indices, index] : indices), []);

    // Shuffle the zeroIndices array
    for (let i = zeroIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [zeroIndices[i], zeroIndices[j]] = [zeroIndices[j], zeroIndices[i]];
    }

    const randomNumSet = new Set<number>();

    // Take the first numOfNumbers elements
    const indicesToReplace = zeroIndices.slice(0, numOfNumbers);

    // Replace the selected indices with unique random numbers between 1 and 100
    indicesToReplace.forEach((index) => {
      let randomNumber: number;
      do {
        randomNumber = Math.floor(Math.random() * 100) + 1;
      } while (randomNumSet.has(randomNumber));

      randomNumSet.add(randomNumber);
      newArray[index] = randomNumber;
    });

    return newArray;
  };

  const Game: React.FC<{ num: number|undefined; userData: UserData }> = ({ num, userData }) => {
    const [arr, setArr] = useState<any[][]>([
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);

    const [compArr, setCompArr] = useState<any[][]>([[], [], []]);

    const [rows, setRows] = useState<{ row1: boolean; row2: boolean; row3: boolean }>({
      row1: false,
      row2: false,
      row3: false
    });

    const insertIntoArr = (index: number, element: number) => {
      setCompArr((prevArr) => {
        const newArr = [...prevArr];
        if (newArr[index].indexOf(element) === -1) {
          newArr[index] = [...newArr[index], element];
        }
        return newArr;
      });
    };

    useEffect(() => {
      const updatedArr = arr.map((innerArr) => insertRandomNumbers(innerArr, 5));
      setArr(updatedArr);
    }, []);

    useEffect(() => {
      if (compArr[0].length === 5) {
        setRows((prevRows) => ({ ...prevRows, row1: true }));
      }
      if (compArr[1].length === 5) {
        setRows((prevRows) => ({ ...prevRows, row2: true }));
      }
      if (compArr[2].length === 5) {
        setRows((prevRows) => ({ ...prevRows, row3: true }));
      }
    }, [compArr]);

    return (
      <>
        <div className="flex flex-col items-center justify-center h-full">
          
          {/* row 1 */}
          <div className=" w-[max-content]">
            {arr[0].map((square, index) => (
              <button
                key={index}
                onClick={(e) => {
                  if (e.currentTarget) {
                    if (num === square) {
                      e.currentTarget.classList.remove('bg-slate-900');
                      e.currentTarget.classList.add('bg-green-500');
                      insertIntoArr(0, square);
                      server.emit('ticket-completed', userData);
                    } 
                    // else {
                    //   e.currentTarget.classList.add('animate-pulse');
                    //   setTimeout(() => {
                    //     if (e.currentTarget) {
                    //       e.currentTarget.classList.remove('animate-pulse');
                    //     }
                    //   }, 1000);
                    // }
                  }
                }}
                className={`w-32 h-32 m-1 text-white rounded-md shadow-lg drop-shadow-sm ${square !== 0 ? 'bg-[#c68642]' : 'bg-[#f6b07b]'} `}
              >
                <pre>{square === 0 ? '  ' : square}</pre>
              </button>
            ))}
          </div>
          {/* row 2 */}
          <div className=" w-[max-content]">
            {arr[1].map((square, index) => (
              <button
                key={index}
                onClick={(e) => {
                  if (e.currentTarget) {
                    if (num === square) {
                      e.currentTarget.classList.remove('bg-slate-900');
                      e.currentTarget.classList.add('bg-green-500');
                      insertIntoArr(1, square);
                      server.emit('ticket-completed', userData);
                    } 
                    // else {
                    //   e.currentTarget.classList.add('animate-pulse');
                    //   setTimeout(() => {
                    //     if (e.currentTarget) {
                    //       e.currentTarget.classList.remove('animate-pulse');
                    //     }
                    //   }, 1000);
                    // }
                  }
                }}
                className={`w-32 h-32 m-1 text-white rounded-md shadow-lg drop-shadow-sm ${square !== 0 ? 'bg-[#c68642]' : 'bg-[#f6b07b]'} `}
              >
                <pre>{square === 0 ? '  ' : square}</pre>
              </button>
            ))}
          </div>
          {/* row 3 */}
          <div className=" w-[max-content]">
            {arr[2].map((square, index) => (
              <button
                key={index}
                onClick={(e:any) => {
                  if (e.target) {
                    if (num === square) {
                      e.target.classList.remove('bg-slate-900') ;
                      e.target.classList.add('bg-green-500');
                      insertIntoArr(2, square);
                      server.emit('ticket-completed', userData);
                    } 
                    // else {
                    //   e.currentTarget.classList.add('animate-pulse');
                    //   setTimeout(() => {
                    //     // if (e.currentTarget) {
                    //       e.currentTarget.classList.remove('animate-pulse');
                    //     // }
                    //   }, 1000);
                    // }
                  }
                }}
                className={`w-32 h-32 m-1 text-white rounded-md shadow-lg drop-shadow-sm ${square !== 0 ? 'bg-[#c68642]' : 'bg-[#f6b07b]'} `}
              >
                <pre>{square === 0 ? '  ' : square}</pre>
              </button>
            ))}
          </div>
          <div className="flex mt-10 space-x-5 text-white ">
            <button
              className="p-1 px-8 cursor-pointer rounded-full bg-[#c68642] text-[1.2rem] "
              onClick={() => {
                server.emit('row-1', { ...userData });
              }}
              disabled={!rows.row1}
            >
              row 1
            </button>
            <button
              className="p-1 px-8 cursor-pointer rounded-full bg-[#c68642] text-[1.2rem] "
              onClick={() => {
                server.emit('row-2', { ...userData });
              }}
              disabled={!rows.row2}
            >
              row 2
            </button>
            <button
              className="p-1 px-8 cursor-pointer rounded-full bg-[#c68642] text-[1.2rem] "
              onClick={() => {
                server.emit('row-3', { ...userData });
              }}
              disabled={!rows.row3}
            >
              row 3
            </button>
            <button
              className="p-1 px-8 cursor-pointer rounded-full bg-[#c68642] text-[1.2rem] "
              onClick={() => {
                server.emit('housie', { ...userData });
              }}
              disabled={!(rows.row1 && rows.row2 && rows.row3)}
            >
              housie
            </button>
          </div>
        </div>
      </>
    );
  };

  export default Game;

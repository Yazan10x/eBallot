// import {PartyAPI} from "../../APIs/PartyAPI";
// import {Party} from "../../Models/Party"
// import React, { useState } from 'react';

// const [parties, setParties] = useState<Array<Party>>()
// let liberal: number[] = [];
// let conservative: number[] = [];

// const get_parties = () => {
//   PartyAPI.get_parties().then((res) => {
//     let date = res!;
//     setParties([])
//     setParties(date)
//     process_parties(date)
//   })
// }

// const process_parties = (parties_list: Array<Party>) => {
//   let i: number;
  
//   for(i=0; i<parties_list!.length; i++){
//     let ontario = parties_list[i].ontario;
//     let quebec = parties_list[i].quebec;
//     let bc = parties_list[i].bc;
//     let alberta = parties_list[i].alberta;
      
//     if (parties_list[i].name === "Liberal"){
//         liberal.push(ontario);
//         liberal.push(quebec); 
//         liberal.push(bc);
//         liberal.push(alberta);
//     }
//     else{
//       conservative.push(ontario); 
//       conservative.push(quebec) 
//       conservative.push(bc)
//       conservative.push(alberta);
//     }
//   }
// }

export const UserData = [
    {
        id: 1,
        province: "Ontario",
        liberal: 32010, 
        conservative: 33200,
    },
    {
        id: 2,
        province: "Quebec",
        liberal: 23301, 
        conservative: 30000,
    },
    {
        id: 3,
        province: "British Columbia",
        liberal: 33003, 
        conservative: 21102,
    },
    {
        id: 4,
        province: "Alberta",
        liberal: 20202, 
        conservative: 22000,
    }
]
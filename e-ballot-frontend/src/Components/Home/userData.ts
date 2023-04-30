import {PartyAPI} from "../../APIs/PartyAPI";
import {Party} from "../../Models/Party"
import React, { useState } from 'react';

const [parties, setParties] = useState<Array<Party>>()
let liberal: number[] = [];
let conservative: number[] = [];

const get_parties = () => {
  PartyAPI.get_parties().then((res) => {
    let date = res!;
    setParties([])
    setParties(date)
    process_parties(date)
  })
}

const process_parties = (parties_list: Array<Party>) => {
  let i: number;
  
  for(i=0; i<parties_list!.length; i++){
    let ontario = parties_list[i].ontario;
    let quebec = parties_list[i].quebec;
    let bc = parties_list[i].bc;
    let alberta = parties_list[i].alberta;
      
    if (parties_list[i].name === "Liberal"){
        liberal.push(ontario);
        liberal.push(quebec); 
        liberal.push(bc);
        liberal.push(alberta);
    }
    else{
      conservative.push(ontario); 
      conservative.push(quebec) 
      conservative.push(bc)
      conservative.push(alberta);
    }
  }
}

export const UserData = [
    {
        id: 1,
        province: "ontario",
        liberal: liberal[0], 
        conservative: conservative[0],
    },
    {
        id: 2,
        province: "quebec",
        liberal: liberal[1], 
        conservative: conservative[1],
    },
    {
        id: 3,
        province: "bc",
        liberal: liberal[2], 
        conservative: conservative[2],
    },
    {
        id: 4,
        province: "alberta",
        liberal: liberal[3], 
        conservative: conservative[3],
    }
]
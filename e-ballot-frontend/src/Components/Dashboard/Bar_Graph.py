import { Chart } from "react-chartjs-2";
import {PartyAPI} from "../../APIs/PartyAPI";


export const BarChart = () => {

    let parties = PartyAPI.get_parties();
    let res: { [s: string]: number } = {};
    
    for(let i=0; i<parties.length; i++){
        let name = parties[i].name; 
        let ontario = parties[i].ontario; 
        let quebec = parties[i].quebec; 
        let bc = parties[i].bc; 
        let alberta = parties[i].alberta;
        let sum = ontario.length + quebec.length + bc.length + alberta.length;
        res.name = sum;
    }

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Chart
        type={"bar"}
        data={res}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Voting Results"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};
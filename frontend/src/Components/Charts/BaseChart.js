import React, {useState} from "react";


import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";

const BaseChart = ({modelData}) =>{
    const [line1, setLine1] = useState(null)
    const [line2, setLine2] = useState(null)
    const [chartType, setchartType] = useState('line')

    // const options = {
    //     responsive: true,
    //     plugins: {
    //       legend: {
    //         position: 'top',
    //       },
    //       title: {
    //         display: true,
    //         text: 'data',
    //       },
    //     },
    //   };
      var data = null
      var labels = null
      if(modelData && line1 && line2){
          
          labels = modelData.X_train;
          if(labels){
            data = {
                labels,
                datasets: [
                  {
                    label: line1,
                    data:  modelData[line1],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgb(255, 99, 132)'
                  },
                  {
                    label: line2,
                    data: modelData[line2],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    borderColor: 'rgb(53, 162, 235)'
                  },
                ],
              };
          }
      }
      
      const RenderChartType = (data) =>{
            switch(chartType) {
              case 'line':
                return <LineChart data={data} />;
              case 'bars':
                return <BarChart data={data} />;
              default:
                return '';
          }
      }

      const CompOptions = () => {
        const op = ["y_train","y_test","y_pred_train","y_pred_test"];
        return op.map(e=><option key={e} value={e}>{e}</option>)
      }
    return (
        <div className="row">
            <div className="col-10">
            {
                
                data ?
                        RenderChartType(data)
                :null
            }
            </div>
            <div className="col-2 mt-5 pt-5">
                <div  >
                    <div style={{width:"200px"}}>
                        <label><div style={{backgroundColor:"rgb(53, 162, 235)", width:"20px", height:"10px", display:"inline-block"}}></div> First Line</label>
                        <select className="form-control" onChange={(e)=>setLine1(e.target.value)} value={line1}>
                            <option></option>
                            <CompOptions />
                        </select>
                    </div>

                    <div style={{width:"200px", marginTop:"10px"}}>
                        <label><div style={{backgroundColor:"rgb(255, 99, 132)", width:"20px", height:"10px", display:"inline-block"}}></div> Second Line</label>
                        <select className="form-control" onChange={(e)=>setLine2(e.target.value)} value={line2}>
                            <option></option>
                            <CompOptions />
                        </select>
                    </div>
                
                    <div>
                        <div style={{width:"200px", marginTop:"100px"}}>
                            <label>Chart Type</label>
                            <select className="form-control" onChange={(e)=>setchartType(e.target.value)} value={chartType}>
                                <option></option>
                                <option value="line">Line</option>
                                <option value="bars">Bars</option>
                            </select>
                        </div>
                    </div>

                </div>

            </div>
            
        
        </div>
    )
}

export default BaseChart;
import React,{useState,useEffect} from 'react'
import  {Line, Pie} from 'react-chartjs-2'
import money from '../assets/icons/money.svg'
import calendar from '../assets/icons/calendar.svg'
import infographic from '../assets/icons/infographic.svg'
import util from '../util/main'
import axios from 'axios'

export default function Dash() {
  const [sales, setSales] = useState({status:false,data:null})
  let date = new Date()
  let totalSales = 0, monthlySales = [0,1,2,3,4], filterSales, performance, pieData=[]

  //sales data api 
  useEffect(() => {
        axios.get('https://evening-castle-65340.herokuapp.com/api/sales')
        .then(res=>setSales({status:true,data:Object.values(res.data)}))   
        console.log(sales.data)         
    }, [])

  //data functions
  if(sales.status){  
    filterSales = monthlySales.map(item =>{
    let monthTotal = 0
    let filter = sales.data.filter(ele => parseInt(ele.date.slice(3,5)) === (util.alternative(monthlySales.indexOf(item))+1 ))
    filter.length !== 0?filter.map(data => monthTotal = monthTotal + parseInt(data.amount))
    :monthTotal = 0
    return monthTotal
  })
    for(let i=0; i<5; i++){
      let item = {month:util.months[util.alternative(i)] ,total:filterSales[i]}
      pieData.push(item)
    }
    pieData.sort((a, b) => {
      return a.total - b.total;
    });
    console.log(pieData)
    totalSales = filterSales.reduce((a, b) => a + b, 0)
    performance = (filterSales[1]-filterSales[2])*100/filterSales[1]
  }
      
  //pie chart    
    const pie = {
      labels: sales.status?[pieData[4].month, pieData[3].month, pieData[2].month]:[],
      datasets: [
        {
          label: 'Sales',
          data: sales.status?[pieData[4].total,pieData[3].total,pieData[2].total]:[],
          backgroundColor: [
            'rgba(182, 219, 175, 0.5)',
            'rgba(116, 171, 106, 0.6)',
            'rgba(58, 117, 47, 0.9)',
          ],
          borderWidth: 0,
        },
      ],
    }
    console.log(filterSales)
    //graph chart
      const bar = {
        labels: [util.months[util.alternative(4)],util.months[util.alternative(3)], util.months[util.alternative(2)],util.months[util.alternative(1)], util.months[date.getMonth()],],
        datasets: [{
            label: 'Sales',
            data: sales.status?[filterSales[4], filterSales[3], filterSales[2], filterSales[1], filterSales[0]]: [0,0,0,0,0],
            fill: true,
            backgroundColor: 'rgba(192, 227, 186, 1)',
            borderColor: 'rgb(58, 117, 47)',
          },
        ],
      }

    return (
    <div className='dash-main'>
      
      <div className='dash-tab'>
        <div><p className='dash-tab-p'>Total Sales</p>
        <h1 className='dash-tab-head'>{sales.status?filterSales.reduce((a, b) => a + b, 0) :null}</h1></div>
        <div className='dash-tab-icon-back'><img src={money} className='dash-tab-icon' alt=""/>
        </div>
      </div>
      
      <div className='dash-tab'>
        <div><p className='dash-tab-p'>Last Month Sales</p>
        <h1 className='dash-tab-head'>{sales.status?filterSales[1] :null}</h1>
        </div>
        <div className='dash-tab-icon-back'>
        <img src={calendar} className='dash-tab-icon' alt=""/>
        </div>
      </div>
      
      <div className='dash-tab'>
        <div>
          <p className='dash-tab-p'>Last Month Performance</p>
          <h1 className='dash-tab-head'>{sales.status?performance.toFixed(2)+"%" :null}</h1>
        </div>
        <div className='dash-tab-icon-back'>
          <img src={infographic} className='dash-tab-icon' alt=""/>
        </div>
      </div>

      <div className='dash-graph'><div className='dash-graph-span'><Line width={10} options={util.options} data={bar} /></div></div>
        <div className='dash-pie'><h2 className='dash-pie-head'>Top Sales</h2>
        <p className='dash-pie-p'>By Months</p><Pie height={180} options={{legend:{labels:{fontFamily:'Poppins', fontSize:0},position:'bottom'}}} data={pie}/></div>

    </div>
    )
}

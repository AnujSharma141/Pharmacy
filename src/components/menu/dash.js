import React,{useState,useEffect} from 'react'
import  {Line, Pie} from 'react-chartjs-2'
import money from '../../assets/icons/money.svg'
import calendar from '../../assets/icons/calendar.svg'
import infographic from '../../assets/icons/infographic.svg'
import axios from 'axios'

export default function Dash() {
  const [sales, setSales] = useState({status:false,data:null})
  let date = new Date()
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let totalSales = 0, monthlySales = [0,1,2,3,4], filterSales, performance

  //sales data api 
  useEffect(() => {
        axios.get('https://hidden-reaches-87611.herokuapp.com/api/sales')
        .then(res=>setSales({status:true,data:Object.values(res.data)}))            
    }, [])

  //data functions
  const alternative = month =>{
    return date.getMonth()-month < 0?date.getMonth()-month + 12 : date.getMonth()-month
  }
    if(sales.status){
      
      filterSales = monthlySales.map(item =>{
      let monthTotal = 0
      let filter = sales.data.filter(ele => parseInt(ele.date.slice(3,5)) === (alternative(monthlySales.indexOf(item))+1 ))
      filter.length !== 0?filter.map(data => monthTotal = monthTotal + parseInt(data.amount))
      :monthTotal = 0
      return monthTotal
    })
    console.log(sales)
    totalSales = filterSales.reduce((a, b) => a + b, 0)
    performance = (filterSales[1]-filterSales[2])*100/filterSales[1]
  }
      
  //pie chart    
    const pie = {
        labels: [months[date.getMonth()-2],months[date.getMonth()-1], months[date.getMonth()]],
        datasets: [
          {
            label: 'Sales',
            data: [3, 3, 1],
            backgroundColor: [
              'rgba(182, 219, 175, 0.2)',
              'rgba(116, 171, 106, 0.6)',
              'rgba(58, 117, 47, 0.7)',
            ],
            borderWidth: 0,
          },
        ],
      }

    //graph chart
      const bar = {
        labels: [months[alternative(4)],months[alternative(3)], months[alternative(2)],months[alternative(1)], months[date.getMonth()],],
        datasets: [{
            label: 'Sales',
            data: sales.status?[filterSales[4], filterSales[3], filterSales[2], filterSales[1], filterSales[0]]: [0,0,0,0,0],
            fill: false,
            backgroundColor: 'rgb(58, 117, 47)',
            borderColor: 'rgba(192, 227, 186, 1)',
          },
        ],
      }
      const options = {legend: {labels: {  // This more specific font property overrides the global property
                fontFamily:'Poppins',
                fontSize: 0,
                },display:false,},
        maintainAspectRatio:false,
        scales: { yAxes: [{ gridLines:{
                    color:'rgba(0, 100, 0, 0.05)',
                    drawBorder:true,
                    zeroLineColor:'rgba(0, 100, 0, 0.1)'},
              ticks: { display:true,
                beginAtZero: true,
                fontFamily:'Poppins',
                fontColor:'#4f7349'},},],
          xAxes:[{gridLines:{
                color:'rgba(0, 100, 0, 0.0)',
                zeroLineColor:'rgba(0, 100, 0, 0.1)'},
          ticks: {display:true,
            beginAtZero: true,
            fontFamily:'Poppins',
            fontColor:'#4f7349'},
        },]},}

    return (
        <div className='dash-main'>
            <div className='dash-tab'><div className='dash-tab-icon-back'><img src={money} className='dash-tab-icon' alt=""/></div><div><p className='dash-tab-p'>Total Sales</p><h1 className='dash-tab-head'>{sales.status?filterSales.reduce((a, b) => a + b, 0) :null}</h1></div></div>
            <div className='dash-tab'><div className='dash-tab-icon-back'><img src={calendar} className='dash-tab-icon' alt=""/></div><div><p className='dash-tab-p'>Last Month Sales</p><h1 className='dash-tab-head'>{sales.status?filterSales[1] :null}</h1></div></div>
            <div className='dash-tab'><div className='dash-tab-icon-back'><img src={infographic} className='dash-tab-icon' alt=""/></div><div><p className='dash-tab-p'>Last Month Performance</p><h1 className='dash-tab-head'>{sales.status?performance.toFixed(2)+"%" :null}</h1></div></div>
            <div className='dash-graph'><div className='dash-graph-span'><Line width={10} options={options} data={bar} /></div></div>
            <div className='dash-pie'><h2 className='dash-pie-head'>Top Products</h2><p className='dash-pie-p'>By Quantity</p><Pie height={180} options={{legend:{labels:{fontFamily:'Poppins', fontSize:0},position:'bottom'}}} data={pie}/></div>

        </div>
    )
}

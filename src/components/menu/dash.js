import React,{useState,useEffect} from 'react'
import  {Line, Pie} from 'react-chartjs-2'
import axios from 'axios'

export default function Dash() {
  const [sales, setSales] = useState({status:false,data:null})
  let date = new Date()
  useEffect(() => {
        axios.get('https://hidden-reaches-87611.herokuapp.com/api/sales')
        .then(res=>setSales({status:true,data:Object.values(res.data)}))            
    }, [])
    let total=0 , monTotal = 0, perTotal
    if(sales.status){
      sales.data.map(item=> total = total + parseInt(item.amount))
      let filter = sales.data.filter(item => item.date === date.getMonth())
      if(filter.length !== 0){filter.data.map(item=> monTotal = monTotal + parseInt(item.amount))}

    }
    const pie = {
        labels: ['Vicocin', 'Amoxil', 'Delasone'],
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
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      const bar = {
       
        labels: [months[date.getMonth()-4],months[date.getMonth()-3], months[date.getMonth()-2],months[date.getMonth()-1], months[date.getMonth()],],
        datasets: [
          {
            label: 'Sales',
            data: [0, 0, 0, 0, 575],
            fill: false,
            backgroundColor: 'rgb(58, 117, 47)',
            borderColor: 'rgba(192, 227, 186, 0.5)',
          },
        ],
      }
      
      const options = {
        legend: {
            labels: {
                // This more specific font property overrides the global property
                fontFamily:'Poppins',
            }
        },
        maintainAspectRatio:false,
        scales: {
          yAxes: [
            {
                gridLines:{
                    color:'rgba(0, 100, 0, 0.05)',
                    drawBorder:true,
                    zeroLineColor:'rgba(0, 100, 0, 0.1)'

                },
              ticks: {
                display:true,
                beginAtZero: true,
                fontFamily:'Poppins',
                fontColor:'#4f7349'
              },
            },
          ],
          xAxes:[{
            gridLines:{
                color:'rgba(0, 100, 0, 0.05)',
                
                zeroLineColor:'rgba(0, 100, 0, 0.1)'
            },
          ticks: {
            display:true,
            beginAtZero: true,
            fontFamily:'Poppins',
            fontColor:'#4f7349'
          },
        },]
        },
      }
    return (
        <div className='dash-main'>
            <div className='dash-graph'><div className='dash-graph-span'><Line width={10} options={options} data={bar} /></div></div>
            <div className='dash-pie'><h2 className='dash-pie-head'>Top Products</h2><Pie options={{legend:{labels:{fontFamily:'Poppins',}}}} data={pie}/></div>
            <div className='dash-tab'><p className='dash-tab-p'>Total Sales</p><h1 className='dash-tab-head'>{sales.status?total :null}</h1></div>
            <div className='dash-tab'><p className='dash-tab-p'>Last Month Sales</p><h1 className='dash-tab-head'>{sales.status?monTotal :null}</h1></div>
            <div className='dash-tab'><p className='dash-tab-p'>Last Month Performance</p><h1 className='dash-tab-head'>0%</h1></div>
        </div>
    )
}

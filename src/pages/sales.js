import React,{useState,useEffect} from 'react'
import Calendar from 'react-calendar'
import '../style/Calendar.css';
import axios from 'axios'
import money from '../assets/icons/money.svg'
import util from '../util/main'

export default function Sales() {
    const [sales, setSales] = useState({status:false,data:null})
    const [display, setDisplay] = useState({
        data: sales.data, 
        total: 0})


    useEffect(() => {
        axios.get('https://hidden-reaches-87611.herokuapp.com/api/sales')
        .then(res=>setSales({status:true,data:Object.values(res.data)}))            
    }, [])

    let count = 1
    const [date, setDate] = useState(new Date())


    let filter =[]
    if(sales.status){
        filter = sales.data.filter(item => item.date === util.date)
    console.log(filter)}
    let total = 0
    filter.map(item=>{
        total = total + parseInt(item.amount)
    })

    return (
        <div className='sales'>
            
            <div className='sales-chart'>
                <div className='sales-chart-item sales-top'><p className='sales-chart-inc'>BILL NO</p><p className='sales-chart-item-name'>Name</p><p className='sales-chart-count-no'>Date</p><p className='sales-chart-count'>Amount</p></div>
                {sales.status?filter.length!==0?filter.map(item=>{return(
                    <div className='sales-chart-item'><p className='sales-chart-inc'>#{item.id}</p><p className='sales-chart-item-name'>{item.name}</p><p className='sales-chart-count-no'>{item.date}</p><p className='sales-chart-count'>$ {item.amount}</p></div>
                )}):<div className='sales-err'>No Data Available</div>
                :<div id="cover-spin"></div>}</div>
            <div className='sales-cal'><Calendar onChange={setDate} value={date} /></div>
            <div className='sales-tab'>
                <div><p className='sales-tab-p'>Total Sales</p>
                <h1 className='sales-tab-head'>{sales.status?total :null}</h1></div>
                
                <div className='sales-tab-icon-back'>
                    <img src={money} className='sales-tab-icon' alt=""/>
                </div>
                </div>
        </div>
    )
}

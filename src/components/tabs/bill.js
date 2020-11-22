import React,{useState} from 'react'
import axios from 'axios'

export default function Bill() {
    let date = new Date()
let month = date.getMonth()+1
let day = date.getDate()
let year = date.getFullYear()
let shortStartDate = day + "/" + month + "/" + year;
    const [data, setData] = useState({name:'', amount:'' , date: shortStartDate, products:null})

    const changeHandler = e =>{
        const keyName = e.target.name
        const value = e.target.value
        setData({name:data.name, amount:data.amount , date:data.date, products:data.products, [keyName]: value})
        console.log(data)
    }
    const salesAdd = e =>{
        e.preventDefault()
        if(data.name !== '' || data.price !== ''){ 
            console.log(data)
            axios.post('https://hidden-reaches-87611.herokuapp.com/api/sales',{"name":data.name,"amount":data.amount,"date":data.date,"products":data.products})
            .then(res=>{ if(res.status === 200){ alert('Data Added')
            console.log(res)
        }})
        }
    }
    return (
        <div className='bill'>
            
            <div className='bill-det'>
                    
            <h1 className='bill-title'>Invoice</h1>
                <form className='bill-form' onSubmit={salesAdd}>
                    <input type="text" className='bill-inp' onChange={changeHandler} placeholder='Customer Name' name="name" id=""/>
                    <input type="text" className='bill-inp' placeholder='Customer Age' name="" id=""/>
                    <div className='bill-prod'>
                        <div className='bill-prod-span'>
                        <input type="text" className='bill-inp bill-prod-inp bill-prod-name' placeholder='Product Name' name="" id=""/>
                        <input type="number" className='bill-inp bill-prod-inp' placeholder='Quantity' name="" id=""/>
    
                        </div>
                        <button className='log-button bill-button'>ADD</button>
                    </div>
                </form>
                </div>
                <div className='bill-total'>
                    <p className='bill-p'>Summary</p>
                    
                    <p className='bill-cont-main'>TOTAL: </p>
                    <p className='bill-sub'>TAX: 8% GST</p>
                    <p className='bill-total-main'>SUB TOTAL: </p>
                    <button className='log-button bill-button-main' type="submit">Confirm</button>
                </div>
            
        </div>
    )
}

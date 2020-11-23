import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function Bill() {

    const [prod, setProd] = useState({status:false,data:null})
    useEffect(() => {       
        axios.get('https://hidden-reaches-87611.herokuapp.com/api/products')
        .then(res=>setProd({status:true,data:Object.values(res.data)}))
        },[])
    const[sudo,setSudo] =useState({name:"",age:""})

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
        setSudo({name:sudo.name,age:sudo.age,[keyName]: value})
        console.log(data)
    }
    const salesAdd = e =>{
        e.preventDefault()
        if(data.name !== '' || data.price !== ''){ 
            console.log(data)
            axios.post('https://hidden-reaches-87611.herokuapp.com/api/sales',{"name":data.name,"amount":list.data,"date":data.date,"products":data.products})
            .then(res=>{ if(res.status === 200){ alert('Data Added')
            console.log(res)
            setSudo({name:"",age:""})
        }})
        }
    }

    const [filter, setFilter] = useState([])
    const [active, setActive] = useState(null)


    const [list, setList] = useState({data:0,quan:null,price:null})

    const filterList = e => {
        let key = e.target.value
        const filter = prod.data.filter(item => {
            if(item.name.includes(key.charAt(0).toUpperCase() + key.slice(1)) || item.name.includes(key.charAt(0).toUpperCase() + key.slice(1))) return item})
        if(key.length>2)setFilter(filter)
        if(key.length<2)setFilter([])
    }

    const selectItem = item => {
        setFilter([])
        setActive(item.name)
        setList({price:item.price, quan:list.quan, data: list.data})
        console.log(list)
    }

    const addList = item =>{
        setList({data:(list.price*list.quan)+list.data,price:null, quan:""})
        setActive("")
        console.log(list)
        
    }

    const changeQuan = e =>{
        setList({data: list.data, price:list.price, quan:e.target.value})
    }

    const clearInp = () =>{setActive(null)}


    return (
        <div className='bill'>
            <form className='bill-form' onSubmit={salesAdd}>
            <div className='bill-det'>       
            <h1 className='bill-title'>Invoice</h1>
                
                    <input type="text" className='bill-inp' onChange={changeHandler} placeholder='Customer Name' name="name" value={sudo.name} id=""/>
                    <input type="text" className='bill-inp'  onChange={changeHandler} placeholder='Customer Age' name="age" value={sudo.age} id=""/>
                    <div className='bill-prod'>
                        <div className='bill-prod-span'>
                        <input type="text" className='bill-inp bill-prod-inp bill-prod-name' placeholder='Product Name' value={active} onFocus={()=>clearInp()} onChange={e => filterList(e)} id=""/>
                        {prod.status?<div className='bill-prod-list'>
                        {filter.map(item =><div className="bill-prod-list-item" onClick={() =>{selectItem(item)}}>{item.name}</div>)}
                        </div>:null}

                        <input type="number" className='bill-inp bill-prod-inp' value={list.quan} placeholder='Quantity' name="" onChange={e => changeQuan(e)} id=""/>
    
                        </div>
                        <p className='log-button bill-button' onClick={addList}>ADD</p>
                    </div>
                
                </div>
                <div className='bill-total'>
                    <p className='bill-p'>Summary</p>
                    <p className='bill-cont-main'>TOTAL:{list.data} </p>
                    <p className='bill-sub'>TAX: 8% GST</p>
                    <p className='bill-total-main'>SUB TOTAL:{list.data+(0.08*list.data)} </p>
                    <button className='log-button bill-button-main' type="submit">Confirm</button>
                </div>
                </form>
        </div>
    )
}

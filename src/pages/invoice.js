import React,{useState,useEffect} from 'react'
import util from '../util/main'
import axios from 'axios'   
import id from '../api/sales'

export default function Invoice() {
    const [prod, setProd] = useState({status:false,data:null})
    const [id, setId] = useState(null)
    useEffect(() => {       
        
        axios.get('https://hidden-reaches-87611.herokuapp.com/api/sales')
        .then(res =>{
            let arr = Object.values(res.data)
            setId(arr[arr.length-1].id + 1)
        })

        axios.get('https://hidden-reaches-87611.herokuapp.com/api/products')
        .then(res=>setProd({status:true,data:Object.values(res.data)}))
        },[])
    const[sudo,setSudo] =useState({name:"",age:""}) //clears value
    

    let shortStartDate = util.date
    const [data, setData] = useState({name:'', amount:'' , date: shortStartDate, products:null})

    const changeHandler = e =>{
        const keyName = e.target.name
        const value = e.target.value
        setData({name:data.name, amount:data.amount , date:data.date, products:data.products, [keyName]: value})
        setSudo({name:sudo.name,age:sudo.age,[keyName]: value})
    }
    const salesAdd = e =>{
        e.preventDefault()
        if(data.name !== '' && list.total !== 0){ 
            console.log(data)
            axios.post('https://hidden-reaches-87611.herokuapp.com/api/sales',{"name":data.name,"amount":list.total,"date":data.date,"products":data.products})
            .then(res=>{ if(res.status === 200){ alert('Data Added')
            console.log(res)
            setList({...list, data:[], total:0})
            setSudo({name:"",age:""})
            setId(id+1)
        }})
        }
        else alert('please fill the required fields!')
    }

    const [filter, setFilter] = useState([])
    const [active, setActive] = useState(null)
    const [list, setList] = useState({data:[],quan:null,price:null,name:null,total:0 })

    const addList = () =>{
        const preList = list.data
        preList.push({name:list.name, quan:list.quan, price:list.price})
        let total = 0
        list.data.map(item => total = total+(item.quan*item.price))
        setList({data:preList,price:null, quan:"",total:total, name:null, price: 0})
        setActive("")
    }

    const changeQuan = e => setList({...list , quan:e.target.value})
    const changeName = e =>{
        let newProd = prod.data.filter(item=>item.name == e.target.value)
        console.log(newProd)
        setList({...list, name:e.target.value, price: newProd[0].price})
    }

    const clearInp = () =>{setActive(null)}
    console.log(prod.data)

    return (
        <div className='bill'>
            <form className='bill-form' onSubmit={salesAdd}>
            <div className='bill-det'>       
            <h1 className='bill-title'>Invoice</h1>
                
            <input type="text" className='bill-inp' onChange={changeHandler} placeholder='Customer Name' name="name" value={sudo.name} id=""/>
            <input type="text" className='bill-inp'  onChange={changeHandler} placeholder='Customer Age' name="age" value={sudo.age} id=""/>
            <div className='bill-prod'>
                <div className='bill-prod-span'>
                <select name="" className='bill-inp bill-prod-inp bill-prod-name' onChange={e => changeName(e)} id="">
                    {prod.status?prod.data.map(item=>{return(
                        <>
                        <option value={item.name} price={20}>{item.name}</option>
                        </>)
                    }):null}
                </select>
                
                <input type="number" className='bill-inp bill-prod-inp' value={list.quan} placeholder='Quantity' name="" onChange={e => changeQuan(e)} id=""/>
                </div>
                <p className='log-button bill-button' onClick={addList}>ADD</p>
            </div>
                
            </div>
            <div className='bill-total'>
            <p className='bill-p'>Invoice #{id}</p>
            <p>{shortStartDate}</p>
            <p>Products :</p>
            {list.data.map(item=>{
                return(
                    <p className='bill-total-prod'>{item.quan}x {item.name} = {item.price*item.quan}</p>
                )
            })}
            <p className='bill-cont-main'>TOTAL:{list.total}</p>
            

            <button className='log-button bill-button-main' type="submit">Confirm</button>
            </div>
                </form>
        </div>
    )
}
import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function Account() {
    const [data, setData] = useState({name:'', price:''})
    const changeHandler = e =>{
        const keyName = e.target.name
        const value = e.target.value
        setData({name: data.name, price: data.price, [keyName]: value})
        console.log(data)
    }
    const prodAdd = e =>{
        e.preventDefault()
        if(data.name !== '' || data.price !== ''){ 
            console.log(data)
            axios.post('https://hidden-reaches-87611.herokuapp.com/api/products',{"name":data.name,"price":data.price})
            .then(res=>{ if(res.status === 200){ alert('Data Added')
            console.log(res)
            axios.get('https://hidden-reaches-87611.herokuapp.com/api/products')
            .then(res=>setProd({status:true,data:Object.values(res.data)}))
            setData({name:'', price:''})
        }})
        }
    }

    let count = 1
    const [prod, setProd] = useState({status:false,data:null})
    useEffect(() => {       
    axios.get('https://hidden-reaches-87611.herokuapp.com/api/products')
    .then(res=>setProd({status:true,data:Object.values(res.data)}))
    },[])
    return (
        <div className='products'>
            <div className='prod-list'>
                <div className='prod-list-item  prod-list-label'><p className='prod-list-no'>S no</p ><p className='prod-list-name'>Name</p><p className='prod-list-pr'>Price</p ><p className='prod-list-id'>Id</p> <p className='prod-list-ac-label'>Action</p></div>
               
                {prod.status?prod.data.map(item=>{
                 
                    return(
                    <div className='prod-list-item'><p className='prod-list-no'>{count++}</p ><p className='prod-list-name'>{item.name}</p><p className='prod-list-pr'>{item.price}</p ><p className='prod-list-id'>{item.id}</p><p className='prod-list-ac'>DELETE</p></div>
                    )
                })
                :<p>Loading ...</p>}
            </div>
            <div className='prod-form-span'>
                <form className='prod-form' onSubmit={prodAdd}>
                    <input className='prod-inp' onChange={changeHandler} placeholder='Name' type="text" name="name" id="" value={data.name}/>
                    <input className='prod-inp-pr' onChange={changeHandler} placeholder='Price' type="text" name="price" id="" value={data.price}/>
        
                    <button className='log-button prod-button' type="submit ">Add</button>
                </form>
            </div>
        </div>
    )
}

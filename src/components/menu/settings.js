import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function Settings() {
    const [user, setUser] = useState({status:false,data:null})
    const [data, setData] = useState({name:'', id:'', password:'', phone:'', userName:'',})
    
    useEffect(() => {
        axios.get('https://hidden-reaches-87611.herokuapp.com/api/user')
        .then(res=>{setUser({status:true,data:res.data})
        setData({name:res.data.name, id:res.data.id, password:res.data.password, phone:res.data.phone, userName:res.data.userName,})
        })
    }, [])

    const changeHandler = e =>{
        const keyName = e.target.name
        const value = e.target.value
        setData({name: data.name, id: data.id, password: data.password, phone: data.phone,userName: data.userName, [keyName]: value})
        console.log(data)
    }
    const prodAdd = e =>{
        e.preventDefault()
        if(data.name !== '' || data.price !== ''){ 
            console.log(data)
            axios.put('https://hidden-reaches-87611.herokuapp.com/api/user',{"name":data.name,"id":data.id,"password":data.password,"phone":data.phone,"userName":data.userName})
            .then(res=>{ if(res.status === 200){ alert('Data Saved')
            
            axios.get('https://hidden-reaches-87611.herokuapp.com/api/user')
        .then(res=>{setUser({status:true,data:res.data})
        })
            setData({name:'', id:'', password:'', phone:'', userName:'',})
        }})
        }
    }

    return (
        <div className='settings'>
            <h1 className='settings-title'>Settings</h1>
            {user.status?<form className='settings-form' onSubmit={prodAdd}>
                <span className='settings-span'>
                    <p className='settings-label'>Employee Name</p>
                    <input type="text" className='settings-inp' onChange={changeHandler} placeholder={user.data.name} name="name" value={data.name} id=""/>
                </span>
                <span className='settings-span'>
                    <p className='settings-label'>Employee ID</p>
                    <input type="text" className='settings-inp' onChange={changeHandler} placeholder={user.data.id} name="id" value={data.id} id=""/>
                </span>
                <span className='settings-span'>
                    <p className='settings-label'>Employee Password</p>
                    <input type="password" className='settings-inp' onChange={changeHandler} placeholder={user.data.password} name="password" value={data.password} id=""/>
                </span>
                <span className='settings-span'>
                    <p className='settings-label'>Employee Phone</p>
                    <input type="text" className='settings-inp' onChange={changeHandler} placeholder={user.data.phone} name="phone" value={data.phone} id=""/>
                </span>
                <span className='settings-span'>
                    <p className='settings-label'>Employee Address</p>
                    <input type="text" className='settings-inp' onChange={changeHandler} placeholder={user.data.userName} name="userName" value={data.userName} id=""/>
                </span>
                <button className='log-button setting-button' type="submit">SAVE</button>
            </form>:<form className='settings-form'>
                <span className='settings-span'>
                    <p className='settings-label'>Employee Name</p>
                    <input type="text" className='settings-inp' name="" id=""/>
                </span>
                <span className='settings-span'>
                    <p className='settings-label'>Employee ID</p>
                    <input type="text" className='settings-inp'  name="" id=""/>
                </span>
                <span className='settings-span'>
                    <p className='settings-label'>Employee Password</p>
                    <input type="password" className='settings-inp'  name="" id=""/>
                </span>
                <span className='settings-span'>
                    <p className='settings-label'>Employee Phone</p>
                    <input type="text" className='settings-inp' name="" id=""/>
                </span>
                <span className='settings-span'>
                    <p className='settings-label'>Employee Call Name</p>
                    <input type="text" className='settings-inp' name="" id=""/>
                </span>
                <button className='log-button setting-button'>SAVE</button>
            </form>}
        </div>
    )
}

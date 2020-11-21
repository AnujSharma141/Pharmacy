import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function Settings() {
    const [user, setUser] = useState({status:false,data:null})
    useEffect(() => {
        axios.get('https://hidden-reaches-87611.herokuapp.com/api/user')
        .then(res=>{setUser({status:true,data:res.data})
        })    
    }, [])
    return (
        <div className='settings'>
            <h1 className='settings-title'>Settings</h1>
            {user.status?<form className='settings-form'>
                <span className='settings-span'>
                    <p className='settings-label'>Employee Name</p>
                    <input type="text" className='settings-inp' placeholder={user.data.name} name="" id=""/>
                </span>
                <span className='settings-span'>
                    <p className='settings-label'>Employee ID</p>
                    <input type="text" className='settings-inp' placeholder={user.data.id} name="" id=""/>
                </span>
                <span className='settings-span'>
                    <p className='settings-label'>Employee Password</p>
                    <input type="password" className='settings-inp' placeholder={user.data.password} name="" id=""/>
                </span>
                <span className='settings-span'>
                    <p className='settings-label'>Employee Phone</p>
                    <input type="text" className='settings-inp' placeholder={user.data.phone} name="" id=""/>
                </span>
                <span className='settings-span'>
                    <p className='settings-label'>Employee Call Name</p>
                    <input type="text" className='settings-inp' placeholder={user.data.userName} name="" id=""/>
                </span>
                <button className='log-button setting-button'>SAVE</button>
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

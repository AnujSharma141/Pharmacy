import React,{useState,useEffect} from 'react'
import axios from 'axios'
import logout from '../assets/icons/log-out.png'

export default function Nav(props) {
    
    const [user, setUser] = useState({status:false, name : null})
    useEffect(() => {
        axios.get('https://hidden-reaches-87611.herokuapp.com/api/user')
        .then(res=>{
        let stringArray = res.data.name.split(/(\s+)/)
        setUser({status:true,name : stringArray[0]})
        })
        
    }, [])
    return (
        <div className='nav'>
            {user.status?<h1 className='nav-title'>Hey,{user.name}</h1>:<h1 className='nav-title'>Hey</h1>}
            <div className='nav-opt' onClick={()=>props.sub()}>
                <img className="nav-opt-logo" src={logout} alt=""/>
            </div>
        </div>
    )
}

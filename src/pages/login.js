import React from 'react'
import {useState} from 'react'
import axios from 'axios'

export default function Login(props) {

    const [user, setUser] = useState({id:'', pass:''})
    const [log, setLog] = useState({status:false, err:null, load:false})
    
    const validLog = e =>{
        e.preventDefault()
        if(user.id === '' || user.pass === '') setLog({status: false, err: 'Enter Credentials!', load:false})
        else {
            setLog({status: false, err: '', load: true})
            axios.post('https://evening-castle-65340.herokuapp.com/api/login',{"username":user.id,"password":user.pass})
            .then((res=>{
                if(res.status === 200){props.sub()
                    setLog({err:'Login Success', state:true, load:false})
                }
            }))
            .catch(err =>{ if(log.status !== true)setLog({status: false, err: 'Invalid Login', load:false})})
        }
    }

    const changeHandler = e =>{
        const keyName = e.target.name
        const value = e.target.value
        setUser({id: user.id, pass: user.pass, [keyName]: value})
    }

    const clearErr = ()=>{
        setLog({err:''})
    }

    return (
        <>
        <div className='log-tab'>
            <h1 className='log-title'>Log In.</h1>
            <p className='log-sub'>with your employee credentials</p>
            <form className='log-form' onSubmit={validLog}>
                <input type="text" className='log-inp' onChange={changeHandler} placeholder='Employee ID' onFocus={clearErr} name="id"/>
                <input type="password" className='log-inp' onChange={changeHandler} placeholder='Password' onFocus={clearErr} name="pass"/>
                <button className='log-button' type="submit">LOG IN</button>
                <p className='log-err'>{log.err}</p>
            </form>
        </div>
        {log.load?<div id="cover-spin" className="log-load"></div>: null }
        </>
    )
}

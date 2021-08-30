import React from 'react'
import {useState} from 'react'
import Nav from './nav'

import Invoice from '../pages/invoice'
import Settings from '../pages/settings'
import Dash from '../pages/dash'
import Sales from '../pages/sales'
import Products from '../pages/products'

import home from '../assets/icons/home.svg'
import bar from '../assets/icons/bar-chart.svg'
import file from '../assets/icons/file.svg'
import user from '../assets/icons/user.svg'
import settings from '../assets/icons/settings.svg'


let app
export default function Tabs(props) {
    const [active, setActive] = useState({dash:true,sales:false,invoice: false, products: false, settings:false})
    const router = e =>{
        setActive({dash:false,sales:false,invoice: false, account: false, settings:false,[e]:true})
    }
    if(active.dash) app = <Dash />
    if(active.sales) app = <Sales />
    if(active.invoice) app = <Invoice />
    if(active.products)  app = <Products />
    if(active.settings) app = <Settings />

        return (
        <div className='dash'>
        <div className='dash-menu'>
            <h1 className='dash-menu-title'>STORE</h1>
            <p className={active.dash?'dash-menu-item menu-active':'dash-menu-item'} onClick={()=>router('dash')}><img className='menu-icon' src={home} alt=""/>Dashboard</p>
            <p className={active.sales?'dash-menu-item menu-active':'dash-menu-item'} onClick={()=>router('sales')}><img className='menu-icon' src={bar} alt=""/>Sales</p>
            <p className={active.invoice?'dash-menu-item menu-active':'dash-menu-item'} onClick={()=>router('invoice')}><img className='menu-icon' src={file} alt=""/>Invoice</p>
            <p className={active.products?'dash-menu-item menu-active':'dash-menu-item'} onClick={()=>router('products')}><img className='menu-icon' src={user} alt=""/>Products</p>
            <p className={active.settings?'dash-menu-item menu-active':'dash-menu-item'} onClick={()=>router('settings')}><img className='menu-icon' src={settings} alt=""/>Settings</p>
        </div>

        <div className='dash-pri'>
            <Nav sub={props.sub} />
            {app}
        </div>
        </div>
    )
}

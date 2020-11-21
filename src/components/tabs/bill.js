import React,{useState} from 'react'

export default function Bill() {
    const [prod, setProd] = useState({data:[]})
    
    return (
        <div className='bill'>
            
                <div className='bill-det'>
                    
            <h1 className='bill-title'>Invoice</h1>
                <form className='bill-form'>
                    <input type="text" className='bill-inp' placeholder='Customer Name' name="" id=""/>
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
                    <button className='log-button bill-button-main'>Confirm</button>
                </div>
            
        </div>
    )
}

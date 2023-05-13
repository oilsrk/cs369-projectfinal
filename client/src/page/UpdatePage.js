import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios'

export default function UpdatePage(){
    const [orderedCake, setOrderedCake] = useState([])
    const [cakeData, setcakedata] = useState([]);
    const {cakeId} = useParams();

    // connect mongoDB
    useEffect(() => {
        axios.get('http://localhost:8000/orders').then((response) =>{
            setcakedata(response.data);
            console.log(response.data);
        })
    },[])
    console.log(cakeId)
    
    // call only cake that order
    let selection = [];
    cakeData.map( data => {
      if(data._id == cakeId) {
          selection.push(data);
       }
    })
    console.log(selection);
    const Img = selection.map( data => {
        return(
            <>
                <img className="imgUpOr" src={data.img}/>
            </>
         );
    }) 
    const Data = selection.map( data => {
        return(
          <>
            <div className="setOrderBox">
                <div className="ordername">{data.name}</div>
                {data.cakeSize === '1pound' ?(<><div className="ordercakeSize">ขนาด 1 ปอนด์</div></>):(<></>)} 
                {data.cakeSize === '2pound' ?(<><div className="ordercakeSize">ขนาด 2 ปอนด์</div></>):(<></>)}
                {data.cakeSize === 'mini' ?(<><div className="ordercakeSize">ขนาด ครึ่งปอนด์</div></>):(<></>)}   
                {data.textCake === "" ? <span></span> : <span>เขียนข้อความหน้าเค้ก :  {data.textCake}</span>}
            </div>   
         </>
         );
    }) 
    const Address = selection.map( data => {
        return(
        <>
            <div className="orderAddress">{data.addressUser}</div>
        </>
        );
    }) 
    const Date = selection.map( data => {
        return(
        <>
            <div className="orderdate">{data.date}</div>
        </>
        );
    }) 
   
    return(
    <>
        <div className="containerUpdate">
            <h1>รายการสินค้าที่สั่งซื้อ</h1>
            <div className="frame">
                <div className="orderbox">
                    {Img}
                    {Data}
                    <div className="setAddressBox">
                        <div className="AddressBox">ที่อยู่การจัดส่ง :</div>
                        {Address}
                    </div>
                    <div className="setStatus">
                        <div className="statusbox">
                            <div className="status">เก็บเงินปลายทาง</div>
                        </div>
                        <div className="datesent">
                            <p>จัดส่งวันที่ : </p>
                            {Date}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
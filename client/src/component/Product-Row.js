import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function ProductRow() {
  //declare array to store cake data
  const [cakeData, setcakedata] = useState([]);
  //connect mongoDB
  useEffect(() => {
    axios.get('http://localhost:8000/').then((response) =>{
      setcakedata(response.data);
      console.log(response.data);
    })
  },[])
  //check is that bestCake in mongo, is it true store in cakeBested
  let cakeBested = [];
  cakeData.map( data => {
    if(data.bestS === true) {
        cakeBested.push(data);
    }})
  const listBest = cakeBested.map((item) => ( //click to order cake map id to show next page
      <li className="setLi" key={item.id} onClick={() => {window.location.href=`http://localhost:3000/order/${item._id}`}}> 
        <div className="pic">
          <img src={item.img} />
          <p>{item.name}</p>
        </div>
      </li>
  ));

  return (
    <> 
        {/* show cakeBested  */}
        <div>
          {cakeBested ? (
            <ul className="bestsell">{listBest}</ul> ) : ( "No Product")}
        </div>
    </>
    )
  
}

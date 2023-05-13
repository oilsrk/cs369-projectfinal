import React from 'react'
import imgCake from '../img/herocake.jpg'
 import { getProducts } from '../productData';
import ProductRow from '../component/Product-Row';
import imgMap from '../img/map.png'
import {NavLink, Outlet } from "react-router-dom"

export default function Home() {
  return (
    <>
      <div className="controlHome">
        <div className="heroCake">
          <img src={imgCake}/> 
          <div className="textWithImg">
            <p>Bits & Bite Bakery</p>
            <p>ร้านเค้กหลายสไตล์</p>
            <p>อบใหม่จากเตา</p>
          </div>
          <NavLink to="/product" className="Product">
            <button className="buttonWithImg">สั่งซื้อ</button>
          </NavLink>
        </div>
        <div className="bestsaler">
          <h1>Best saler</h1>
          <ProductRow/>
        </div>
        <div className="findstore">
          <h1>Find Store</h1>
            <img src={imgMap} />
        </div>
      </div>
    </>
  )
}
export const homeLoader = async () => {
  const res = await getProducts();
  return res;
};
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useParams} from 'react-router-dom';
import axios from 'axios'

//import colorFul from "../img/recommend/colorcake.jpg";
import shopping from "../img/shopping-cart.png";

export default function Order() {
    const [date, setDate] = useState(new Date());
    const [countCake, setCount] = useState(1);
    const [cakeSize , setcakeSize] = useState("");
    const [cakeData, setcakedata] = useState([]);
    const [textCake, setText] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [tasteCake, setTasteCake] = useState("")
    let priceCake;

    // connect mongoDB
    useEffect(() => {
      axios.get('http://localhost:8000/').then((response) =>{
        setcakedata(response.data);
        console.log(response.data);
      })
    },[])

    // map data cake from selected order(1)
    let { cakeId } = useParams();
    console.log(cakeId)

    // map data cake from selected order(2) map pic by use id
    var selectedCake = [];
    cakeData.map ( (data) => {
      if(data._id == cakeId) {
            selectedCake.push(data);
            console.log(data);
      }
    })
    console.log(selectedCake);

    //map id to show nam and img of selectedCake
    const cakieData = selectedCake.map( cake => {
      return(
          <div key={cake._id}>
              <p>{cake.name}</p>
              <img className='orderCake' src={cake.img} />
          </div>
      );
    });
    // console.log(selectedCake[0])
    
    selectedCake.map(cake => {
      if (cakeSize==="mini"){
        priceCake=cake.pricemini
      }
      else if(cakeSize==="1pound"){
        priceCake=cake.price
      }
      else{
        priceCake=cake.priceTwo
      }
    });  
    
    //map size cake and price
    const handleSize =(e) => {
      e.preventDefault();
      console.log(e.target.value);
      setcakeSize(e.target.value);
      setCount(1)

      selectedCake.map(cake => {
        if (e.target.value==="mini"){
          priceCake=cake.pricemini
        }
        else if(e.target.value==="1pound"){
          priceCake=cake.price
        }
        else{
          priceCake=cake.priceTwo
        }
      });
      setTotalPrice(priceCake)
    }
    const handleTaste = (e) => {
      e.preventDefault();
      setTasteCake(e.target.value);
    }
    //count cake
    const increase = (e) => {
      e.preventDefault();
      console.log(countCake)
      setCount(countCake + 1);
      setTotalPrice(priceCake*(countCake + 1));
    };

    const decrease = (e) => {
      e.preventDefault();
      console.log(countCake)
      if(countCake===1){
        setTotalPrice(priceCake*countCake);
        setCount(1);
      }
      else{
        setCount(countCake - 1);
        setTotalPrice(priceCake*(countCake - 1));
      }
    };

    let nameCake, imgCake;
    selectedCake.map(data => {
      nameCake = data.name ;
      imgCake = data.img;
    })

    console.log(nameCake);

  return (
    // send data to orderPage
    <form method='POST' action={`http://localhost:8000/updateorder/${cakeId}?name=${nameCake}&date=${date}&imgCake=${imgCake}&cakeSize=${cakeSize}&taste=${tasteCake}&textCake=${textCake}&totalPrice=${totalPrice}&countCake=${countCake}`}>
      <div className='order'>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100;300;400&display=swap" rel="stylesheet" />
        <div className='dateSelect'>
          <div className='count'>1</div> 
          <div className='text-center'>เลือกวันที่รับสินค้า</div>
        </div>
        
        <div className='calendar-container'>
          <Calendar
            onChange={setDate}
            value={date}
            name="date"
            selectRange={true}
          />
        </div>
        <div className='caketemplate'>
          <div className='count'>2</div>
          <div className='text-center'>เลือกแบบเค้ก</div>
        </div>
        <div className='choose'>
          {cakieData}
          <div className='cakedetail'>
            <div class="cakesize">ขนาด: 
              <input onChange={handleSize} type="radio" id="radio1" name="cakesize" value="mini" />
              <label for="radio1">มินิ</label>
              <input onChange={handleSize} type="radio" id="radio2" name="cakesize" value="1pound"/>
              <label for="radio2">1 ปอนด์</label>
              <input onChange={handleSize} type="radio" id="radio3" name="cakesize" value="2pound"/>
              <label for="radio3">2 ปอนด์</label>
            </div>
            <div className='taste'>รสชาติ :
              <input type="radiotaste" id="radiotaste1" name="taste" value="milk" onClick={handleTaste}/>
              <label for="radiotaste1">นมสด</label>
              <input type="radiotaste" id="radiotaste2" name="taste" value="choco" onClick={handleTaste}/>
              <label for="radiotaste2">ช็อคโกแลต</label>
              <input type="radiotaste" id="radio3taste" name="taste" value="greentea" onClick={handleTaste}/>
              <label for="radio3taste">ชาเขียว</label>
              <input type="radiotaste" id="radiotaste4" name="taste" value="orange" onClick={handleTaste}/>
              <label for="radiotaste4">ส้ม</label>
              <input type="radiotaste" id="radiotaste5" name="taste" value="cookieCream" onClick={handleTaste}/>
              <label for="radiotaste5">Cookie & Cream</label>
              <input type="radiotaste" id="radiotaste6" name="taste" value="StrawberryShort" onClick={handleTaste}/>
              <label for="radiotaste6">Strawberry short cake</label>
            </div>
            <div className='text'>เพิ่มข้อความบนหน้าเค้ก:
            <input className='form' name="textCake" type="text" placeholder="" onChange={(e) => {setText(e.target.value)}}/>
            </div>
            <div className='counter'>
              <div className='text'>จำนวน
              <button className="controlBtn" onClick={decrease} value="-">-</button>
              <span name="countCake">{countCake}</span>
              <button className="controlBtn" onClick={increase} value="+">+</button>
              </div>
            </div>
            <div className='text' >
              <p name="totalPrice">ราคารวม: {totalPrice} บาท</p>
            </div>
            <div>
              <button className='buttonBasket'>ใส่ตะกร้า<img src={shopping} className='cart' height="16px" width="16px" /></button>
            </div>
          </div>
        </div>
      
      </div>
      </form>  
    
  );

} 

import { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
export default function Product() {
    const Item = ({ name, category }) => (
        <div className="item-container">
            <div>
                <span className="item-label">Name:</span>
                {name}
            </div>
        </div>
    );
    const [cake, setCakeList] = useState([]);
    //show all cake for first sight
    const [selectCategory, setSelectedCategory] = useState("All");
    const [cakeDataLists, setCakeDataList] = useState([]);
    const[cakeSelected,setCakeSelected]=useState([]);   
    let chooseCake =[];
    
    useEffect(() => {
        axios.get('http://localhost:8000/').then((response) => {
            setCakeSelected(response.data);
        })
    }, [])
    console.log(cakeSelected);
    cakeSelected.map(cake =>{
        console.log(selectCategory);
        console.log(cake.category);
        if(selectCategory === cake.category ||selectCategory === "All"){
            chooseCake.push(cake);
        }
    })
    const ListCakes = chooseCake.map(cake => {
        return(
            <>
            <div className="cakeShow">
                <Link to={`http://localhost:3000/order/${cake._id}`}>
                    <div className="imgCake"><img src={cake.img} /></div>
                </Link>
                <p>{cake.name}</p>
            </div>
            </>

        );
    })
    console.log(chooseCake);
    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
        console.log(selectCategory); 
    }
    function getFilteredList() {
        if (!selectCategory) {
            return cake;
        }
        return cake.filter((item) => item.category === selectCategory);
    }
    var filteredList = useMemo(getFilteredList, [selectCategory, cake]);

    return (
        <>
            <div className="allfil">
                {/* <div className="filter"> */}
                    <label for="cars">Category : </label>
                    <select name="cake" id="cake" value={selectCategory} onChange={handleCategoryChange}>
                        <option value="All">All</option>
                        <option value="Recommend Cake">Recommend Cake</option>
                        <option value="Signature Cake">Signature Cake</option>
                        <option value="Minimal Cake">Minimal Cake</option>
                        <option value="Fruit Cake">Fruit Cake</option>
                        <option value="Baby Cake">Baby Cake</option>
                        <option value="Fancy Cake">Fancy Cake</option>
                    </select>
                {/* </div> */}
            </div>
            <div className="showAllCake">
                <div className="cake-cat">
                    {selectCategory}
                </div>
                <div className="cake-list">
                    {ListCakes}
                </div>
            </div>
        </>
    )

}

import localforage from "localforage";
export let initData = [
    {"id": "pd-0", "name":"Chocolate Cake","price":"300 Baht","category": "SignatureCake", "bestS": true},
    {"id": "pd-1", "name":"Colorful Cake","price":"300 Baht", "category": "SignatureCake", "bestS": false},
    {"id": "pd-2", "name":"Grape Cake","price":"300 Baht","category": "SignatureCake", "bestS": false},
    {"id": "pd-3", "name":"Strawberry Short Cake","price":"300 Baht","bestS": false},
    {"id": "pd-4", "name":"Yellow Cake","price":"300 Baht","category": "SignatureCake", "bestS": false},
    {"id": "pd-5", "name":"Cherry Cake","price":"300 Baht","category": "MinimalCake", "bestS": true},
    {"id": "pd-6", "name":"Choco Drop Strawberry Cake","price":"300 Baht","category": "MinimalCake", "bestS": false},
    {"id": "pd-7", "name":"Cow Cake","price":"300 Baht","category": "MinimalCake", "bestS": false},
    {"id": "pd-8", "name":"Greentea Cake","price":"300 Baht","category": "MinimalCake", "bestS": true},
    {"id": "pd-9", "name":"Charlie Brown Cake","price":"300 Baht","category": "MinimalCake", "bestS": false},
    {"id": "pd-10", "name":"Harry Cake","price":"300 Baht","category": "RecommendCake", "bestS": false},
    {"id": "pd-11", "name":"Coco Cake","price":"300 Baht","category": "RecommendCake", "bestS": false},
    {"id": "pd-12", "name":"Color Cake","price":"300 Baht","category": "RecommendCake", "bestS": true},
    {"id": "pd-13", "name":"Fluffy Cake","price":"300 Baht","category": "RecommendCake", "bestS": false},
    {"id": "pd-14", "name":"Blueberry Cake","price":"300 Baht","category": "RecommendCake", "bestS": false},
    {"id": "pd-15", "name":"Grapes Cake","price":"300 Baht","category": "FruitCake", "bestS": false},
    {"id": "pd-16", "name":"Lemon Cake","price":"300 Baht","category": "FruitCake", "bestS": false},
    {"id": "pd-17", "name":"Orange Cake","price":"300 Baht","category": "FruitCake", "bestS": false},
    {"id": "pd-18", "name":"Peach Cake","price":"300 Baht","category": "FruitCake", "bestS": false},
    {"id": "pd-19", "name":"Raspberry Cake","price":"300 Baht","category": "FruitCake", "bestS": false}, 
    {"id": "pd-20", "name":"Chinjung Cake","price":"300 Baht","category": "BabyCake", "bestS": false},
    {"id": "pd-21", "name":"Face Birthday Cake","price":"300 Baht","category": "BabyCake", "bestS": true},
    {"id": "pd-22", "name":"Hamburger Cake","price":"300 Baht","category": "BabyCake", "bestS": false},
    {"id": "pd-23", "name":"Pink Hat Cake","price":"300 Baht","category": "BabyCake", "bestS": false},
    {"id": "pd-24", "name":"Patrick Star Cake","price":"300 Baht","category": "BabyCake", "bestS": true},
    {"id": "pd-25", "name":"Clown Cake","price":"300 Baht","category": "FancyCake", "bestS": false},
    {"id": "pd-26", "name":"Heart Cake","price":"300 Baht","category": "FancyCake", "bestS": false},
    {"id": "pd-27", "name":"Strawberry Tree Cake","price":"300 Baht","category": "FancyCake", "bestS": false},
    {"id": "pd-28", "name":"Shiba Cake","price":"300 Baht","category": "FancyCake", "bestS": false},
    {"id": "pd-29", "name":"Green Birthday Cake","price":"300 Baht","category": "FancyCake", "bestS": false},
]
console.log(initData);

export const getProducts = async (query) => {
    let products = await localforage.getItem("products")
    if(!products){
        products = await setProduct(initData);
    }
    if (query) {
        products = products.filter(
            e => e.name && e.name.toLowerCase().indexOf(query) !== -1
        );
    }
    return products;
}

const setProduct = async (product) =>{
    return localforage.setItem("products", product);
}
import './App.css';
import Footer from './component/footer';
import Order from "./page/Order"
import Home , { homeLoader }from "./page/HomePage"
import NoOder from "./page/No-order"
import Navbar from './component/navigator';
import Product from "./page/Product"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements  } from "react-router-dom"
import UpdatePage from './page/UpdatePage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Home/>} loader={homeLoader}/>
        <Route path="/product" element={<Product />} />   
        <Route path="/order">
          <Route path=":cakeId" element={<Order />}/>
        </Route>
        <Route path="/noOrder" element={<NoOder />} />   
        <Route path="/basket" >
          <Route path=":cakeId" element={<UpdatePage/>}/>
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}


export default App;
//   
import "./App.css";
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import { TabContent } from "./TabContent/Content"
import { BiUser } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BsChatHeart } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { BsBox } from "react-icons/bs";
import { BiShoppingBag } from "react-icons/bi";
import {useState} from "react";
import {OrdersContext, UserContext} from "./TabContent/Context";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {AdminPanel} from "./TabContent/ProductsData";

function App() {
    const [activeButton, setActiveButton] = useState(1);
    const [orders, setOrders] = useState([]);
    const [userDataContex, setUserDataContex] = useState([]);
    const handleButtonClick  = (buttonNumber) => {
        setActiveButton(buttonNumber);
    }
    const [admP, setAdmP] = useState([...AdminPanel]);
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [check, setCheck] = useState(true);
    const [deliver, setDeliver] = useState("Yetgazib berish");
    const [totalPrice, setTotalPrice] = useState(0);

    const productAccess = () => {
        setCheck(admP[0].number === number && admP[0].password === password)
        setNumber("")
        setPassword("")
    }

  return (
      <OrdersContext.Provider value={{orders, setOrders}}>
          <UserContext.Provider value={{userDataContex, setUserDataContex, deliver, setDeliver, totalPrice, setTotalPrice}}>

              {check ? <Tab.Container id="list-group-tabs-example" defaultActiveKey="#Foydalanuvchilar">
                  <div className="d-flex">
                      <div className="left-dashboard">
                          <div className="text-center">
                              <h2 className="fw-bold pt-2 text-white">Rozgoor.uz</h2>
                          </div>
                          <ListGroup.Item action href="#Foydalanuvchilar" onClick={() => handleButtonClick(1)}>
                              <div className={activeButton === 1 ? "liActive activeMenu" : "liActive"}>
                                  <BiUser/> Foydalanuvchilar
                              </div>
                          </ListGroup.Item>
                          <ListGroup.Item action href="#Buyurtmalar" onClick={() => handleButtonClick(2)}>
                              <div className={activeButton === 2 ? "liActive activeMenu" : "liActive"}>
                                  <AiOutlineShoppingCart/> Buyurtmalar
                              </div>
                          </ListGroup.Item>
                          <ListGroup.Item action href="#Kategoriya" onClick={() => handleButtonClick(3)}>
                              <div className={activeButton === 3 ? "liActive activeMenu" : "liActive"}>
                                  <BsGrid/> Kategoriya
                              </div>
                          </ListGroup.Item>
                          <ListGroup.Item action href="#Mahsulotlar" onClick={() => handleButtonClick(4)}>
                              <div className={activeButton === 4 ? "liActive activeMenu" : "liActive"}>
                                  <MdOutlineProductionQuantityLimits/> Mahsulotlar
                              </div>
                          </ListGroup.Item>
                          <ListGroup.Item action href="#Chat" onClick={() => handleButtonClick(5)}>
                              <div className={activeButton === 5 ? "liActive activeMenu" : "liActive"}>
                                  <BsChatHeart/> Chat
                              </div>
                          </ListGroup.Item>
                          <ListGroup.Item action href="#Mahsulotlar-hajmi" onClick={() => handleButtonClick(6)}>
                              <div className={activeButton === 6 ? "liActive activeMenu" : "liActive"}>
                                  <BsBox/> Mahsulotlar hajmi
                              </div>
                          </ListGroup.Item>
                          <ListGroup.Item action href="#Products" onClick={() => handleButtonClick(7)}>
                              <div className={activeButton === 7 ? "liActive activeMenu" : "liActive"}>
                                  <BiShoppingBag/> Products
                              </div>
                          </ListGroup.Item>
                          <ListGroup.Item action onClick={() => handleButtonClick(8)}>
                              <div className={activeButton === 8 ? "liActive activeMenu" : "liActive"}>
                                  <CiSettings/> Sozlamalar
                              </div>
                          </ListGroup.Item>
                      </div>

                      <TabContent/>
                  </div>
              </Tab.Container> : <div className="PassAdmin">
                  <div className="pass">
                      <h1 className="fw-bold mb-4">Rozgoor.uz</h1>
                      <Form.Label className="fw-bold d-block">* Telefon
                          <Form.Control type="text" className="w-100" name="number" value={number} onChange={(e) => setNumber(e.target.value)}/>
                      </Form.Label>

                      <Form.Label className="fw-bold d-block">* Parol
                          <Form.Control type="password" className="w-100" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                      </Form.Label>
                      <Button variant="primary" className="mt-3" onClick={productAccess}>Kirish</Button>
                  </div>
              </div>}
          </UserContext.Provider>
      </OrdersContext.Provider>
  )
}

export default App;

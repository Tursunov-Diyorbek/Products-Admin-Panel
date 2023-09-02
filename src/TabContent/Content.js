import {Tab, Table, Button, Form,} from "react-bootstrap";
import { Category, Products } from "./ProductsData";
import { BsFullscreen, BsChatRightHeart } from 'react-icons/bs';
import { GiExitDoor } from 'react-icons/gi';
import { AiOutlineDelete, AiOutlineUserDelete, AiOutlineMenuUnfold, AiOutlineEye } from 'react-icons/ai';
import {useContext, useEffect, useState} from "react";
import {AddCategory, AddProduct, UserOrders} from "./Modals"
import {ProductsUsers} from "./Products";
import {UserContext} from "./Context";

export const TabContent = () => {
    const [category, setCategory] = useState(Category);
    const [products, setProducts] = useState(Products);
    const [categoryPro, setCategoryPro] = useState(category[0])
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show5, setShow5] = useState(false);
    const [addValue, setAddValue] = useState({
        img: "",
        title: "",
    });
    const [addValue2, setAddValue2] = useState({
        id: "",
        img: "",
        title: "",
        price: "",
    });
    const {userDataContex, setUserDataContex, deliver, setDeliver, totalPrice, setTotalPrice} = useContext(UserContext);
    const [userOrders, setUserOrders] = useState([]);


    // useEffect(() => {}, [setDeliver])

    const deleteCategorys = (id) => {
        setCategory((prev) => {
            return prev.filter((event) => {
                return event.id !== id
            })
        })
        setProducts((prev2) => {
            return prev2.filter((event2) => {
                return event2.category !== id
            })
        })
    }

    const deleteProducts = (id) => {
        setProducts((prev) => {
            return prev.filter((event) => {
                return event.id !== id
            })
        })
    }



    // Category Modal
    const categoryValues = (e) => {
        const { name, value } = e.target;
        setAddValue((prevState) => ({
            ...prevState, [name]: value,
        }));
    }

    const addCategory = () => {
        setShow(true)

        addValue.title = "";
        addValue.img = "";
    }
    const addCategoryClose = () => setShow(false);

    const validation = (title) => title.trim().length > 0;

    const saveCategory = () => {
        if (!validation(addValue.title && addValue.img)) return;
        setCategory((prevCategories) => [
            ...prevCategories,
            {
                img: addValue.img,
                title: addValue.title,
                isActive: false,
                id: category.length + 1,
            },
        ]);

        addCategoryClose()
    }










    // Product Modal
    const productValues = (e) => {
        const { name, value } = e.target;
        setAddValue2((prevState2) => ({
            ...prevState2, [name]: value,
        }));
    }
    const addProduct = () => {
        setShow2(true);

        addValue2.img = "";
        addValue2.title = "";
        addValue2.price = "";
    }
    const addProductClose = () => setShow2(false);

    const validation2 = (title) => title.trim().length > 0;

    const saveProduct = () => {
        const categoryProvalue = document.getElementById("categoryProvalue").value;

        if (!validation2(addValue2.title && addValue2.img && addValue2.price)) return;
        setProducts((prevCategories2) => [
            ...prevCategories2,
            {
                img: addValue2.img,
                title: addValue2.title,
                price: Number(addValue2.price),
                category: Number(categoryProvalue),
                isActive: false,
                id: products.length + 1,
            },
        ]);

        addProductClose()
    }


    const CategoryisActive = (event, index) => {
        const { value } = event.target;
        setCategory((prevCategories) => {
            return prevCategories.map((item, idx) => {
                if (idx === index) {
                    return { ...item, isActive: value === "Faol" };
                }
                return item;
            });
        });

    };
    const ProductisActive = (event, index) => {
        const { value } = event.target;
        setProducts((prevCategories) => {
            return prevCategories.map((item, idx) => {
                if (idx === index) {
                    return { ...item, isActive: value === "Faol" };
                }
                return item;
            });
        });
    };

    const deleteUser = (id) => {
        setUserDataContex((prev) => {
            return prev.filter((event) => {
                return event.id !== id
            })
        })
    }

    const changeNewUser = (holati, index) => {
        setUserDataContex((userDataContex) => [
            ...userDataContex.slice(0, index),
            { ...userDataContex[index], newUser: holati },
            ...userDataContex.slice(index + 1),
        ]);
    };

    const changeTolovHolati = (holati, index) => {
        setUserDataContex((userDataContex) => [
            ...userDataContex.slice(0, index),
            { ...userDataContex[index], tolovHolati: holati },
            ...userDataContex.slice(index + 1),
        ]);
    };

    const Cash = (holati, index) => {
        setUserDataContex((userDataContex) => [
            ...userDataContex.slice(0, index),
            { ...userDataContex[index], cash: holati },
            ...userDataContex.slice(index + 1),
        ]);
    };

    const Deliver = (holati, index) => {
        setUserDataContex((userDataContex) => [
            ...userDataContex.slice(0, index),
            { ...userDataContex[index], deliver: holati },
            ...userDataContex.slice(index + 1),
        ]);
    };


    const handleClose5 = () => setShow5(false);
    const handleShow5 = (index) => {
        setUserOrders(userDataContex[index])

        setShow5(true);
    }

    return <>
        <Tab.Content className="width">
            <Tab.Pane eventKey="#Foydalanuvchilar">
                <header className="d-flex align-items-center justify-content-between p-2 border-bottom border-3 border-success shadow">
                    <div className="d-flex align-items-center gap-2">
                        <AiOutlineMenuUnfold className="fs-4"/>
                        <h4 className="fw-bold m-0">Users</h4>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <Button variant="outline border"><BsFullscreen/></Button>
                        <Button variant="outline border"><GiExitDoor/></Button>
                    </div>
                </header>
                <div className="tableScroll">
                        <h3 className="m-0 fw-bold px-4 py-2">Jadval</h3>
                    <Table className="w-100 m-0 mt-3">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Ism</th>
                            <th>Username</th>
                            <th>Telefon</th>
                            <th>Buyurtmalar soni</th>
                            <th>Qo'shilgan sana</th>
                            <th>Operatsiya</th>
                        </tr>
                        </thead>
                        <tbody>
                            {userDataContex.map((item, index) => {
                                return <tr key={item.id}>
                                    <td className="fw-bold">{index + 1}</td>
                                    <td><BsChatRightHeart/> {item.name}</td>
                                    <td>{item.username}</td>
                                    <td>+998 {item.number} 📞</td>
                                    <td>{item.products.length} 🛒</td>
                                    <td>{item.data} ⏳</td>
                                    <td>
                                        <Button variant="danger btn-sm" onClick={() => deleteUser(item.id)}><AiOutlineUserDelete/></Button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </div>
            </Tab.Pane>
            <Tab.Pane eventKey="#Buyurtmalar">
                <header className="d-flex align-items-center justify-content-between p-2 border-bottom border-3 border-success shadow">
                    <div className="d-flex align-items-center gap-2">
                        <AiOutlineMenuUnfold className="fs-4"/>
                        <h4 className="fw-bold m-0">Orders</h4>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <Button variant="outline border"><BsFullscreen/></Button>
                        <Button variant="outline border"><GiExitDoor/></Button>
                    </div>
                </header>
                <div className="tableScroll">
                        <h3 className="m-0 fw-bold px-4 py-2">Jadval</h3>

                    <Table className="w-100 m-0 mt-3">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Mijoz</th>
                            <th>Tugallangan</th>
                            <th>Holati</th>
                            <th>Summa</th>
                            <th>To'lov holati</th>
                            <th>To'lov turi</th>
                            <th>Yetgazib berish turi</th>
                            <th>Buyurtma sanasi</th>
                            <th>Operatsiya</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userDataContex.map((item, index) => {
                            return <tr key={item.id} className="ordersTable">
                                <td className="fw-bold">{index + 1}</td>
                                <td>#{item.id}</td>
                                <td><BsChatRightHeart/> {item.name}</td>
                                {item.newUser === "Bekor qilindi" || item.tolovHolati === "To'lanmagan" ? <td className="text-danger">Tayyor emas</td>
                                    : <td className="text-success">Tayyor</td>}
                                <td>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={item.newUser}
                                        onChange={(e) => {
                                            changeNewUser(e.target.value, index);
                                        }}
                                        className={item.newUser === "Yangi" ? "border-info text-info" : ""
                                        || item.newUser === "Yetkazildi" ? "border-success text-success" : ""
                                        || item.newUser === "Bekor qilindi" ? "border-danger text-danger" : ""}
                                    >
                                        <option value="Yangi">Yangi 🙂</option>
                                        <option value="Yetkazildi">Yetkazildi 😇</option>
                                        <option value="Bekor qilindi">Bekor qilindi 😭</option>
                                    </Form.Select>
                                </td>
                                <td>{Intl.NumberFormat("en-En").format(totalPrice)} so'm</td>
                                <td>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={item.tolovHolati}
                                        onChange={(e) => {
                                            changeTolovHolati(e.target.value, index);
                                        }}
                                        className={item.tolovHolati === "To'lanmagan" ? "border-danger text-danger" :
                                            "border-success text-success"}
                                    >
                                        <option value="To'lanmagan">To'lanmagan 😢</option>
                                        <option value="To'langan">To'langan 🤑</option>
                                    </Form.Select>
                                </td>
                                <td>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={item.cash}
                                        onChange={(e) => {
                                            Cash(e.target.value, index);
                                        }}
                                    >
                                        <option value="Naqd pul">Naqd pul 💸</option>
                                        <option value="Payme">Payme 💰</option>
                                        <option value="Click">Click 💳</option>
                                    </Form.Select>
                                </td>
                                <td>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={item.deliver}
                                        onChange={(e) => {
                                            Deliver(e.target.value, index); setDeliver(e.target.value)
                                        }}
                                    >
                                        <option value="Yetgazib berish">Yetgazib berish 🚴‍♀️</option>
                                        <option value="Joyidan olib ketish">Olib ketish 🚶‍♂️</option>
                                    </Form.Select>
                                </td>
                                <td>{item.data} ⏳</td>
                                <td>
                                    <Button variant="danger btn-sm me-2" onClick={() => deleteUser(item.id)}><AiOutlineUserDelete/></Button>
                                    <Button variant="primary btn-sm" onClick={() => handleShow5(index)}><AiOutlineEye/></Button>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </Table>
                    </div>
            </Tab.Pane>
            <Tab.Pane eventKey="#Kategoriya">
                <header className="d-flex align-items-center justify-content-between p-2 border-bottom border-3 border-success shadow">
                    <div className="d-flex align-items-center gap-2">
                        <AiOutlineMenuUnfold className="fs-4"/>
                        <h4 className="fw-bold m-0">Category</h4>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <Button variant="outline border"><BsFullscreen/></Button>
                        <Button variant="outline border"><GiExitDoor/></Button>
                    </div>
                </header>
                <div className="tableScroll">
                    <div className="d-flex align-items-center justify-content-between px-4 py-2">
                        <h3 className="m-0 fw-bold">Jadval</h3>
                        <Button onClick={addCategory}>+ Qoshish</Button>
                    </div>
                <Table className="w-100 m-0 mt-3">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Rasm</th>
                        <th>Nomi</th>
                        <th>Holati</th>
                        <th>Operatsiya</th>
                    </tr>
                    </thead>
                    <tbody>
                    {category.map((item, index) => {
                        return <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td><img src={item.img} alt="rasm" className="proImg"/></td>
                            <td>{item.title}</td>
                            <td>
                                <Form.Select className="w-50" onChange={(event) => CategoryisActive(event, index)}>
                                    <option>Faol emas</option>
                                    <option>Faol</option>
                                </Form.Select>
                            </td>
                            <td>
                                <Button variant="danger" className="btn-sm" onClick={() => deleteCategorys(item.id)}><AiOutlineDelete/></Button>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </Table>
                </div>
            </Tab.Pane>
            <Tab.Pane eventKey="#Mahsulotlar">
                <header className="d-flex align-items-center justify-content-between p-2 border-bottom border-3 border-success shadow">
                    <div className="d-flex align-items-center gap-2">
                        <AiOutlineMenuUnfold className="fs-4"/>
                        <h4 className="fw-bold m-0">Products</h4>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <Button variant="outline border"><BsFullscreen/></Button>
                        <Button variant="outline border"><GiExitDoor/></Button>
                    </div>
                </header>
                <div className="tableScroll">
                    <div className="d-flex align-items-center justify-content-between px-4 py-2">
                        <h3 className="m-0 fw-bold">Jadval</h3>
                        <Button onClick={addProduct}>+ Qoshish</Button>
                    </div>
                    <Table className="w-100 m-0 mt-3">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Rasm</th>
                            <th>Nomi</th>
                            <th>Kategoriya</th>
                            <th>Narxi</th>
                            <th>Holati</th>
                            <th>Operatsiya</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((item2, index) => {
                            return <tr key={item2.id}>
                                <td>{index + 1}</td>
                                <td>{item2.id}</td>
                                <td><img src={item2.img} alt="rasm" className="proImg"/></td>
                                <td>{item2.title}</td>
                                {category.map((item3) => {
                                    if(item3.id === item2.category) {
                                       return <td key={item3.id}>{item3.title}</td>
                                    }
                                })}
                                <td>{Intl.NumberFormat("en-En").format(item2.action ? item2.action : item2.price)} so'm</td>
                                <td>
                                    <Form.Select className="w-75" onChange={(event) => ProductisActive(event, index)}>
                                        <option>Faol emas</option>
                                        <option>Faol</option>
                                    </Form.Select>
                                </td>
                                <td>
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteProducts(item2.id)}><AiOutlineDelete/></Button>
                                </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </Table>
                </div>
            </Tab.Pane>
            <Tab.Pane eventKey="#Chat">Chat</Tab.Pane>
            <Tab.Pane eventKey="#Mahsulotlar-hajmi">Mahsulot hajmi</Tab.Pane>
            <Tab.Pane eventKey="#Products">
               <ProductsUsers category={category} products={products} categoryPro={categoryPro} setCategoryPro={setCategoryPro}/>
            </Tab.Pane>
        </Tab.Content>

        <AddCategory show={show} addCategoryClose={addCategoryClose} categoryValues={categoryValues} saveCategory={saveCategory}/>
        <AddProduct show2={show2} addProductClose={addProductClose} productValues={productValues} saveProduct={saveProduct} category={category}/>
        <UserOrders show5={show5} handleClose5={handleClose5} userOrders={userOrders}/>
    </>;
}
import { useState, useContext, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { GiExitDoor, GiShoppingCart } from "react-icons/gi";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FcShop } from "react-icons/fc";
import { BsFullscreen } from "react-icons/bs";
import { ShoppingModal, SeeShopping } from "./Modals";
import { OrdersContext, UserContext } from "./Context";
import {TabContent} from "./Content";

export const ProductsUsers = (props) => {
  const [addSumm, setaddSumm] = useState(1);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [addProduct, setAddProduct] = useState(null);
  const { orders, setOrders } = useContext(OrdersContext);
  const { userDataContex, setUserDataContex, deliver, setDeliver, totalPrice, setTotalPrice } = useContext(UserContext);
  const [orderTotalPrice, setOrderTotalPrice] = useState(0);

  console.log(deliver)

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);

  const handleShow = () => {
    setShow(true);
    setaddSumm(1);
  };
  const handleShow2 = () => {
    setShow2(true);
  }


  useEffect(() => {
    setOrderTotalPrice(
        Object.values(orders)
            .map((item) =>
                item.action ? item.count * item?.action : item.count * item?.price
            )
            .reduce((prevValue, currentValue) => prevValue + currentValue, 0)
    );
  }, [orders])

  useEffect(() => {
    setTotalPrice(deliver === "Yetgazib berish" ? orderTotalPrice + 25000 : orderTotalPrice);
  }, [deliver, orderTotalPrice])

  const addSum = () => {
    setaddSumm(addSumm + 1);
  };
  const minusSum = () => {
    if (addSumm > 1) {
      setaddSumm(addSumm - 1);
    }
  };

  const addProducts = () => {
    setOrders((orders) => [
      ...orders,
      {
        id: orders.length + 1,
        count: addSumm,
        title: addProduct.title,
        img: addProduct.img,
        price: addProduct.price,
        action: addProduct.action,
      },
    ]);

    handleClose();
  };

  const deleteProduct = (id) => {
    setOrders((prev) => {
      return prev.filter((event) => {
        return event.id !== id;
      });
    });
  };

  const UserDataProducts = () => {
    setUserDataContex((userdata) => [
      ...userdata,
      {
        id: userDataContex.length + 1,
        name: "DIKO",
        number: 995542526,
        newUser: "Yangi",
        tolovHolati: "To'lanmagan",
        cash: "Naqd pul",
        deliver: deliver,
        data: new Date().toLocaleString("ru-Ru", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        products: orders,
      },
    ]);

    handleClose2();
  };

  return (
    <>
      <header className="d-flex align-items-center justify-content-between p-2 border-bottom border-3 border-success shadow">
        <div className="d-flex align-items-center gap-2">
          <AiOutlineMenuUnfold className="fs-4" />
          <h4 className="fw-bold m-0">Products User</h4>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Button variant="outline border">
            <BsFullscreen />
          </Button>
          <Button variant="outline border">
            <GiExitDoor />
          </Button>
        </div>
      </header>

      <div className="tableScroll">
        <Row className="container-fluid">
          {props.category
            .filter((item2) => item2.isActive === true)
            .map((item) => {
              return (
                <Col
                  xs={12}
                  md={6}
                  lg={4}
                  className="mt-3 cursor"
                  onClick={() => props.setCategoryPro(item)}
                  key={item.id}
                >
                  <div className="colStyle">
                    <img src={item.img} alt="rasm" />
                  </div>
                  <p className="m-0 mt-2 fw-bold">{item.title}</p>
                </Col>
              );
            })}
        </Row>
        <div className="container-fluid">
          <h2 className="m-0 fw-bold my-3">Mahsulotlar</h2>

          <div className="pb-3">
            {props.products
              .filter(
                (item2) =>
                  item2.category === props.categoryPro.id &&
                  item2.isActive === true &&
                  props.categoryPro.isActive === true
              )
              .map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className="d-flex align-items-center mt-3 pe-2 justify-content-between categoryHover"
                  >
                    <div className="d-flex align-items-center gap-4">
                      <img src={item.img} alt="rasm" className="categoryimg" />
                      <div>
                        <p className="m-0 fw-bold mb-2">{item.title}</p>
                        {item.action ? (
                          <p className="m-0 text-success">
                            {Intl.NumberFormat("en-En").format(item.action)}{" "}
                            <del className="text-danger">
                              {Intl.NumberFormat("en-En").format(item.price)}
                            </del>{" "}
                            so'm
                          </p>
                        ) : (
                          <p className="m-0 text-success">
                            {Intl.NumberFormat("en-En").format(item.price)} so'm
                          </p>
                        )}
                      </div>
                    </div>
                    <GiShoppingCart
                      className="shopping"
                      onClick={() => {
                        setAddProduct(item);
                        handleShow();
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <FcShop className="seeShopping" onClick={handleShow2} />
      </div>

      <ShoppingModal
        show={show}
        handleClose={handleClose}
        addSumm={addSumm}
        addSum={addSum}
        minusSum={minusSum}
        addProduct={addProduct}
        addProducts={addProducts}
      />
      <SeeShopping
        show2={show2}
        handleClose2={handleClose2}
        orders={orders}
        deleteProduct={deleteProduct}
        UserDataProducts={UserDataProducts}
        addProduct={addProduct}
        addSumm={addSumm}
        deliver={deliver}
        totalPrice={totalPrice}
        setDeliver={setDeliver}
      />
    </>
  );
};

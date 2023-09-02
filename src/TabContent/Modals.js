import {Button, Modal, Form, Table} from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {useContext} from "react";
import {MdDeleteForever} from "react-icons/md";
import {OrdersContext, UserContext} from "./Context";

export const AddCategory = (props) => {
    return (<>
            <Modal show={props.show} onHide={props.addCategoryClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel label="Category Img" className="mb-3">
                        <Form.Control type="text" placeholder="Category Img" name="img"
                                      onChange={props.categoryValues}/>
                    </FloatingLabel>

                    <FloatingLabel label="Title">
                        <Form.Control type="text" placeholder="Title" name="title" onChange={props.categoryValues}/>
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success fw-bold" onClick={props.saveCategory}>
                        Save Category
                    </Button>
                </Modal.Footer>
            </Modal>
        </>);
};

export const AddProduct = (props) => {
    return (<>
            <Modal show={props.show2} onHide={props.addProductClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel label="Product Img" className="mb-3">
                        <Form.Control type="text" placeholder="Product Img" name="img" onChange={props.productValues}/>
                    </FloatingLabel>

                    <FloatingLabel label="Title" className="mb-3">
                        <Form.Control type="text" placeholder="Title" name="title" onChange={props.productValues}/>
                    </FloatingLabel>

                    <FloatingLabel label="Narxi" className="mb-3">
                        <Form.Control type="text" placeholder="Narxi" name="price" onChange={props.productValues}/>
                    </FloatingLabel>

                    <FloatingLabel label="Kategoriya">
                        <Form.Select id="categoryProvalue">
                            <option></option>
                            {props.category.map((item) => {
                                return <option key={item.id} value={item.id}>{item.title}</option>
                            })}
                        </Form.Select>
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success fw-bold" onClick={props.saveProduct}>
                        Save Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </>)
};

export const ShoppingModal = (props) => {
    return (<>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Mahsulotlar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex align-items-center gap-3">
                        <img src={props.addProduct?.img} alt="rasm" className="proImg"/>
                        <div>
                            <p className="m-0 fw-bold">{props.addProduct?.title}</p>
                            {props.addProduct?.action ? (<p className="m-0">
                                    {Intl.NumberFormat("en-En").format(props.addProduct?.action)} so'm
                                </p>) : (<p className="m-0">
                                    {Intl.NumberFormat("en-En").format(props.addProduct?.price)} so'm
                                </p>)}
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 mt-3">
                        <Button
                            variant="btn-outline fw-bold border border-success"
                            onClick={props.minusSum}
                        >
                            -
                        </Button>
                        <span className="fw-bold fs-4">{props.addSumm}</span>
                        <Button
                            variant="btn-outline fw-bold border border-success"
                            onClick={props.addSum}
                        >
                            +
                        </Button>
                        <span className="fw-bold fs-4">
              {Intl.NumberFormat("en-En").format(props.addProduct?.action ? props.addSumm * props.addProduct?.action : props.addSumm * props.addProduct?.price)}{" "} so'm
            </span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={props.addProducts}>
                        Savatga joylash...
                    </Button>
                </Modal.Footer>
            </Modal>
        </>);
};

export const SeeShopping = (props) => {
    const {orders, setOrders} = useContext(OrdersContext);

    return <>
            <Modal show={props.show2} onHide={props.handleClose2} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Savatcha</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Object.values(orders).map((item, index) => {
                        return (<div
                                className="d-flex align-items-center gap-3 mb-3 border-bottom border-2 justify-content-between"
                                key={item.title}
                            >
                                <div className="d-flex align-items-center gap-4">
                                    <img src={item.img} alt="rasm" className="proImg"/>
                                    <div>
                                        <p className="m-0 fw-bold">{item.title}</p>
                                        {item.action ? (<p className="m-0">
                                                Narxi: {Intl.NumberFormat("en-En").format(item.action)}{" "}
                                                so'm
                                            </p>) : (<p className="m-0">
                                                Narxi: {Intl.NumberFormat("en-En").format(item.price)}{" "}
                                                so'm
                                            </p>)}
                                        <p className="m-0">
                                            {item.count} tasi -{" "}
                                            {item.action ? Intl.NumberFormat("en-En").format(item.action * item.count) : Intl.NumberFormat("en-En").format(item.price * item.count)}{" "}
                                            so'm
                                        </p>
                                    </div>
                                </div>
                                <MdDeleteForever
                                    className="fs-3 text-danger deleteicon"
                                    onClick={() => props.deleteProduct(item.id)}
                                />
                            </div>);
                    })}
                    <div className="d-flex align-items-center gap-4">
                        <p className="m-0 fw-bold">Buyurtma turi:</p>
                        <Form.Select
                            className="fw-bold text-success w-50"
                            value={props.deliver}
                            onChange={(e) => {props.setDeliver(e.target.value)}}
                        >
                            <option className="fw-bold" value="Yetgazib berish">Yetgazib berish</option>
                            <option className="fw-bold" value="Joyidan olib ketish">Joyidan olib ketish</option>
                        </Form.Select>
                    </div>
                    {props.deliver === "Yetgazib berish" ? (
                        <div className="d-flex align-items-center justify-content-between mt-3">
                            <p className="m-0 fw-bold fs-4">Yetgazib berish:</p>
                            <p className="fw-bold m-0 fs-4">25,000 so'm</p>
                        </div>) : null}
                    <div className="d-flex align-items-center justify-content-between mt-3">
                        <p className="m-0 fw-bold fs-4">Jami summa:</p>
                        <p className="m-0 fw-bold fs-4">
                            {Intl.NumberFormat("en-En").format(props.totalPrice)} so'm
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={props.UserDataProducts}>
                        Buyurtma berish
                    </Button>
                </Modal.Footer>
            </Modal>
        </>;
};

export const UserOrders = (props) => {
    const { totalPrice, setTotalPrice } = useContext(UserContext);

    return <Modal show={props.show5} onHide={props.handleClose5} centered>
        <Modal.Header closeButton className="p-2">
            <Modal.Title className="fs-5 fw-bold">Buyurtmalar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <span className="m-0 fw-bold smal">ID: </span><span className="smal">{props.userOrders.id}</span> <br/>
            <span className="m-0 fw-bold smal">Mijoz: </span><span className="smal">{props.userOrders.name}</span> <br/>
            <span className="m-0 fw-bold smal">Telefon raqam: </span><span className="smal">+998 {props.userOrders.number}</span> <br/>
            <span className="m-0 fw-bold smal">To'lov turi: </span><span className="smal">{props.userOrders.cash}</span> <br/>
            <hr/>
            <p className="fw-bold m-0 smal">Buyurtma:</p>
            <Table striped className="smal">
                <thead>
                <tr>
                    <th>Nomi</th>
                    <th>Miqdori</th>
                    <th>Narxi</th>
                    <th>Jami Narxi</th>
                </tr>
                </thead>
                <tbody>
                {props.userOrders.products?.map((item, index) => {
                    return <tr key={item.id}>
                        <td>{index + 1}) {item.title}</td>
                        <td>{item.count}</td>
                        <td>{Intl.NumberFormat("en-En").format(item.price)}</td>
                        <td>{Intl.NumberFormat("en-En").format(item.price * item.count)} so'm</td>
                    </tr>
                })}
                </tbody>
            </Table>
            <span className="fw-bold smal">Jami: </span><span className="smal">{Intl.NumberFormat("en-En").format(totalPrice)} so'm</span>
            <hr/>
            <span className="fw-bold smal">Buyurtma turi: </span><span className="smal">{props.userOrders.deliver}</span> <br/>
            {props.userOrders.deliver === "Yetgazib berish" ? <span className="fw-bold smal d-block">Yetgazib berish narxi: <span className="smal fw-normal">25,000 so'm</span></span> : ""}
            <span className="fw-bold smal">Umumiy summa: </span><span className="smal">{Intl.NumberFormat("en-En").format(totalPrice)} so'm</span> <br/>
            <span className="fw-bold smal">Holati: </span><span className="smal">{props.userOrders.newUser}</span>
        </Modal.Body>
    </Modal>
}
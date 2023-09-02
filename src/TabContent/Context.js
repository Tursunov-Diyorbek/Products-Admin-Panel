import React from "react";

export const OrdersContext = React.createContext({
    orders: [],
    setOrders: (orders) => {},
});

export const UserContext = React.createContext({
    userdata: [],
    setOrders: (userdata) => {},
    deliver: "Yetgazib berish",
    setDeliver: (deliver) => "",
});



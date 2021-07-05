import { lazy } from "react";

const GasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/customer/:customerId",
      component: lazy(() => import("./customer/Customer")),
    },
    {
      path: "/customer/new",
      component: lazy(() => import("./customer/Customer")),
    },
    {
      path: "/customers",
      component: lazy(() => import("./customers/Customers")),
    },
    {
      path: "/vehicle/:vehicleId",
      component: lazy(() => import("./vehicle/Vehicle")),
    },
    {
      path: "/vehicles",
      component: lazy(() => import("./vehicles/Vehicles")),
    },
    {
      path: "/product/:productId",
      component: lazy(() => import("./product/Product")),
    },
    {
      path: "/products",
      component: lazy(() => import("./products/Products")),
    }
  ],
};

export default GasConfig;

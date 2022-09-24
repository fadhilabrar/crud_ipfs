import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdHome,
  MdLock,
} from "react-icons/md";

// dashboard Imports
import Node1 from "views/dashboard/node1";
import Node2 from "views/dashboard/node2";
import Node3 from "views/dashboard/node3";
import Create from "views/create/allnodes";

const routesa = [
  {
    name: "All Nodes",
    layout: "/dashboard",
    path: "/node1",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Node1,
  },
  {
    name: "Node 2",
    layout: "/dashboard",
    path: "/node2",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    component: Node2,
  },
  {
    name: "Node 3",
    layout: "/dashboard",
    path: "/node3",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: Node3,
  },
  {
    name: "Add Item",
    layout: "/create",
    path: "/allnodes",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: Create,
    secondary:true,
  },
];

export default routesa;

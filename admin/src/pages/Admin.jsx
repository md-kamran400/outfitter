import React from "react";
import Sidebar from "../components/Sidebar";
import Addproduct from "../components/Addproduct";
import Listproducts from "../components/Listproducts";
import { Route, Routes } from "react-router-dom";

const Admin = () => {
  return (
    <div className="lg:flex">
      <Sidebar/>
      <Routes>
        <Route path="/addproduct" element={<Addproduct/>}/>
        <Route path="/listproduct" element={<Listproducts/>}/>
      </Routes>
    </div>
  );
};

export default Admin;

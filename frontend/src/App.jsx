import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Footer from "./components/Footer";
import bannermens from "./assets/bannermens.png";
import bannerwomens from "./assets/bannerwomens.png";
import bannerkids from "./assets/bannerkids.png";
import Checkout from "./components/Checkout";

export default function App() {
  return (
    <main className="bg-primary text-tartiary">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/mens"
            element={<Category category="men" banner={bannermens} />}
          />
          <Route
            path="/womens"
            element={<Category category="women" banner={bannerwomens} />}
          />
          <Route
            path="/kids"
            element={<Category category="kid" banner={bannerkids} />}
          />
          <Route path="/cart-page" element={<Cart />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

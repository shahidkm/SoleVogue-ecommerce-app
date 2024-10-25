import HomePage from "./HomePage";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import CartPage from "./CartPage";
import OrdersPage from "./OrderPage";

import { BrowserRouter as Router } from "react-router-dom";
import { Route,Routes } from "react-router-dom";
import ContextPage from "./ContextPage";
import AdminPage from "./AdminPage";
import About from "./About";

function RoutePage() {
  return (
    <ContextPage>
      <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="/signuppage" element={<SignupPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
        <Route path="adminpage" element={<AdminPage/>}/>
          <Route
            path="cartpage"
            element={
              
                <CartPage />
        
            }
          />
          <Route
            path="/orderpage"
            element={
            
                <OrdersPage />
              
            }
          />

          {/* Admin Routes */}
          {/* <Route
            path="/adminpage"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          /> */} {/* Commented out */}

          {/* Catch-All Route: Redirect undefined routes to HomePage */}
          
        </Routes>
      </Router>
    </ContextPage>
  );
}

export default RoutePage;

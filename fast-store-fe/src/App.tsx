import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { AuthState } from "./common/interface/user.interface";
import AddNewProduct from "./container/addNewProudct";
import LoginGoogle from "./container/login";
import ManagementPage from "./container/managementPage";
import HomePage from "./container/homePage";
import { RootState, store } from "./store";
import { authActions } from "./store/auth";

function App() {
        const authState = useSelector<RootState, AuthState>((api) => api.auth);

        useEffect(() => {
                const cookies = new Cookies();
                const authToken = cookies.get("auth-token");
                if (authToken) store.dispatch(authActions.updateLogin());
        }, []);

        return (
                <div className="flex flex-col min-h-screen p-2 bg-blue-100">
                        {authState.isLogin && (
                                <div className="flex justify-center space-x-4">
                                        <Link to="/">
                                                <div className="font-semibold duration-300 hover:text-blue-500">Trang Chủ</div>
                                        </Link>
                                        <Link to="/manager">
                                                <div className="font-semibold duration-300 hover:text-blue-500">Quản Lý</div>
                                        </Link>
                                        <Link to="/add-new">
                                                <div className="font-semibold duration-300 hover:text-blue-500">Thêm Sản Phẫm</div>
                                        </Link>
                                </div>
                        )}
                        <Switch>
                                <Route path="/login" component={LoginGoogle} />
                                <Route path="/manager" component={ManagementPage} />
                                <Route path="/add-new" component={AddNewProduct} />
                                <Route path="/" component={HomePage} />
                        </Switch>
                </div>
        );
}

export default App;

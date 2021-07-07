import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./layouts/Navigation"
import Post from "./pages/Posts";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PostDetails from "./pages/PostDetails";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";
import { Provider } from "react-redux";
import store from "./store";
import checkForToken from "./helpers/checkForToken";
import PrivateRoute from "./utils/PrivateRoute";
import UserPosts from "./pages/UserPosts";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";
import "placeholder-loading/dist/css/placeholder-loading.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";

//moment config
//import moment from "moment";
import "moment/locale/es"
import moment from "moment";


moment.locale("es")


checkForToken();

function App() {
  return ( //Redux como componente padre de la aplicacion

    <Provider store={store}>
      <Router>
        <div>
          <Navigation></Navigation>
        </div>
        <Container>
          <ToastContainer/>
          <Switch>
            <Route exact path="/" component={Post}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/post/:id" component={PostDetails}></Route>
            {/*Una ruta para los detalles del post publicos :id esto es el id del post */}
            <PrivateRoute exact path="/posts" component={UserPosts}></PrivateRoute>
            {/*Una ruta privada con nuestro componente creado */}
            <PrivateRoute exact path="/newpost" component={NewPost}></PrivateRoute>
            <PrivateRoute exact path="/editpost/:id" component={EditPost}></PrivateRoute>

            
          </Switch>
        </Container>
      </Router>
    </Provider>
  );

}

export default App;

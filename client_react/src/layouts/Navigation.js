import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
//import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../actions/authActions";

export default function Navigation() {

    const loggedIn = useSelector(state => state.auth.loggedIn); //Seleciona el loggedIn del state global authReducers
    const user = useSelector(state => state.auth.user); //Seleciona el usuario del state global authReducers
    const dispatch = useDispatch();

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg"> {/* Tema o color de la barra*/}
                <Navbar.Brand as={NavLink} to={"/"}> React Java</Navbar.Brand> {/* Crea un texto que al hacer click te envia a la ruta especificada/}
                <NavbarToggle aria-controls="main-menua"></NavbarToggle> {/* Crea una barra touch para celular */}
                <Navbar.Collapse id="main-menu">
                    <Nav className="mr-auto">
                        {loggedIn && <Nav.Link as={NavLink} to={"/newpost"}>Create Post</Nav.Link>/* Texto que da la Opcion para crear post */}    
                    </Nav>
                    <Nav>
                        {!loggedIn ? ( //Si el usuario no esta logeado quite estos omponentes
                            <React.Fragment> {/*Crea un fragmento sin traer componentes*/}
                                <Nav.Link as={NavLink} to={"/signup"}>Crear Cuenta</Nav.Link>{/* Texto que da la Opcion para crear cuenta */}
                                <Nav.Link as={NavLink} to={"/signin"}>Iniciar Sesion</Nav.Link>
                            </React.Fragment> // Si esta logeado traiga estos componentes
                        ):( <NavDropdown title={user.sub} id="menu-dropdown">{/* Crea una barra deplegable con la opcion post y cerrar sesion*/}
                                <NavDropdown.Item as={NavLink} to={"/posts"}>Mis posts </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => dispatch(logoutUser())}>Cerrar Sesion</NavDropdown.Item>{/*Al hacer click ejecuta la funcion  logoustUser*/}
                            </NavDropdown>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

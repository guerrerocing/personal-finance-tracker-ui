import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import authService from "../../services/authService";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    authService.logout();
    navigate("/login");
  };
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">FinanceTracker</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            onClick={handleLogOut}
          >
            LogOut
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;

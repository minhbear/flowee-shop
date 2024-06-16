import { Search } from "@mui/icons-material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { Badge } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { mobile } from "../../utilities/responsive";
import { useDispatch, useSelector } from "react-redux";
import { logoutDispatch } from "../../redux/apiCalls";
import LogoutIcon from "@mui/icons-material/Logout";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import KeyIcon from "@mui/icons-material/Key";
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Left side components

const Left = styled.div`
  /* width: 33.3%; */
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding: 0 4px;

  margin-left: 25px;
  /* padding: 10px; */
  /* border-radius: 20px; */
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

// Left side components

// Center side components

const Center = styled.div`
  /* width: 33.3%; */
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 50px;
  ${mobile({ fontSize: "24px" })}
`;

// Center side components

// Right side components

const Right = styled.div`
  /* width: 33.3%; */
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: "2", justifyContent: "flex-start" })}
`;

const MenuItem = styled.div`
  font-size: 18px;
  cursor: pointer;
  margin-left: 25px;
  position: relative;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Avatar = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 35px;
  height: 35 px;
`;
const PopUpBox = styled.div`
  position: absolute;
  right: -10px;
  background-color: #fff;
  box-shadow: rgba(112, 112, 120, 0.2) 0px 7px 29px 0px;
  width: 140px;
  height: 140px;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 2px;
  border-radius: 10px;
  z-index: 999;
`;
const Button = styled.button`
  border: none;
  width: 100%;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  background-color: transparent;
  font-size: 10px;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: #ccc;
  }
`;

// Right side components

const Navbar = () => {
  const navigate = useNavigate();

  // Get redux state
  // const dispatch = useDispatch();

  const handleLogout = () => {
    logoutDispatch(dispatch);
    navigate("/login");
  };

  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // Get cart from redux
  const cart = useSelector((state) => state.cart.cart) || {};
  const totalQuantity = cart.cartItems?.reduce(
    (acc, currentValue) => acc + currentValue.quantity,
    0
  );
  const [isPopup, setIsPopup] = useState(false);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>
            EN <ArrowDropDownOutlinedIcon />
          </Language>
          <SearchContainer>
            <Input
              placeholder="Search"
              style={{ padding: "6px 0", outline: "none" }}
            />
            <Search style={{ color: "gray", fontSize: "20px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            <NavLink
              to={"/home"}
              style={{ textDecoration: "none", color: "#000" }}
            >
              A'More.
            </NavLink>
          </Logo>
        </Center>
        <Right>
          {!user ? (
            <>
              <MenuItem onClick={() => navigate("/register")}>
                REGISTER
              </MenuItem>
              <MenuItem onClick={() => navigate("/login")}>SIGN IN</MenuItem>
              <MenuItem onClick={() => navigate("/cart")}>
                <Badge badgeContent={totalQuantity} color="primary">
                  <ShoppingCartOutlinedIcon style={{ fontSize: "30px" }} />
                </Badge>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={() => navigate("/cart")}>
                <Badge badgeContent={totalQuantity} color="primary">
                  <ShoppingCartOutlinedIcon style={{ fontSize: "30px" }} />
                </Badge>
              </MenuItem>
              <MenuItem onClick={() => setIsPopup(!isPopup)}>
                <Avatar
                  src={user.img ? user.img : "/images/utils/noavatar.png"}
                />
                {isPopup && (
                  <PopUpBox>
                    <Button>
                      <ModeEditOutlineIcon /> Edit Profile
                    </Button>
                    <Button>
                      <KeyIcon /> Change Password
                    </Button>
                    <Button
                      style={{ paddingRight: "10px" }}
                      onClick={handleLogout}
                    >
                      <LogoutIcon /> Log Out
                    </Button>
                  </PopUpBox>
                )}
              </MenuItem>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

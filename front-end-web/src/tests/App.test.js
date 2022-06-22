import { cleanup, render, screen } from '@testing-library/react';
import { logOut } from '../helperFunctions/helperLogin';
import MyCart from "../pages/MyCart"
import { BrowserRouter } from "react-router-dom"
import { testProducts } from './testData';
import userEvent from "@testing-library/user-event";
import Login from '../pages/Login';
import StoreLogin from "../pages/StoreLogin";
import ProductManagementLogin from "../pages/ProductManagementLogin";
import Header from '../components/Header';
import Filters from "../components/Filters"
import { add1Item, addNewItem, emptyCart, getCartItems } from '../helperFunctions/helperCartItems';
import {within} from '@testing-library/dom';
import Products from '../components/Products';
const TestRenderer = require('react-test-renderer');

afterEach(cleanup);

test('logout check', async () => {
   let originalLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));
   let originalUserId = JSON.parse(window.localStorage.getItem('user_id'));

   logOut()
   expect(JSON.parse(window.localStorage.getItem('logged_in'))).toBe(false);

   window.localStorage.setItem("logged_in", originalLoggedIn);
   window.localStorage.setItem("user_id", originalUserId);
});

test('check if we can proceed to checkout page when our basket is empty', async () => {
  let originalLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));
  let originalCart = JSON.parse(window.localStorage.getItem('cart_items'));
  window.localStorage.setItem("logged_in", true);
  window.localStorage.setItem('cart_items', JSON.stringify([]));

  render(<BrowserRouter><MyCart/></BrowserRouter>);
  expect(screen.getByText("Your Cart is Empty, Add Some Items First")).toBeInTheDocument();

  window.localStorage.setItem("cart_items", originalCart);
  window.localStorage.setItem("logged_in", originalLoggedIn);
});

test('check if we can proceed to checkout page when our purchase without logging in', async () => {
  let originalLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));
  window.localStorage.setItem("logged_in", false);

  render(<BrowserRouter><MyCart/></BrowserRouter>);
  expect(screen.getByText("Not Logged In Yet! Please Log In First")).toBeInTheDocument();

  window.localStorage.setItem("logged_in", originalLoggedIn);
});

test('check if we can proceed to checkout page when we are logged in and our cart is not empty', async () => {
  let originalCart = JSON.parse(window.localStorage.getItem('cart_items'));
  let originalLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));
  window.localStorage.setItem("logged_in", true);
  window.localStorage.setItem('cart_items', JSON.stringify(testProducts));

  render(<BrowserRouter><MyCart/></BrowserRouter>);
  expect(screen.getByText("Proceed to Checkout")).toBeInTheDocument();

  window.localStorage.setItem("logged_in", originalLoggedIn);
  window.localStorage.setItem("cart_items", originalCart);
});

test('checks log in with invalid email', async () => {
  render(<BrowserRouter><Login></Login></BrowserRouter>);

  userEvent.click(screen.getByText("LOGIN"))
  userEvent.type(screen.getByPlaceholderText(/email/i), "notAnEmail");
  userEvent.type(screen.getByPlaceholderText(/password/i), "564654");
  userEvent.click(await screen.findByRole('button', { name: "LOG IN" }))

  expect(screen.getByText(`Not a valid email address`)).toBeVisible();
});

test('check sign up with unmatching password and confirm password values', async () => {
  render(<BrowserRouter><Login></Login></BrowserRouter>);

  userEvent.click(screen.getByText("SIGNUP"));
  userEvent.type(screen.getByPlaceholderText("name"), "name");
  userEvent.type(screen.getByPlaceholderText("last name"), "lastname");
  userEvent.type(screen.getByPlaceholderText("tax ID"), "notPayingTaxes");
  userEvent.type(screen.getByPlaceholderText("email"), "address@correct.email");
  userEvent.type(screen.getByPlaceholderText("password"), "564654");
  userEvent.type(screen.getByPlaceholderText("confirm password"), "111111");
  userEvent.type(screen.getByPlaceholderText("home address"), "amazon");
  userEvent.click(await screen.findByRole('button', { name: "CREATE" }))

  expect(screen.getByText(`Passwords do not match`)).toBeVisible();
});

test('check sign up for sales manager unmatching password and confirm password values', async () => {
  render(<BrowserRouter><StoreLogin></StoreLogin></BrowserRouter>);

  userEvent.click(screen.getByText("SIGNUP"));
  userEvent.type(screen.getByPlaceholderText("name"), "name");
  userEvent.type(screen.getByPlaceholderText("password"), "564654");
  userEvent.type(screen.getByPlaceholderText("confirm password"), "111111");
  userEvent.click(await screen.findByRole('button', { name: "CREATE" }))

  expect(screen.getByText(`Passwords do not match`)).toBeVisible();
});

test('check sign up for product manager with unmatching password and confirm password values', async () => {
  render(<BrowserRouter><ProductManagementLogin></ProductManagementLogin></BrowserRouter>);

  userEvent.click(screen.getByText("SIGNUP"));
  userEvent.type(screen.getByPlaceholderText("name"), "name");
  userEvent.type(screen.getByPlaceholderText("password"), "564654");
  userEvent.type(screen.getByPlaceholderText("confirm password"), "111111");
  userEvent.click(await screen.findByRole('button', { name: "CREATE" }))

  expect(screen.getByText(`Passwords do not match`)).toBeVisible();
});

test('checks + - buttons on header', async () => {
  let originalCart = JSON.parse(window.localStorage.getItem('cart_items'));
  let originalLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));

  window.localStorage.setItem("logged_in", JSON.stringify(false));
  window.localStorage.setItem("cart_items", JSON.stringify([]));
  testProducts.forEach(item => {
    addNewItem(item)
  });

  render(<BrowserRouter><Header></Header></BrowserRouter>);

  userEvent.click(screen.getByText("My Cart"))
  const headerElement = screen.getByText(getCartItems()[0].title).closest("li");
  
  expect(getCartItems()[0].quantity).toBe(1);

  const plusButton = within(headerElement).getByRole('button', { name: "+" });
  userEvent.click(plusButton);
  
  expect(getCartItems()[0].quantity).toBe(2);

  const minusButton = within(headerElement).getByRole('button', { name: "-" });
  userEvent.click(minusButton);

  expect(getCartItems()[0].quantity).toBe(1);

  window.localStorage.setItem("cart_items", originalCart);
  window.localStorage.setItem("logged_in", originalLoggedIn);
});

test("create snapshot for sorting operation, check if it gets changed in the future", async () => {
  const tree = TestRenderer.create(<BrowserRouter><Products products={testProducts} sortBy={"Price high to low"} highToLow={true}></Products></BrowserRouter>)
  expect(tree).toMatchSnapshot();
})

test("create snapshot for display of filters, check if it gets changed in the future", async () => {
  let params = {
    author: [],
    category: "Non-fiction",
    page: "1",
    pr_lower: "0",
    pr_upper: "150",
    publisher: [],
    raiting: []
  }
  const tree = TestRenderer.create(<BrowserRouter><Filters products={testProducts} params={params}></Filters></BrowserRouter>)
  expect(tree).toMatchSnapshot();
})

test("check empty cart when not logged in", () => {
  let originalCart = JSON.parse(window.localStorage.getItem('cart_items'));
  let originalLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));

  window.localStorage.setItem("logged_in", JSON.stringify(false));
  window.localStorage.setItem("cart_items", JSON.stringify([]));
  emptyCart();
  expect(getCartItems()).toStrictEqual([]);

  window.localStorage.setItem("cart_items", originalCart);
  window.localStorage.setItem("logged_in", originalLoggedIn);
})

test("check add to cart when not logged in", () => {
  let originalCart = JSON.parse(window.localStorage.getItem('cart_items'));
  let originalLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));

  window.localStorage.setItem("logged_in", JSON.stringify(false));
  window.localStorage.setItem("cart_items", JSON.stringify([]));
  for(var i = 0; i < testProducts.length; i++){
    addNewItem(testProducts[i]);
  }
  expect(getCartItems()[0].quantity).toBe(1);

  add1Item(getCartItems()[0]);
  expect(getCartItems()[0].quantity).toBe(2);

  window.localStorage.setItem("cart_items", originalCart);
  window.localStorage.setItem("logged_in", originalLoggedIn);
})

// import {logIn, signUp, storeLogIn, storeSignUp, productManLogIn, productManSignUp} from '../helperFunctions/helperLogin';
// const app = express();
// setupProxy(app);

// test('checks log in with wrong credentials', async () => {
//   let originalLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));
//   let originalUserId = JSON.parse(window.localStorage.getItem('user_id'));

//   await logIn("someGarbageValueNotAnEmail", "00000000000");
//   expect(JSON.parse(window.localStorage.getItem('logged_in'))).toBe(false);

//   window.localStorage.setItem("logged_in", originalLoggedIn);
//   window.localStorage.setItem("user_id", originalUserId);
// });

// test('checks log in with right credentials', async () => {
//   let originalLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));
//   let originalUserId = JSON.parse(window.localStorage.getItem('user_id'));

//   await logIn("a@a.com", "123");
//   expect(JSON.parse(window.localStorage.getItem('logged_in'))).toBe(true);

//   window.localStorage.setItem("logged_in", originalLoggedIn);
//   window.localStorage.setItem("user_id", originalUserId);
// });

// test('store manager log in check', async () => {
//   let originalLoggedIn = JSON.parse(window.localStorage.getItem('store_logged_in'));
//   let originalUserId = JSON.parse(window.localStorage.getItem('user_id'));

//   await logIn();
//   expect(JSON.parse(window.localStorage.getItem('store_logged_in'))).toBe(false);

//   window.localStorage.setItem("store_logged_in", originalLoggedIn);
//   window.localStorage.setItem("store_manager_id", originalUserId);
// });


// test('product manager log in check', async () => {
//   let originalLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));
//   let originalUserId = JSON.parse(window.localStorage.getItem('user_id'));

//   await logIn("someGarbageValueNotAnEmail", "00000000000");
//   expect(JSON.parse(window.localStorage.getItem('logged_in'))).toBe(false);

//   window.localStorage.setItem("logged_in", originalLoggedIn);
//   window.localStorage.setItem("user_id", originalUserId);
// });

/*
test('checks sign up', async () => {
  let originalLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));
  let originalUserId = JSON.parse(window.localStorage.getItem('user_id'));

  await signUp("fName lName", "x@x.com", "123", "equatorial guinea", "0005423");
  expect(JSON.parse(window.localStorage.getItem('logged_in'))).toBe(true);
  //expect(JSON.parse(window.localStorage.getItem('user_id'))).toBe("x@x.com");

  window.localStorage.setItem("logged_in", originalLoggedIn);
  window.localStorage.setItem("user_id", originalUserId);
});

test('store manager sign up check', async () => {
  let originalLoggedIn = JSON.parse(window.localStorage.getItem('store_logged_in'));
  let originalUserId = JSON.parse(window.localStorage.getItem('store_manager_id'));

  await logIn("fName lName", "00000000000");
  expect(JSON.parse(window.localStorage.getItem('store_logged_in'))).toBe(false);

  window.localStorage.setItem("store_logged_in", originalLoggedIn);
  window.localStorage.setItem("store_manager_id", originalUserId);
});

test('product manager sign up check', async () => {
  let originalLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));
  let originalUserId = JSON.parse(window.localStorage.getItem('user_id'));

  await logIn("someGarbageValueNotAnEmail", "00000000000");
  expect(JSON.parse(window.localStorage.getItem('logged_in'))).toBe(false);

  window.localStorage.setItem("logged_in", originalLoggedIn);
  window.localStorage.setItem("user_id", originalUserId);
});*/
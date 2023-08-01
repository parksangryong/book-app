//장바구니 컨테이너
import "../css/ShoppingCart.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import CartSummary from "./CartSummary";

function ShoppingCart({ id }) {
  const [cartlist, setCartlist] = useState([]);
  const [re, setRe] = useState(0);
  const [its, setIts] = useState(0);
  const [moneys, setMoneys] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getCart();
    getMoneys();
  }, [re, msg]);

  const getCart = async () => {
    //console.log(id);
    const result = await axios.get(
      `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/cart/` +
        id
    );
    //console.log(result.data);
    setCartlist(result.data);
    setRe(result.data.length);
  };

  const changeRe = (op) => {
    setRe(re - op);
  };

  const changeMo = (op) => {
    setMsg(op);
    getMoneys();
  };

  const result = cartlist.map((data, index) => (
    <CartSummary
      key={index}
      id={data.id}
      user_id={data.user_id}
      book_id={data.book_id}
      quantity={data.quantity}
      title={data.title}
      author={data.author}
      price={data.price}
      image_url={data.image_url}
      inven={data.inven}
      changeRe={changeRe}
      changeMo={changeMo}
    />
  ));

  const getMoneys = () => {
    let moneysum = 0;
    let Itsum = 0;

    for (var i = 0; i < cartlist.length; i++) {
      moneysum += cartlist[i].price * cartlist[i].quantity;
      Itsum += cartlist[i].quantity;
    }

    setMoneys(moneysum);
    setIts(Itsum);
  };

  return (
    <div id="shopcart">
      <h2>Book Shop Cart ({re})</h2>
      {result}

      <div className="cartsub">
        <div className="subtext">
          총권수 : {its} 권 / 총가격 : {moneys} 원
        </div>
        <div className="subbtn">
          <button onClick={getMoneys}>전체 주문</button>
        </div>
      </div>

      <h5>{msg}</h5>
    </div>
  );
}

const mapStateToProps = (state) => ({
  id: state.auth.id,
});

export default connect(mapStateToProps)(ShoppingCart);

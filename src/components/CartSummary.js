//ShoppingCart에서보여주는 장바구니 요약 컴포넌트
import { useEffect, useState } from "react";
import "../css/ShoppingCart.css";
import axios from "axios";

function CartSummary(props) {
  const [quan, setQuan] = useState(props.quantity);
  const [money, setMoney] = useState(props.quantity * props.price);

  useEffect(() => {}, [quan]);

  const deleteCart = async () => {
    //console.log(props.id);
    const id = props.id;
    const result = await axios.delete(
      `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/cart`,
      { data: { id } }
    );
    //console.log(result);
    alert(result.data);
    props.changeRe(1);
  };

  const updateCart = async (q) => {
    //console.log(q, props.id);
    const upObj = { id: props.id, quantity: q };

    const result = await axios.put(
      `https://port-0-todolist-node-kvmh2mljl31rz6.sel4.cloudtype.app/cart`,
      upObj
    );
    //console.log(result.data);
    props.changeMo(props.title + "의 갯수변경: " + q);
  };

  const plusQ = () => {
    if (props.inven <= quan) {
      alert("최대 재고입니다.");
      return;
    }
    setQuan(quan + 1);
    setMoney((quan + 1) * props.price);
    updateCart(quan + 1);
  };

  const minusQ = () => {
    if (quan == 1) {
      alert("최소 구매 1권");
      return;
    }
    setQuan(quan - 1);
    setMoney((quan - 1) * props.price);
    updateCart(quan - 1);
  };

  return (
    <div id="cartbook">
      <h6>[{props.title}]</h6>
      <img src={props.image_url} />
      <div className="carttext">
        <div>작가: {props.author}</div>
        <div>남은 수: {props.inven} 권</div>
        <div className="cart-pm">
          <button onClick={minusQ}>-</button>
          &nbsp; {quan} 권 &nbsp;<button onClick={plusQ}>+</button>
        </div>
        <div>가격: {money} 원</div>

        <div className="cart-btn">
          <button>주문</button>
          <button onClick={deleteCart}>삭제</button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;

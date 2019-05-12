/** @jsx createVElement */

import {createVElement, diff, patch, toVNode} from "@transclusion/vdom";
import {handleHook, styled} from "../../";

const Headline = styled("h1")`
  font-size: ${props => props.size || 1}em;
`;

const Button = styled("button")`
  background: #f00;
  border: 0;
  font: inherit;

  &:hover {
    background: #00f;
  }
`;

function App(props) {
  const hook = {
    didInsert: elm => {
      elm.addEventListener("click", console.log);
    }
  };

  return (
    <div hook={hook} id="root">
      <Headline size={props.size}>Hello, world {props.size}</Headline>
      <Button on={{click: {type: "decrement"}}}>-</Button>
      <Button on={{click: {type: "increment"}}}>+</Button>
    </div>
  );
}

let element = document.getElementById("root");
let vNode = toVNode(element);
let state = {size: 1};

function handleEvent(msg) {
  if (typeof msg === "object") {
    switch (msg.type) {
      case "decrement":
        state = {...state, size: state.size - 1};
        render();
        break;
      case "increment":
        state = {...state, size: state.size + 1};
        render();
        break;
    }
  }
}

function render() {
  const nextVNode = <App {...state} />;
  element = patch(element, diff(vNode, nextVNode), handleEvent, handleHook);
  vNode = nextVNode;
}

render();

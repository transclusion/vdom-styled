# @transclusion/vdom-styled

CSS-in-JS for `@transclusion/vdom` (inspired by [`styled-components`](https://www.styled-components.com/)).

## Usage

```jsx
/* @jsx createVElement */

import { createVElement, diff, patch } from "@transclusion/vdom";
import { handleHook, styled } from "@transclusion/vdom-styled";

const noop = () => void 0;

const Headline = styled("h1")`
  font-size: ${props => props.size || 1}em;
`;

function App() {
  return (
    <div id="root">
      <Headline size={2}>Hello, world</Headline>
    </div>
  );
}

let vNode = <div id="root" />;

// Render app
patch(document.getElementById("root"), diff(vNode, <App />), noop, handleHook);
```

import {createNode, createVElement, diff, patch} from "@transclusion/vdom";
import {handleHook, styled} from "../src";

describe("styled-vdom", () => {
  it("should ...", () => {
    const Button = styled("button")`
      background: ${(props: any) => props.theme};
    `;

    const a = <div />;
    const b = (
      <div>
        <Button theme="blue">testing</Button>
      </div>
    );

    const element = createNode(a) as Element;

    patch(element, diff(a, b), () => void 0, handleHook);

    expect(element.outerHTML).toEqual(
      `<div><button theme="blue" class="sc-hIzgKM iFGbNQ">testing</button></div>`
    );

    expect(document.head.innerHTML).toEqual(`<style>/* sc-component-id: sc-hIzgKM */
.sc-hIzgKM {} .iFGbNQ{background:blue;}
</style>`);
  });
});

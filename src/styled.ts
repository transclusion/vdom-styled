import {createVElement} from "@transclusion/vdom";
import {hash} from "./hash";
import {insert, update} from "./hook";

function evalStylesValue(val: any, data: any) {
  if (typeof val === "function") {
    return val(data);
  }

  return val;
}

function evalStyles(strs: TemplateStringsArray, values: any[], props: any) {
  const len = strs.length;
  return strs.reduce((ret, str, idx) => {
    if (idx === len - 1) {
      return ret + str;
    }

    const val = values[idx];

    return ret + str + evalStylesValue(val, props) || "";
  }, "");
}

let componentCounter = 0;

export function styled(name: string) {
  return (strs: TemplateStringsArray, ...values: any[]) => {
    const componentId = `sc-${hash("sc" + componentCounter++)}`;

    const Component = ({children, ...data}: any) => {
      const cssBody = evalStyles(strs, values, data);
      const className = hash(componentId + cssBody);

      data.class = `${data.class ? `${data.class} ` : ""}${componentId} ${className}`;
      data.hook = {
        didInsert: insert(componentId, cssBody, className),
        didUpdate: update(componentId, cssBody, className)
      };

      return createVElement(name, data, ...children);
    };

    return Component;
  };
}

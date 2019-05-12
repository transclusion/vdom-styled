import stylis from "stylis";

const INSERT_HOOK = "@@sc/insert";
const UPDATE_HOOK = "@@sc/update";

export function insert(componentId: string, cssBody: string, className: string) {
  return {type: INSERT_HOOK, componentId, cssBody, className};
}

export function update(componentId: string, cssBody: string, className: string) {
  return {type: UPDATE_HOOK, componentId, cssBody, className};
}

let style: HTMLStyleElement;
function getStyleElement() {
  if (!style) {
    style = document.createElement("style");
    document.head.appendChild(style);
  }

  return style;
}

const cache: {instanceClasses: string[]} = {instanceClasses: []};

export function handleHook(val: any) {
  if (typeof val === "object") {
    if (val.type === INSERT_HOOK) {
      const instanceCss = stylis(`.${val.className}`, val.cssBody);

      cache.instanceClasses.push(val.className);

      getStyleElement().innerHTML += `/* sc-component-id: ${val.componentId} */
.${val.componentId} {} ${instanceCss}\n`;
    }

    if (val.type === UPDATE_HOOK) {
      if (cache.instanceClasses.indexOf(val.className) > -1) {
        return;
      }

      const instanceCss = stylis(`.${val.className}`, val.cssBody);

      cache.instanceClasses.push(val.className);

      getStyleElement().innerHTML += `${instanceCss}\n`;
    }
  }
}

export const getSelectionRange = (node: Node, range: Range) => {};

export const createCodeElement = (tagName: string, ...nodes: (string | Node)[]) => {
  const element = document.createElement(tagName);
  element.append(...nodes);
  return element;
};

export interface IGetSelectionAndRange {
  selection: Selection | null;
  focusNode: Node | null | undefined;
  selectionRange: Range | undefined;
}

export const getSelectionAndRange = (): IGetSelectionAndRange => {
  const selection = window.getSelection();
  const focusNode = selection?.focusNode;
  if (selection?.rangeCount === 0) {
    const selectionRange = undefined;
    return { selection, focusNode, selectionRange };
  }
  const selectionRange = selection?.getRangeAt(0);
  return { selection, focusNode, selectionRange };
};

export const isNodeIncludeFromTag = (node: Node | any | null, tagName: string) => {
  while (node && node.id !== 'editor') {
    if (node.nodeName === tagName.toUpperCase()) return node;
    node = node.parentElement;
  }
  return null;
};

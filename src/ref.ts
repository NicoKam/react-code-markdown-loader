class JSXRefProp {
  value = '';
  constructor(value) {
    this.value = value;
  }
  toString = () => {
    return this.value;
  };
}

export default function ref(str: string) {
  return new JSXRefProp(str);
}


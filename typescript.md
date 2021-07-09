# TypeScript 语法和应用

```typescript
// -？ 去除可选属性
[P in keyof T]-?: T[P];
// 检出属性
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface B {
  a: number;
  b: string;
  c: number;
}
let a: Pick<B, "a" | "b"> = { a: 0, b: "" };
```


# Shallow Memo

Shallow memo is useful for components that take arrays/objects as props. If the reference check (`===`) between two values fails, `shallow-memo` will perform a shallow comparison if the values are both arrays or both objects.

**Note:** If a component doesn't take any arrays/objects as props, this isn't very useful.

```bash
npm install shallow-memo
```

```js
import shallowMemo from "shallow-memo";

function MyComponent(props) {...};

const MemoizedMyComponent = React.memo(MyComponent, shallowMemo);
```

### Why?

Inline objects/arrays create a new object/array every render. This means that while two objects or two arrays may represent the same values, they are not equal (using a `===` reference check).

This function will fall let you use inline objects/arrays without unnecessary re-renders.

```jsx
// pass an inline object
ReactDOM.render((
  <React.Fragment>
    <MyComponent value={{ one: 1, two: 2 }} />
    <MemoizedMyComponent value={{ one: 1, two: 2 }} />
  </React.Fragment>
), root);

// re-rendering with the same values, but a different object
// the non-memoized component will re-render, but the memoized
// component will not
ReactDOM.render((
  <React.Fragment>
    <MyComponent value={{ one: 1, two: 2 }} />
    <MemoizedMyComponent value={{ one: 1, two: 2 }} />
  </React.Fragment>
), root);
```

### Children Props

This does not prevent re-renders when a component's `children` contains React elements.

```jsx
function Wrapper({ children }) {
  return <div>{children}</div>;
}
// This is only useful when children is NOT a React element
const MemoizedWrapper = React.memo(Wrapper, shallowMemo);

// will NOT re-render
<MemoizedWrapper>
  Hi!
</MemoizedWrapper>

// will NOT re-render
<MemoizedWrapper>
  {"test"}{"ing"}
</MemoizedWrapper>

// will re-render
<MemoizedWrapper>
  <Greeting value="Hi!" />
</MemoizedWrapper>

// will re-render
<MemoizedWrapper>
  {"test"}<span>ing</span>
</MemoizedWrapper>
```

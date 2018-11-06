# Shallow Memo

Shallow memo is useful for components that take arrays/objects as props. If the reference check (`===`) between two values fails, `shallow-memo` will perform a shallow comparison if the values are both arrays or both objects.

**Note:** If a component doesn't take any arrays/objects as props, this isn't very useful.

```bash
npm install shallow-memo
```

```js
import shallowMemo from "shallowMemo";

function MyComponent(props) {...};

export default React.memo(MyComponent, shallowMemo);
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

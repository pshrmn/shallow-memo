import "jest";
import React from "react";
import ReactDOM from "react-dom";

// @ts-ignore (resolved by jest)
import shallowMemo from "shallow-memo";

describe("Usage with React", () => {
  let node = document.createElement("div");
  
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  describe("object props", () => {
    let renderCount = 0;
    function TestComponent(props) {
      renderCount++;
      return <div>{JSON.stringify(props.obj)}</div>;
    }

    afterEach(() => {
      renderCount = 0;
    });

    it("Without shallowMemo, object with the same value will re-render", () => { 
      ReactDOM.render(<TestComponent obj={{ one: 1 }} />, node);
      expect(renderCount).toBe(1);
  
      ReactDOM.render(<TestComponent obj={{ one: 1 }} />, node);
      expect(renderCount).toBe(2);
    });

    it("Prevents re-renders for objects with the same value", () => {
      const MemoTestComponent = React.memo(TestComponent, shallowMemo);
  
      ReactDOM.render(<MemoTestComponent obj={{ one: 1 }} />, node);
      expect(renderCount).toBe(1);
  
      ReactDOM.render(<MemoTestComponent obj={{ one: 1 }} />, node);
      expect(renderCount).toBe(1);
    });

    it("Doesn't prevent re-renders for nested objects", () => {
      const MemoTestComponent = React.memo(TestComponent, shallowMemo);
  
      ReactDOM.render(<MemoTestComponent obj={{ one: 1, nested: {} }} />, node);
      expect(renderCount).toBe(1);
  
      ReactDOM.render(<MemoTestComponent obj={{ one: 1, nested: {} }} />, node);
      expect(renderCount).toBe(2);
    });

    describe("children", () => {
      it("element", () => {
        let renderCount = 0;
        function TestComponent(props) {
          renderCount++;
          return <div>{props.children}</div>;
        }
        const MemoTestComponent = React.memo(TestComponent, shallowMemo);
    
        ReactDOM.render((
          <MemoTestComponent>
            <div>Test</div>
          </MemoTestComponent>
        ), node);
        expect(renderCount).toBe(1);
    
        ReactDOM.render((
          <MemoTestComponent>
            <div>Test</div>
          </MemoTestComponent>
        ), node);
        expect(renderCount).toBe(2);
      });

      describe("array", () => {
        it("without elements", () => {
          let renderCount = 0;
          function TestComponent(props) {
            renderCount++;
            return <div>{props.children}</div>;
          }
          const MemoTestComponent = React.memo(TestComponent, shallowMemo);
      
          ReactDOM.render((
            <MemoTestComponent>
              {"Test"}{"ing"}
            </MemoTestComponent>
          ), node);
          expect(renderCount).toBe(1);
      
          ReactDOM.render((
            <MemoTestComponent>
              {"Test"}{"ing"}
            </MemoTestComponent>
          ), node);
          expect(renderCount).toBe(1);
        });

        it("with elements", () => {
          let renderCount = 0;
          function TestComponent(props) {
            renderCount++;
            return <div>{props.children}</div>;
          }
          const MemoTestComponent = React.memo(TestComponent, shallowMemo);
      
          ReactDOM.render((
            <MemoTestComponent>
              <span>Test</span><span>ing</span>
            </MemoTestComponent>
          ), node);
          expect(renderCount).toBe(1);
      
          ReactDOM.render((
            <MemoTestComponent>
              <span>Test</span><span>ing</span>
            </MemoTestComponent>
          ), node);
          expect(renderCount).toBe(2);
        });
      });
    });
  });

  describe("array props", () => {
    let renderCount = 0;
    function TestComponent(props) {
      renderCount++;
      return <div>{JSON.stringify(props.arr)}</div>;
    }

    afterEach(() => {
      renderCount = 0;
    });

    it("Without shallowMemo, object with the same value will re-render", () => { 
      ReactDOM.render(<TestComponent arr={[1,2,3]} />, node);
      expect(renderCount).toBe(1);
  
      ReactDOM.render(<TestComponent arr={[1,2,3]} />, node);
      expect(renderCount).toBe(2);
    });

    it("Prevents re-renders for objects with the same value", () => {
      const MemoTestComponent = React.memo(TestComponent, shallowMemo);
  
      ReactDOM.render(<MemoTestComponent arr={[1,2,3]} />, node);
      expect(renderCount).toBe(1);
  
      ReactDOM.render(<MemoTestComponent arr={[1,2,3]} />, node);
      expect(renderCount).toBe(1);
    });
  });
});

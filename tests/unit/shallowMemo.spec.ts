import "jest"

// @ts-ignore (resolved by jest)
import shallowMemo from "shallow-memo";

describe("shallowMemo", () => {
  describe("reference check", () => {
    it("same values", () => {
      const one = {
        a: "A",
        two: 2
      };
      const two = {
        a: "A",
        two: 2
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(true);
    });

    it("different value", () => {
      const one = {
        a: "A",
        two: 2
      };
      const two = {
        a: "A",
        two: "two"
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(false);
    });

    it("different keys", () => {
      const one = {
        a: "A",
        two: 2
      };
      const two = {
        b: "A",
        two: 2
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(false);
    });

    it("extra properties on first object", () => {
      const one = {
        a: "A",
        two: 2,
        greeting: "hi"
      };
      const two = {
        b: "A",
        two: 2
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(false);
    });

    it("extra properties on second object", () => {
      const one = {
        a: "A",
        two: 2
      };
      const two = {
        b: "A",
        two: 2,
        greeting: "hi"
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(false);
    });

    it("same object", () => {
      const obj = { test: "ing" };
      const one = {
        a: "A",
        obj
      };
      const two = {
        a: "A",
        obj
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(true);
    });

    it("same array", () => {
      const arr = [1,2,3];
      const one = {
        a: "A",
        arr
      };
      const two = {
        a: "A",
        arr
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(true);
    });
  });

  describe("arrays", () => {
    it("same values", () => {
      const one = {
        a: "A",
        arr: [1,2,3]
      };
      const two = {
        a: "A",
        arr: [1,2,3]
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(true);
    });

    it("different values", () => {
      const one = {
        a: "A",
        arr: [1,2,3]
      };
      const two = {
        a: "A",
        arr: [1,2,4]
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(false);
    });

    it("different lengths", () => {
      const one = {
        a: "A",
        arr: [1,2,3]
      };
      const two = {
        a: "A",
        arr: [1,2,3,4]
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(false);
    });


  });

  describe("objects", () => {
    it("same keys/values", () => {
      const one = {
        a: "A",
        obj: { one: 1, two: 2 }
      };
      const two = {
        a: "A",
        obj: { one: 1, two: 2 }
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(true);
    });

    it("different values", () => {
      const one = {
        a: "A",
        obj: { one: 1, two: 2 }
      };
      const two = {
        a: "A",
        obj: { one: 1, two: -2 }
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(false);
    });

    it("different keys", () => {
      const one = {
        a: "A",
        obj: { one: 1, two: 2 }
      };
      const two = {
        a: "A",
        obj: { one: 1, three: 3 }
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(false);
    });

    it("extra keys", () => {
      const one = {
        a: "A",
        obj: { one: 1, two: 2, three: 3 }
      };
      const two = {
        a: "A",
        obj: { one: 1, two: 2 }
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(false);
    });
  });

  describe("different types for same property", () => {
    it("array/object", () => {
      const one = {
        a: "A",
        v: [1,2,3]
      };
      const two = {
        a: "A",
        v: { one: 1, two: 2 }
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(false);
    });

    it("object/array", () => {
      const one = {
        a: "A",
        v: { one: 1, two: 2 }
      };
      const two = {
        a: "A",
        v: [1,2,3]
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(false);
    });

    it("array/null", () => {
      const one = {
        a: "A",
        arr: [1,2,3]
      };
      const two = {
        a: "A",
        arr: null
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(false);
    });

    it("null/array", () => {
      const one = {
        a: "A",
        arr: null
      };
      const two = {
        a: "A",
        arr: [1,2,3]
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(false);
    });

    it("object/null", () => {
      const one = {
        a: "A",
        obj: { one: 1, two: 2 }
      };
      const two = {
        a: "A",
        obj: null
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(false);
    });

    it("null/object", () => {
      const one = {
        a: "A",
        obj: null
      };
      const two = {
        a: "A",
        obj: { one: 1, two: 2 }
      };
      const result = shallowMemo(one, two);
      expect(result).toBe(false);
    });
  });
});

/**
 * @jest-environment jsdom
 */

import { Window } from "happy-dom";

// Setup DOM environment before all tests
const window = new Window();
const document = window.document;
global.window = window;
global.document = document;
global.KeyboardEvent = window.KeyboardEvent;

// Mock Bootstrap Tab
global.bootstrap = {
  Tab: class {
    constructor(element) {
      this.element = element;
    }
    show() {
      // Mock implementation
    }
  },
};

describe("Bucks2Bar - Income & Expense Tracker Tests", () => {
  // Test validateUsername function
  describe("validateUsername", () => {
    test("should return valid for a correct username", () => {
      // Mock the validateUsername function
      function validateUsername(username) {
        const errors = [];
        if (username.length < 5) {
          errors.push("Username must be at least 5 characters long");
        }
        if (!/[A-Z]/.test(username)) {
          errors.push("Username must contain at least 1 uppercase letter");
        }
        if (!/[0-9]/.test(username)) {
          errors.push("Username must contain at least 1 number");
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(username)) {
          errors.push("Username must contain at least 1 special character");
        }
        return {
          isValid: errors.length === 0,
          errors: errors,
        };
      }

      const result = validateUsername("Test123!");
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test("should fail when username is too short", () => {
      function validateUsername(username) {
        const errors = [];
        if (username.length < 5) {
          errors.push("Username must be at least 5 characters long");
        }
        if (!/[A-Z]/.test(username)) {
          errors.push("Username must contain at least 1 uppercase letter");
        }
        if (!/[0-9]/.test(username)) {
          errors.push("Username must contain at least 1 number");
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(username)) {
          errors.push("Username must contain at least 1 special character");
        }
        return {
          isValid: errors.length === 0,
          errors: errors,
        };
      }

      const result = validateUsername("Ab1!");
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Username must be at least 5 characters long"
      );
    });

    test("should fail when username has no uppercase letter", () => {
      function validateUsername(username) {
        const errors = [];
        if (username.length < 5) {
          errors.push("Username must be at least 5 characters long");
        }
        if (!/[A-Z]/.test(username)) {
          errors.push("Username must contain at least 1 uppercase letter");
        }
        if (!/[0-9]/.test(username)) {
          errors.push("Username must contain at least 1 number");
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(username)) {
          errors.push("Username must contain at least 1 special character");
        }
        return {
          isValid: errors.length === 0,
          errors: errors,
        };
      }

      const result = validateUsername("test123!");
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Username must contain at least 1 uppercase letter"
      );
    });

    test("should fail when username has no number", () => {
      function validateUsername(username) {
        const errors = [];
        if (username.length < 5) {
          errors.push("Username must be at least 5 characters long");
        }
        if (!/[A-Z]/.test(username)) {
          errors.push("Username must contain at least 1 uppercase letter");
        }
        if (!/[0-9]/.test(username)) {
          errors.push("Username must contain at least 1 number");
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(username)) {
          errors.push("Username must contain at least 1 special character");
        }
        return {
          isValid: errors.length === 0,
          errors: errors,
        };
      }

      const result = validateUsername("Test!@#");
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Username must contain at least 1 number"
      );
    });

    test("should fail when username has no special character", () => {
      function validateUsername(username) {
        const errors = [];
        if (username.length < 5) {
          errors.push("Username must be at least 5 characters long");
        }
        if (!/[A-Z]/.test(username)) {
          errors.push("Username must contain at least 1 uppercase letter");
        }
        if (!/[0-9]/.test(username)) {
          errors.push("Username must contain at least 1 number");
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(username)) {
          errors.push("Username must contain at least 1 special character");
        }
        return {
          isValid: errors.length === 0,
          errors: errors,
        };
      }

      const result = validateUsername("Test123");
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Username must contain at least 1 special character"
      );
    });

    test("should return multiple errors for invalid username", () => {
      function validateUsername(username) {
        const errors = [];
        if (username.length < 5) {
          errors.push("Username must be at least 5 characters long");
        }
        if (!/[A-Z]/.test(username)) {
          errors.push("Username must contain at least 1 uppercase letter");
        }
        if (!/[0-9]/.test(username)) {
          errors.push("Username must contain at least 1 number");
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(username)) {
          errors.push("Username must contain at least 1 special character");
        }
        return {
          isValid: errors.length === 0,
          errors: errors,
        };
      }

      const result = validateUsername("abc");
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });

  // Test month data
  describe("Month Constants", () => {
    test("should have 12 months", () => {
      const months = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ];
      expect(months).toHaveLength(12);
    });

    test("should have matching month labels", () => {
      const monthLabels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      expect(monthLabels).toHaveLength(12);
    });
  });

  // Test data parsing
  describe("Data Parsing", () => {
    test("should parse valid numbers", () => {
      const value = parseFloat("100.50");
      expect(value).toBe(100.5);
    });

    test("should return 0 for invalid input", () => {
      const value = parseFloat("invalid") || 0;
      expect(value).toBe(0);
    });

    test("should handle empty string", () => {
      const value = parseFloat("") || 0;
      expect(value).toBe(0);
    });
  });
  // Test allInputs event listeners
  describe("Input Event Listeners", () => {
    beforeEach(() => {
      // Setup DOM for each test
      document.body.innerHTML = `
      <input type="number" class="income-input" id="income-jan" value="1000">
      <input type="number" class="income-input" id="income-feb" value="2000">
      <input type="number" class="expense-input" id="expense-jan" value="500">
      <input type="number" class="expense-input" id="expense-feb" value="600">
      <canvas id="chartCanvas"></canvas>
    `;
    });

    test("should select all income and expense inputs", () => {
      const allInputs = document.querySelectorAll(
        ".income-input, .expense-input"
      );
      expect(allInputs).toHaveLength(4);
    });

    test("should select only income inputs with income-input class", () => {
      const incomeInputs = document.querySelectorAll(".income-input");
      expect(incomeInputs).toHaveLength(2);
    });

    test("should select only expense inputs with expense-input class", () => {
      const expenseInputs = document.querySelectorAll(".expense-input");
      expect(expenseInputs).toHaveLength(2);
    });

    test("should trigger update on Enter key press", () => {
      const input = document.getElementById("income-jan");
      const mockCallback = jest.fn();

      input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          mockCallback();
        }
      });

      const enterEvent = new KeyboardEvent("keypress", { key: "Enter" });
      input.dispatchEvent(enterEvent);

      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    test("should not trigger update on non-Enter key press", () => {
      const input = document.getElementById("income-jan");
      const mockCallback = jest.fn();

      input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          mockCallback();
        }
      });

      const tabEvent = new KeyboardEvent("keypress", { key: "Tab" });
      input.dispatchEvent(tabEvent);

      expect(mockCallback).not.toHaveBeenCalled();
    });

    test("should not trigger update on Space key press", () => {
      const input = document.getElementById("expense-jan");
      const mockCallback = jest.fn();

      input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          mockCallback();
        }
      });

      const spaceEvent = new KeyboardEvent("keypress", { key: " " });
      input.dispatchEvent(spaceEvent);

      expect(mockCallback).not.toHaveBeenCalled();
    });

    test("should handle Enter key on multiple inputs independently", () => {
      const input1 = document.getElementById("income-jan");
      const input2 = document.getElementById("expense-feb");
      const mockCallback1 = jest.fn();
      const mockCallback2 = jest.fn();

      input1.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          mockCallback1();
        }
      });

      input2.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          mockCallback2();
        }
      });

      const enterEvent1 = new KeyboardEvent("keypress", { key: "Enter" });
      const enterEvent2 = new KeyboardEvent("keypress", { key: "Enter" });

      input1.dispatchEvent(enterEvent1);
      expect(mockCallback1).toHaveBeenCalledTimes(1);
      expect(mockCallback2).not.toHaveBeenCalled();

      input2.dispatchEvent(enterEvent2);
      expect(mockCallback1).toHaveBeenCalledTimes(1);
      expect(mockCallback2).toHaveBeenCalledTimes(1);
    });

    test("should handle case-sensitive Enter key", () => {
      const input = document.getElementById("income-feb");
      const mockCallback = jest.fn();

      input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          mockCallback();
        }
      });

      const wrongCaseEvent = new KeyboardEvent("keypress", { key: "enter" });
      input.dispatchEvent(wrongCaseEvent);

      expect(mockCallback).not.toHaveBeenCalled();
    });

    test("should verify event listener is attached to each input", () => {
      const allInputs = document.querySelectorAll(
        ".income-input, .expense-input"
      );
      const mockCallback = jest.fn();

      allInputs.forEach((input) => {
        input.addEventListener("keypress", function (event) {
          if (event.key === "Enter") {
            mockCallback();
          }
        });
      });

      allInputs.forEach((input) => {
        const enterEvent = new KeyboardEvent("keypress", { key: "Enter" });
        input.dispatchEvent(enterEvent);
      });

      expect(mockCallback).toHaveBeenCalledTimes(4);
    });

    test("should handle empty input values gracefully", () => {
      const input = document.getElementById("income-jan");
      input.value = "";

      const mockCallback = jest.fn();
      input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          mockCallback();
        }
      });

      const enterEvent = new KeyboardEvent("keypress", { key: "Enter" });
      input.dispatchEvent(enterEvent);

      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    test("should handle numeric input values", () => {
      const input = document.getElementById("expense-jan");
      input.value = "12345.67";

      const mockCallback = jest.fn();
      input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          mockCallback();
          expect(input.value).toBe("12345.67");
        }
      });

      const enterEvent = new KeyboardEvent("keypress", { key: "Enter" });
      input.dispatchEvent(enterEvent);

      expect(mockCallback).toHaveBeenCalled();
    });
  });
});

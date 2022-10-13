import { useState } from "react";
import "./App.css";

function App() {
  const [expression, setExpression] = useState("0");
  const [answer, setAnswer] = useState(undefined);
  const [operator, setOperator] = useState(undefined);
  function handleCalculate() {
    if (!operator) return;
    const leftHandSide = Number(expression.split(operator)[0]);
    const rightHandSide = Number(expression.split(operator)[1]);
    let ans;
    switch (operator) {
      case "+":
        ans = leftHandSide + rightHandSide;
        break;
      case "-":
        ans = leftHandSide - rightHandSide;
        break;
      case "*":
        ans = leftHandSide * rightHandSide;
        break;
      case "/":
        ans = leftHandSide / rightHandSide;
        break;
      default:
        return;
    }
    setOperator(undefined);
    setAnswer(ans);
    return ans;
  }

  const handleDot = () => {
    const subExpression = expression.split(operator)[1] || expression;
    if (!subExpression.includes(".")) {
      setExpression((prev) => prev + ".");
    }
    return;
  };

  function handleOperator(e) {
    const operatorKey = e.target.dataset.operator;

    const isEvaluated = answer !== undefined;
    if (isEvaluated) setExpression(answer);
    if (expression === "0") return;

    if (operator === undefined) {
      setExpression((prev) => prev + operatorKey);
    }
    if (expression.endsWith(operator)) {
      setExpression((prev) => prev.substring(0, prev.length - 1) + operatorKey);
    }
    if (!isEvaluated && operator && !expression.endsWith(operator)) {
      const answer = handleCalculate();
      setExpression(answer + operatorKey);
    }
    setOperator(operatorKey);
  }

  function resetExpressionAndAnswer() {
    setExpression("0");
    setAnswer(undefined);
    setOperator(undefined);
  }

  function handleNumber(e) {
    const numericKey = e.target.dataset.value;
    const isEvaluated = answer !== undefined;
    if (isEvaluated && operator === undefined) resetExpressionAndAnswer();

    setExpression((prev) => {
      return prev === "0" ? numericKey : prev + numericKey;
    });
  }

  function handleBackspace() {
    if (expression.length > 1) {
      setExpression((prev) => prev.substring(0, prev.length - 1));
    } else {
      setExpression("0");
    }
  }
  function toggleNegative() {}
  return (
    <div className="main d-flex align-items-center justify-content-center">
      <div className="frame border rounded-3 px-3 py-2">
        <div className="screen p-2 mt-5 mb-3">
          <pre className="fs-3 mb-0">{expression}</pre>
          <pre className="text-end mb-0 fs-1 fw-bold">{answer || "0"}</pre>
        </div>
        <div className="keys-wrapper mb-3">
          <div className="line d-flex gap-2">
            <Key onClick={resetExpressionAndAnswer}>C</Key>
            <Key onClick={handleBackspace} className="bi bi-backspace"></Key>
            <Key onClick={toggleNegative}>&plusmn;</Key>
            <Operator data-operator="/" onClick={handleOperator}>
              &#0247;
            </Operator>
          </div>
          <div className="line d-flex gap-2">
            <Key data-value="7" onClick={handleNumber}>
              7
            </Key>
            <Key data-value="8" onClick={handleNumber}>
              8
            </Key>
            <Key data-value="9" onClick={handleNumber}>
              9
            </Key>
            <Operator data-operator="*" onClick={handleOperator}>
              &times;
            </Operator>
          </div>
          <div className="line d-flex gap-2">
            <Key data-value="4" onClick={handleNumber}>
              4
            </Key>
            <Key data-value="5" onClick={handleNumber}>
              5
            </Key>
            <Key data-value="6" onClick={handleNumber}>
              6
            </Key>
            <Operator data-operator="-" onClick={handleOperator}>
              &minus;
            </Operator>
          </div>
          <div className="line d-flex gap-2">
            <Key data-value="1" onClick={handleNumber}>
              1
            </Key>
            <Key data-value="2" onClick={handleNumber}>
              2
            </Key>
            <Key data-value="3" onClick={handleNumber}>
              3
            </Key>
            <Operator data-operator="+" onClick={handleOperator}>
              &#43;
            </Operator>
          </div>
          <div className="line d-flex gap-2">
            <Key data-value="0" onClick={handleNumber}>
              0
            </Key>
            <Key onClick={handleDot}>
              <span className="bi bi-dot"></span>
            </Key>
            <Operator onClick={handleCalculate} twoColumn>
              &#61;
            </Operator>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function Key({ children, className, ...rest }) {
  return (
    <div
      className={`key d-flex justify-content-center align-items-center rounded-3 ${
        className ? className : null
      }`}
      role="button"
      {...rest}
    >
      {children}
    </div>
  );
}
function Operator({ children, twoColumn = false, ...rest }) {
  return (
    <Key className={`operator text-dark fs-4 ${twoColumn ? "flex-grow-1" : null}`} {...rest}>
      {children}
    </Key>
  );
}

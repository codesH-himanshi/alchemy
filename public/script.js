class Calculator {
  constructor() {
    this.currentInput = '0';
    this.calculationHistory = '';
    this.operation = null;
    this.resetScreen = false;
    this.history = [];
    this.maxHistory = 10;
  }

  appendNumber(number) {
    if (this.currentInput === '0' || this.resetScreen) {
      this.currentInput = number;
      this.resetScreen = false;
    } else {
      this.currentInput += number;
    }
    this.updateHistory(number, false);
  }

  handleOperation(op) {
    const normalizedOp = op === '-' ? '−' : op;
    if (this.operation !== null) this.compute();
    this.operation = op;
    this.updateHistory(op, true);
    this.previousInput = this.currentInput;
    this.resetScreen = true;
  }

  updateHistory(value, isOperator) {
    if (isOperator) {
      this.calculationHistory += ` ${value} `;
    } else {
      if (this.resetScreen) {
        this.calculationHistory = '';
      }
      this.calculationHistory += value;
    }
  }

  addToHistory(calculation) {
    this.history.unshift(calculation); // Add to beginning
    if (this.history.length > this.maxHistory) {
      this.history.pop(); // Remove oldest if over limit
    }
    this.updateHistoryDisplay();
  }

  updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = this.history
      .map(entry => `<div class="history-entry">${entry}</div>`)
      .join('');
  }

  backspace() {
    if (this.currentInput.length === 1 || this.resetScreen) {
      this.currentInput = '0';
      this.resetScreen = false;
    } else {
      this.currentInput = this.currentInput.slice(0, -1);
    }
    this.calculationHistory = this.calculationHistory.slice(0, -1);
    if (this.calculationHistory === '') {
      this.calculationHistory = '0';
    }
  }

  clear() {
    this.currentInput = '0';
    this.calculationHistory = '';
    this.previousInput = null;
    this.operation = null;
    this.resetScreen = false;
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousInput);
    const current = parseFloat(this.currentInput);
    const historyEntry = `${this.previousInput} ${this.operation} ${this.currentInput} = ${this.currentInput}`;
    this.addToHistory(historyEntry);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+': computation = prev + current; break;
      case '-': computation = prev - current; break;
      case '*': computation = prev * current; break;
      case '/': computation = prev / current; break;
      case '%': computation = prev % current; break;
      default: return;
    }

    this.currentInput = computation.toString();
    this.operation = null;
    this.calculationHistory += ` = ${this.currentInput}`;
  }

  clearHistory() {
    this.history = [];
    this.updateHistoryDisplay();
  }

  toggleSign() {
    this.currentInput = (parseFloat(this.currentInput) * -1).toString();
  }

  addDecimal() {
    if (this.resetScreen) {
      this.currentInput = '0.';
      this.resetScreen = false;
      return;
    }
    if (!this.currentInput.includes('.')) {
      this.currentInput += '.';
    }
  }

  updateDisplay() {
    document.getElementById('display').textContent = this.currentInput;
    document.getElementById('calculation').textContent = this.calculationHistory;
  }

  handleKeyInput(key) {
    const keyActions = {
      '=': () => this.compute(),
      'Enter': () => this.compute(),
      'C': () => this.clear(),
      'Delete': () => this.clear(),
      '⌫': () => this.backspace(),
      'Backspace': () => this.backspace(),
      'Tab': () => this.toggleSign(),
      '±': () => this.toggleSign(),
      '.': () => this.addDecimal()
    };

    if (key in keyActions) {
      keyActions[key]();
    } else if (/[0-9]/.test(key)) {
      this.appendNumber(key);
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
      this.handleOperation(key);
    }
    this.updateDisplay();
  }
}


document.addEventListener('DOMContentLoaded', function() {
    const calculator = new Calculator();

    document.getElementById('clear-history').addEventListener('click', () => {
      calculator.clearHistory();
    });

    document.getElementById('history-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('history-entry')) {
        const entry = e.target.textContent;
        const result = entry.split('=')[1].trim();
        calculator.currentInput = result;
        calculator.updateDisplay();
      }
    });
  
    const buttons = document.querySelectorAll('.calc-btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (value === '⌫') {  
          calculator.backspace();
        } else if (value === 'C') {  
          calculator.clear();
        }
        
        if (button.classList.contains('operator')) {
          if (value === 'C') calculator.clear();
          else if (value === '±') calculator.toggleSign();
          else if (value === '=') calculator.compute();
          else if (value === '.') calculator.addDecimal();
          else calculator.handleOperation(value);
        } else {
          calculator.appendNumber(value);
        }
        
        calculator.updateDisplay();
      });
    });
  
    // Keyboard support
    document.addEventListener('keydown', (e) => {
      const keyMap = {
        'Enter': '=',
        'Escape': 'C',
        'Backspace': '⌫',
        'Delete': 'C',
        'Tab': '±',
        ',': '.',
        '*': '×',
        '-': '−',
      };
      
      const key = keyMap[e.key] || e.key;
      const button = document.querySelector(`[data-value="${key}"]`);
      
      if (button || e.key === 'Enter') {
        e.preventDefault();

        if (e.key === '-') {
          const minusBtn = document.querySelector('[data-value="−"]');
          minusBtn.classList.add('pressed');
          setTimeout(() => minusBtn.classList.remove('pressed'), 100);
          calculator.handleOperation('−'); 
          return;
        }

        if (e.key === 'Enter') {
          const equalsBtn = document.querySelector('[data-value="="]');
          equalsBtn?.classList.add('pressed');
          setTimeout(() => equalsBtn?.classList.remove('pressed'), 100);
        } else {
          button.classList.add('pressed');
          setTimeout(() => button.classList.remove('pressed'), 100);
        }
        calculator.handleKeyInput(e.key);
      }
    });
  
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.addEventListener('click', () => {
      document.getElementById('all-conversions').classList.toggle('hidden');
      document.getElementById('cal-container').classList.toggle('hidden');
      modeToggle.textContent = document.getElementById('cal-container').classList.contains('hidden') 
        ? 'Calculator' 
        : 'Conversion';
    });

    // Temperature conversion
    document.getElementById('temperature').addEventListener('click', async function() {
      const celsius = document.getElementById('celsius').value;
      if (!celsius) return;
      
      try {
        const response = await fetch('/api/conversions/temperature', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ celsius: parseFloat(celsius) })
        });
        
        const data = await response.json();
        document.getElementById('fahrenheit').value = data.fahrenheit.toFixed(2);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  
    // Weight conversion
    document.getElementById('weight').addEventListener('click', async function() {
      const pound = document.getElementById('pound').value;
      if (!pound) return;
      
      try {
        const response = await fetch('/api/conversions/weight', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pound: parseFloat(pound) })
        });
        
        const data = await response.json();
        document.getElementById('kilogram').value = data.kilogram.toFixed(2);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  
    // Distance conversion
    document.getElementById('distance').addEventListener('click', async function() {
      const mile = document.getElementById('mile').value;
      if (!mile) return;
      
      try {
        const response = await fetch('/api/conversions/distance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mile: parseFloat(mile) })
        });
        
        const data = await response.json();
        document.getElementById('kilometer').value = data.kilometer.toFixed(2);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
document.addEventListener('DOMContentLoaded', function() {
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
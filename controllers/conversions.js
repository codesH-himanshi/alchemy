// Temperature conversion
const convertTemperature = (req, res) => {
    try {
      const { celsius } = req.body;
      if (celsius === undefined || celsius === null) {
        return res.status(400).json({ error: 'Celsius value is required' });
      }
      
      const fahrenheit = (celsius * 9/5) + 32;
      res.json({ fahrenheit });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Weight conversion
  const convertWeight = (req, res) => {
    try {
      const { pound } = req.body;
      if (pound === undefined || pound === null) {
        return res.status(400).json({ error: 'Pound value is required' });
      }
      
      const kilogram = pound / 2.2046;
      res.json({ kilogram });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Distance conversion
  const convertDistance = (req, res) => {
    try {
      const { mile } = req.body;
      if (mile === undefined || mile === null) {
        return res.status(400).json({ error: 'Mile value is required' });
      }
      
      const kilometer = mile * 1.609344;
      res.json({ kilometer });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  module.exports = {
    convertTemperature,
    convertWeight,
    convertDistance
  };
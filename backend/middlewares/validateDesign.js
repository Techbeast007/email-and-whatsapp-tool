const validateDesign = (req, res, next) => {
    // Add your validation logic here
    // For example, check if the required fields are present in the request body
  
    const { design, exportedHtml } = req.body;
  
    if (!design || !exportedHtml) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
  
    // If validation passes, move to the next middleware or route handler
    next();
  };
  
  module.exports = validateDesign;
  
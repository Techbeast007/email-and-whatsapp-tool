exports.validateRequest = (req, res, next) => {
    const { email, subjects, body } = req.body;
  
    if (!email || !subjects || !body) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
  
    next();
  };
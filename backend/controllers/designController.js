const Design = require('../db/designSchema');

// Controller function to save the design and exported HTML
exports.saveDesign = async (req, res) => {
  try {
    const { design, exportedHtml } = req.body;

    // Create a new instance of the Design model
    const newDesign = new Design({
      design,
      exportedHtml,
    });

    // Save the design to the database
    const savedDesign = await newDesign.save();

    res.status(200).json({ success: true, data: savedDesign });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const Email = require('../db/Email');

// Track Controller
exports.trackEmail = async (req, res) => {
  const { trackingId } = req.params;

  try {
    // Find the Email document with the given tracking ID
    const email = await Email.findOne({ trackingId });

    if (!email) {
      return res.status(404).json({ success: false, message: 'Tracking ID not found' });
    }

    // Update the isOpened field and set openedAt timestamp
    email.isOpened = true;
    email.openedAt = new Date();
    await email.save();

    // Serve the tracking image
    res.sendFile(`${trackingId}.png`, { root: 'path/to/tracking/images/folder' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

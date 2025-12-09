const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

// Deletion Endpoint
router.delete('/delete-account/:id', async (req, res) => {
    const userId = req.params.id; 

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }
        
        // Delete the account for all other non-protected users
        await User.findByIdAndDelete(userId);
        res.status(200).json({ msg: "Account deleted successfully." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error during account deletion." });
    }
});

module.exports = router;
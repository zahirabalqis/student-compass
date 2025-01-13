const bcrypt = require('bcrypt');

// Use this script to hash your password and save it in the database
(async () => {
    const plainPassword = 'admin123'; // Replace with your desired admin password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log("Hashed Password:", hashedPassword);

    // Save the hashed password into the database manually or programmatically
})();

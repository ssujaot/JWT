const fs = require('fs');
const jwt = require('jsonwebtoken');

// Read the private key from the file
const privateKey = fs.readFileSync('private.key', 'utf8');
// The `kid` (Key ID) represents the identifier for the signing key
const kid = 'key-1';  // Example: The key ID of the private key being used
// Updated payload with additional claims
const payload = {
  sub: 'Salman',
  iss: 'OneTrust',
  exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiration
  iat: Math.floor(Date.now() / 1000),
  nbf: Math.floor(Date.now() / 1000) - 60 // valid after 1 minute ago
};

// Sign the JWT using RS256
const token = jwt.sign(payload, privateKey, { algorithm: 'RS256',
    header: {
      kid: kid  // Add the Key ID to the JWT header
    } });

// Output the signed token to the console (for reference)
console.log("Signed JWT:", token);

// Save the token to a variable for passing to verify.js
process.env.JWT_TOKEN = token; // Save it in an environment variable for use later

// Now, programmatically call verify.js to verify the token
const { exec } = require('child_process');
exec('node verify.js', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing verify.js: ${stderr}`);
    return;
  }
  console.log(`verify.js Output: ${stdout}`);
});

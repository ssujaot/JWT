const fs = require('fs');
const jwt = require('jsonwebtoken');

// Read the public key corresponding to the key ID
const publicKey = fs.readFileSync('public.key', 'utf8');  // Replace with logic to fetch the correct public key based on `kid`

// Get the token from the environment variable
const token = process.env.JWT_TOKEN;

if (!token) {
  console.log("No JWT token found. Please make sure it is set as an environment variable.");
  process.exit(1);
}

try {
  // Decode the JWT header to get the `kid`
  const decodedHeader = jwt.decode(token, { complete: true }).header;
  const kid = decodedHeader.kid;

  console.log("Key ID (kid) in header:", kid);

  // Verify the JWT with the public key and RS256 algorithm
  const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

  // Output the decoded JWT payload
  console.log("Decoded JWT:", decoded);
} catch (err) {
  console.error("Invalid token:", err);
  // Handle verification errors like expired token or invalid signature
}

// Check if an address was provided as a command-line argument
if (process.argv.length < 3) {
  console.error("Please provide an Ethereum address as a parameter.");
  process.exit(1);
}

// Get the target address from command-line arguments and validate it
const targetAddress = process.argv[2].toLowerCase();

if (!/^0x[a-f0-9]{40}$/.test(targetAddress)) {
  console.error("Invalid Ethereum address provided.");
  process.exit(1);
}

export const hyperSyncEndpoint = "https://eth.backup.hypersync.xyz"; // More networks can be found here: https://docs.envio.dev/docs/hypersync-url-endpoints
export { targetAddress };


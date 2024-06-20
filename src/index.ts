import { HypersyncClient } from "@envio-dev/hypersync-client";
import { hyperSyncEndpoint, targetAddress } from "./config";

// Convert address to topic for filtering. Padds the address with zeroes.
function addressToTopic(address: string): string {
  return "0x000000000000000000000000" + address.slice(2, address.length);
}

const transferEventSigHash = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

async function main() {
  console.time("Script Execution Time");

  // Create hypersync client using the mainnet hypersync endpoint
  const client = HypersyncClient.new({
    url: hyperSyncEndpoint,
    maxNumRetries: 0,
  });

  // The query to run
  const query = {
    // start from block 0 and go to the end of the chain (we don't specify a toBlock).
    fromBlock: 0,
    transactions: [
      {
        to: [targetAddress],
      },
    ],
    // Select the fields we are interested in, notice topics are selected as topic0,1,2,3
    fieldSelection: {
      transaction: ["hash", "block_number"],
    },
  };

  console.log("Running the query...");

  const receiver = await client.stream(query, {
    concurrency: 48,
    maxBatchSize: 10000,
  });

  while (true) {
    const res = await receiver.recv();
    if (res === null) {
      console.log('No transaction found');
      break;
    }

    console.log(`scanned up to block: ${res.nextBlock}`);

    if (res.data.transactions.length > 0) {
      console.log(res.data.transactions[0]);
      break;
    }
  }
}

main();


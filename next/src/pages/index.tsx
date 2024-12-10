import { useState } from "react";
import { useSDK } from "@metamask/sdk-react";

const Home = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { sdk, connected, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setWalletAddress(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
      setError("failed to connect..");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Connect to MetaMask</h1>
      <button style={{ padding: 10, margin: 10 }} onClick={connect}>
        Connect
      </button>
      {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {walletAddress && `Connected account: ${walletAddress}`}
          </>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Home;

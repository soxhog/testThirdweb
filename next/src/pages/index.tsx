import { useState } from "react";
import { ethers } from "ethers";

const Home = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      // MetaMask がブラウザに存在するか確認
      if (!window.ethereum) {
        setError("MetaMask がインストールされていません。");
        return;
      }

      // MetaMask に接続
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // ウォレットアドレスを状態に保存
      setWalletAddress(address);
      setError(null); // エラーをクリア
    } catch (err: any) {
      setError(err.message || "ウォレット接続に失敗しました。");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Connect to MetaMask</h1>
      {walletAddress ? (
        <div>
          <p>ウォレットアドレス: {walletAddress}</p>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Home;

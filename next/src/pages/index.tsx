import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { ethereum } from "thirdweb/chains";
import { client } from "@/utils/thirdweb.helper";
import { useState } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Home() {
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
    createWallet("com.trustwallet.app"),
  ];
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const getEthereum = () => {
    if (typeof window === "undefined") {
      console.log("Oops, `window` is not defined");
      throw new Error("Error: no window");
    }
    const { ethereum } = window;
    return ethereum;
  };
  const walletConnect = async () => {
    const ethereum = getEthereum();
    if (!ethereum) {
      window.open(`https://metamask.app.link/dapp/${window.location.host}/#/`);
      return;
    }

    if (isConnected) {
      alert("Wallet is already connected!");
      return;
    }
    await ethereum
      .request({ method: "eth_requestAccounts" })
      .then(async () => {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      })
      .catch((err: any) => {
        if (err.code === 4001) {
          alert("User rejected the connection!");
          return;
        } else {
          alert("An error occured while connecting!");
          return;
        }
      });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-4xl font-bold">Child Page</h1>
      <ConnectButton
        autoConnect={{ timeout: 1000 * 60 * 60 * 24 }} // 24時間
        client={client}
        locale="ja_JP"
        chain={ethereum}
        appMetadata={{
          name: "Epos card app",
          description: "Display your NFTs and select your favorite one.",
          // TODO: ロゴを設定する
          url: "https://example.com", // TODO: URLを設定する
        }}
        connectButton={{
          className: "wallet-button",
        }}
        connectModal={{
          size: "compact",
          showThirdwebBranding: false,
          titleIcon: "",
        }}
        wallets={wallets}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        disabled={isConnected}
        onClick={walletConnect}
      >
        MetaMask Connect Wallet
      </button>
      <p>Wallet Address: {walletAddress}</p>
    </div>
  );
}

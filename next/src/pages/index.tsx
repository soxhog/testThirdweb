import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { ethereum } from "thirdweb/chains";
import { client } from "./utils/thirdweb.helper";

export default function Home() {
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
    createWallet("com.trustwallet.app"),
  ];
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
    </div>
  );
}

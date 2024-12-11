import { useEffect, useState } from "react";

export default function Home() {
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const ethereum = (window as any).ethereum;
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setConnectedAccount(accounts[0]);
      } catch (err) {
        console.error(err);
      }
    } else {
      // ここでMetamaskアプリ内ブラウザで開くよう誘導するUIを表示する
      // alert(
      //   "Metamaskが検出されません。Metamaskアプリ内ブラウザからアクセスしてください。"
      // );
      window.open(
        `https://metamask.app.link/dapp/${window.location.href}/#/`,
        "_blank"
      );
    }
  };

  useEffect(() => {
    // ページロード時にMetamaskがあるかどうかチェック
    if (typeof window !== "undefined" && (window as any).ethereum) {
      // すでに接続済みであれば接続中のアカウントを取得可能
      (window as any).ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setConnectedAccount(accounts[0]);
          }
        });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {connectedAccount ? (
        <p>Connected Account: {connectedAccount}</p>
      ) : (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={connectWallet}
        >
          Connect Metamask
        </button>
      )}
      {!connectedAccount && (
        <a
          href="https://metamask.app.link/dapp/http://localhost:3000/test"
          className="mt-4 text-blue-600 underline"
        >
          Metamaskブラウザで開く
        </a>
      )}
    </div>
  );
}

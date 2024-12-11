import { useEffect, useState } from "react";
import SignClient from "@walletconnect/sign-client";
import { SessionTypes } from "@walletconnect/types";

const Home = () => {
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);
  const [approval, setApproval] = useState<Promise<SessionTypes.Struct> | null>(
    null
  );
  const [universalLink, setUniversalLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        console.log("metamask exists");
      } else {
        setIsLoading(true);
        try {
          const signClient = await SignClient.init({
            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
            relayUrl: "wss://relay.walletconnect.com",
            metadata: {
              name: "Your DApp Name",
              description: "Your DApp Description",
              url: "https://test-thirdweb-five.vercel.app",
              icons: [""],
            },
          });
          const { uri, approval } = await signClient.connect({
            requiredNamespaces: {
              eip155: {
                methods: [
                  "eth_sendTransaction",
                  "personal_sign",
                  "eth_signTypedData",
                ],
                chains: ["eip155:1"], // Ethereumメインネットの場合
                events: ["accountsChanged", "chainChanged"],
              },
            },
          });
          if (uri) {
            const universalLink =
              "https://metamask.app.link/wc?uri=" + encodeURIComponent(uri);
            setApproval(approval);
            setUniversalLink(universalLink);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    init();
    console.log("Home");
  }, []);

  useEffect(() => {
    if (approval) {
      (async () => {
        try {
          const session = await approval;
          console.log("Connected session:", session);
          // eip155名前空間からアカウント情報を取得
          const accounts = session.namespaces.eip155?.accounts;
          // accountsは"eip155:1:0x...."の形式なので最後がアドレス
          if (accounts && accounts.length > 0) {
            const address = accounts[0].split(":")[2];
            setConnectedAccount(address);
          }
        } catch (err) {
          console.error("Error awaiting approval:", err);
        }
      })();
    }
  }, [approval]);

  const connect = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      console.log("metamask exists");
      const ethereum = (window as any).ethereum;
      try {
        await ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setConnectedAccount(accounts[0]);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Connect to MetaMask</h1>
      {!universalLink && (
        <button
          disabled={isLoading}
          style={{ padding: 10, margin: 10 }}
          onClick={connect}
        >
          {isLoading ? "Loading..." : "Connect"}
        </button>
      )}
      {universalLink && (
        <a
          href={universalLink}
          style={{
            padding: 10,
            margin: 10,
            border: "1px solid #000",
            borderRadius: "5px",
          }}
          target="_top"
          rel="noopener noreferrer"
        >
          Open in MetaMask
        </a>
      )}
      {/* <button style={{ padding: 10, margin: 10 }} onClick={disconnect}>
        Disconnect
      </button> */}
      {connectedAccount && (
        <div>
          <p>{`Connected account: ${connectedAccount}`}</p>
        </div>
      )}
    </div>
  );
};

export default Home;

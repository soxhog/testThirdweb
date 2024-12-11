import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { ThirdwebProvider } from "thirdweb/react";
// import { MetaMaskProvider } from "@metamask/sdk-react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <ThirdwebProvider>
    // <MetaMaskProvider
    //   sdkOptions={{
    //     dappMetadata: {
    //       name: "Epos card app",
    //       url: "https://example.com",
    //     },
    //     useDeeplink: true,
    //     extensionOnly: false,
    //     openDeeplink(arg) {
    //       console.log("openDeeplink", arg);
    //       window.open(arg, "_blank");
    //       console.log(`deeplink opened: ${arg}`);
    //     },
    //     logging: {
    //       developerMode: true,
    //       sdk: true,
    //     },
    //   }}
    // >
    <Component {...pageProps} />

    // </MetaMaskProvider>
    // </ThirdwebProvider>
  );
}

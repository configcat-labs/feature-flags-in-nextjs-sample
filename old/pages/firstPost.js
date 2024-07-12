import Head from "next/head";
import Script from "next/script";

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>This is the first Page</title>
      </Head>
      <Script
        src='https://connect.facebook.net/en_US/sdk.js'
        strategy='lazyOnload'
        onLoad={() => console.log("Hello World")}
      ></Script>
      <h1>Welcome to the First Page</h1>
      <p>Interesting concept</p>
    </>
  );
}

import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";


const Home: NextPage = () => {
 
  return (
    <div>
      <Head>
        <title>Events - nadamas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icons.icon.ico" />
      </Head>
      <Layout>
        <div className="text-center h-60 flex w-full flex-col justify-center items-center">
          <h1 className="text-4xl">This is your new favorite sport events page</h1>
          <p className="text-xl my-4">wait for it</p>
        </div>
      </Layout>
    </div>
  );
};

export default Home;

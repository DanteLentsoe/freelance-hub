import type { NextPage } from "next";
import Head from "next/head";
import NavigationBar from "../components/NavigationBar";
import HeroSection from "../components/UI/HeroSection";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>FreeLance Hub</title>
        <meta
          name="description"
          content="FreeLance Hub is platform designed for frelances to track and document their projects"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <HeroSection />
    </>
  );
};

export default Home;

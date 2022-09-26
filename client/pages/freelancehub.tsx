import type { NextPage } from "next";
import Head from "next/head";
import ClientsContainer from "../components/clientcontainer";
import AddClientModal from "../components/modals/AddClientModal";
import NavigationBar from "../components/NavigationBar";

const FreeLancePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>FreeLance Hub | Main</title>
        <meta
          name="description"
          content="FreeLance Hub is platform designed for frelances to track and document their projects"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <ClientsContainer />
      <AddClientModal />
    </>
  );
};

export default FreeLancePage;

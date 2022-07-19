import type { NextPage } from "next";
import Head from "next/head";
import ClientsContainer from "../../components/clientcontainer";
import AddProjectModal from "../../components/modals/AddProjectModal";
import NavigationBar from "../../components/NavigationBar";

const SingleProject: NextPage = () => {
  return (
    <>
      <Head>
        <title>FreeLance Hub | Projects</title>
        <meta
          name="description"
          content="FreeLance Hub projects collection that tracks all your projects"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar />
      <p>Details Page for the ID </p>
    </>
  );
};

export default SingleProject;

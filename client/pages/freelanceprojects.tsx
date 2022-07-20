import type { NextPage } from "next";
import Head from "next/head";
import AddProjectModal from "../components/modals/AddProjectModal";
import NavigationBar from "../components/NavigationBar";
import ProjectContainer from "../components/ProjectContainer";

const FreeLanceProjectPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>FreeLance Hub | ProjectPage</title>
        <meta
          name="description"
          content="FreeLance Hub is platform designed for frelances to track and document their projects"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavigationBar />
      <ProjectContainer />
      <AddProjectModal />
    </>
  );
};

export default FreeLanceProjectPage;

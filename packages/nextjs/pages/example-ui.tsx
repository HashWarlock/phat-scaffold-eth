import type {NextPage} from "next";
import {MetaHeader} from "~~/components/MetaHeader";
import { ExploreProfiles } from "~~/components/example-ui/ExploreProfiles";
import styles from "~~/styles/home.module.css";

const ExampleUI: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="Lens Treasure Hunt | Scaffold-ETH 2"
        description="Lens Treasure Hunt created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className={styles.treasure} title="Lens Treasure Hunt" data-theme="exampleUi">
        <ExploreProfiles />
      </div>
    </>
  );
};

export default ExampleUI;

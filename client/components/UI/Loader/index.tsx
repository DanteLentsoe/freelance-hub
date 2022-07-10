import Lottie from "react-lottie";
import * as animationData from "../../../assets/bouncing-ball-loader.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Lottie
        options={defaultOptions}
        height={500}
        width={500}
        isStopped={false}
        isPaused={false}
      />
    </>
  );
};

export default Loader;

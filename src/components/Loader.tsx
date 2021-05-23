import Loader from "react-loader-spinner";

const LoadingIndicator = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader type="Puff" color="#00BFFF" height={100} width={100} />
    </div>
  );
};

export default LoadingIndicator;

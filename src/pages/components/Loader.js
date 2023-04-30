import LoadingIcon from "../../../public/imgs/Loading_icon.gif";
import Image from "next/image";
export const Loader = (props) => {
  return (
    <div className="text-center">
      <Image src={LoadingIcon} width={160} height={100} alt="Loader Icon" />
    </div>
  );
};

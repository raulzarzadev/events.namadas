import LoadingImage from "./items/LoadingImage";
import LoadingText from "./items/LoadingText";
import LoadingTitle from "./items/LoadingTitle";
import LoadingUser from "./items/LoadingUser";

const SkeletonUserDashboardCard = () => {
  return (
    <div
      role="status"
      className="p-4 max-w-sm rounded border border-gray-200 shadow animate-pulse md:p-6 dark:border-gray-700"
    >
      <LoadingImage />
      <LoadingTitle />
      <LoadingText />
      <LoadingText />
      <LoadingText />
      <LoadingUser />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default SkeletonUserDashboardCard;
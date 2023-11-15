import Skeleton from 'react-loading-skeleton';

const Loading = () => {
  return (
    <div>
      <Skeleton count={1} height={30} />
      <Skeleton count={1} height={20} width={80} />
    </div>
  );
};

export default Loading;

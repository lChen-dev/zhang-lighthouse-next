import Skeleton from 'react-loading-skeleton';

/* loading card renderes */

const RowSkeleton = (): JSX.Element => {
  return (
    <div className="flex items-center mt-10">
      <div>
        <Skeleton circle height={72} width={72} />
      </div>
      <div className="flex-1 ml-4">
        <Skeleton />
        <Skeleton />
        <Skeleton width="50%" />
      </div>
    </div>
  );
};

const HomeImageSkeleton = ({ radius }: any): JSX.Element => {
  return (
    <Skeleton
      height="100%"
      style={{
        borderRadius: radius || 0,
        width: '100%',
      }}
    />
  );
};

const CardSkeleton = ({ height }: any): JSX.Element => {
  return (
    <div>
      <div>
        <Skeleton
          height={height || 300}
          style={{
            borderRadius: 20,
          }}
        />
      </div>
      <div className="flex-1 mt-4">
        <Skeleton count={2} />
        <Skeleton width="50%" />
      </div>
    </div>
  );
};

const IndividualBodySkeleton = (): JSX.Element => {
  return (
    <div>
      <Skeleton />
      <div className="w-1/2 my-4">
        <Skeleton count={2} />
      </div>
      <Skeleton count={6} />
    </div>
  );
};

const EmptyImage = '/static/assets/images/emptyImage.jpeg';

export { RowSkeleton, HomeImageSkeleton, CardSkeleton, IndividualBodySkeleton, EmptyImage };

import ProgressiveImage from 'react-progressive-graceful-image';
import { Text, SmallText } from '@components/shared/ResponsiveFonts';
import { B1, H4 } from '@components/shared/Typography';

const Profile = ({
  name = '',
  picture,
  webp,
  placeholder,
  title = '',
  textColorClass = 'text-white',
  imgBgColor = 'bg-clay',
  bottom = '0px',
  height = '180px',
  width = '180px',
  left = 'calc(50% - 100px)',
}: {
  name: string;
  picture: any;
  webp: any;
  placeholder: any;
  title: string;
  textColorClass?: string;
  bgColorClass?: string;
  imgBgColor?: string;
  bottom?: string;
  height?: string;
  width?: string;
  left?: string;
}): React.ReactElement => (
  <div>
    <div
      className={`py-0 m-2 inline-block ${imgBgColor} relative overflow-hidden team-profile`}
      style={{ width: '200px', height: '200px', borderRadius: '4px' }}>
      <ProgressiveImage placeholder={placeholder} src={picture}>
        {(src: any) => (
          <picture>
            <source srcSet={`${webp} 1200w`} type="image/webp" />
            <source srcSet={`${src} 1200w`} type="image/png" />
            <img
              src={src}
              alt="blockImg"
              className="object-cover blockImg absolute team-picture"
              style={{
                height,
                width,
                left,
                bottom,
              }}
            />
          </picture>
        )}
      </ProgressiveImage>
    </div>

    {name ||
      (title && (
        <div className="mx-2 mb-8">
          <H4>{name}</H4>
          <B1 color="text-gray-soft">{title}</B1>
        </div>
      ))}
  </div>
);

export default Profile;

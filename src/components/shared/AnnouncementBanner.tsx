import React, { useEffect, useState } from 'react';
import jsCookie from 'js-cookie';

const AnnouncementBanner: React.FC = () => {
  const announcement = process.env.NEXT_PUBLIC_ANNOUNCEMENT;
  const bgColor = process.env.NEXT_PUBLIC_ANNOUNCEMENT_BG_COLOR || '#1F5350';
  const textColor = process.env.NEXT_PUBLIC_ANNOUNCEMENT_COLOR || '#FFFFFF';
  const linkText = process.env.NEXT_PUBLIC_ANNOUNCEMENT_LINK_TEXT;
  const linkHref = process.env.NEXT_PUBLIC_ANNOUNCEMENT_HREF;
  const linkColor = process.env.NEXT_PUBLIC_ANNOUNCEMENT_LINK_COLOR || '#C0D4D4';

  const [visible, setVisible] = useState(false);

  const hideAnnouncement = (): void => {
    setVisible(false);
    jsCookie.set(`hide_announcement:${announcement}`, 'true', { expires: 2 });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') setVisible(!jsCookie.get(`hide_announcement:${announcement}`));
  }, []);

  if (!announcement || !visible) return null;

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="flex flex-row p-3 bg-green align-items-center z-50">
      <div
        style={{ color: textColor }}
        className="flex-1 font-circular items-center text-center w-full">
        {announcement}
        {linkText && linkHref && (
          <button
            type="button"
            style={{ color: linkColor }}
            className="ml-2"
            onClick={() => {
              hideAnnouncement();
              setTimeout(() => window.location.replace(linkHref), 0);
            }}>
            {linkText}
          </button>
        )}
      </div>
      <button
        className="font-bold text-lg hover:cursor-pointer text-white"
        type="button"
        onClick={hideAnnouncement}>
        &times;
      </button>
    </div>
  );
};

export default AnnouncementBanner;

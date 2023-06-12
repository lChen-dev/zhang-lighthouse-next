import React, { useEffect } from 'react';
import { loadScript } from '@utils/helpers';

const Schedule: React.FC = () => {
  useEffect(() => {
    loadScript(['https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js']);
  }, []);
  return (
    <div className="pt-10">
      <div className="meetings-iframe-container" data-src="https://meetings.hubspot.com/matt1397?embed=true" />
    </div>
  );
};

export default Schedule;

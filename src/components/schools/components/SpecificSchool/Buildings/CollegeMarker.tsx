const CollegeMarker = ({}: { lat: number; lng: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 512 512"
      version="1.1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      width="20"
      height="20">
      <path
        fill="#FF3636"
        d="M441.443 133.2c-17.999-58.2-65.4-105.601-123.6-123.6-20.4-6.301-41.4-9.6-61.8-9.6-41.7 0-81.899 12.9-115.499 38.101C90.742 74.7 61.043 133.2 61.043 195c0 42.599 13.5 83.101 39 117.001l156 199.999 156-199.999c38.099-51.001 48.9-116.1 29.4-178.801zM256.043 300c-57.9 0-105-47.1-105-105s47.1-105 105-105 105 47.1 105 105-47.1 105-105 105z"
      />
      <path
        fill="#F40000"
        d="M412.043 312.001L256.043 512V300c57.9 0 105-47.1 105-105s-47.1-105-105-105V0c20.4 0 41.4 3.3 61.8 9.6 58.2 17.999 105.601 65.4 123.6 123.6 19.5 62.701 8.699 127.8-29.4 178.801z"
      />
    </svg>
  );
};

export default CollegeMarker;

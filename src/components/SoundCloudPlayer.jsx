import "../style/main.css";

// eslint-disable-next-line react/prop-types
const SoundCloudPlayer = ({ embedUrl }) => {
  console.log("Raw embedUrl:", embedUrl); // Debugging: Check the raw URL
  if (!embedUrl) return <p>Invalid SoundCloud URL</p>; // Handle empty URLs

  // Ensure URL uses HTTPS
  // eslint-disable-next-line react/prop-types
  const secureUrl = embedUrl.startsWith("http://")
    // eslint-disable-next-line react/prop-types
    ? embedUrl.replace("http://", "https://")
    : embedUrl;

  // Convert SoundCloud track URL to the correct embed format
  const embedSrc = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    secureUrl
  )}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;

  console.log("Final embedSrc:", embedSrc); // Debugging: Check the final embed URL

  return (
    <div className="soundcloud-player">
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={embedSrc}
      ></iframe>
    </div>
  );
};

export default SoundCloudPlayer;
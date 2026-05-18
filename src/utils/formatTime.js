const formatTime = (
  timestamp
) => {
  if (!timestamp) return "";

  return timestamp
    ?.toDate()
    ?.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
};

export default formatTime;
export const extractTime = (isoString) => {
    const date = new Date(isoString);
    const currentDate = new Date();

    // Extract the time
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const time = date.toLocaleTimeString('en-US', options);

    // Compare dates
    const diffInMilliseconds = currentDate - date;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago at ${time}`;
    } else if (diffInDays === 1) {
      return `Yesterday at ${time}`;
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago at ${time}`;
    } else if (diffInDays < 14) {
      return `Last week at ${time}`;
    } else {
      return (
        date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) + ` at ${time}`
      );
    }
  };
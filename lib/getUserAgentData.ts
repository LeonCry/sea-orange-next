const getUserAgentData = () => {
  const userAgent = window.navigator.userAgent;

  let osInfo, browserInfo;

  if (userAgent.indexOf('Windows NT') !== -1) {
    osInfo = 'Windows';
  } else if (userAgent.indexOf('Macintosh') !== -1) {
    osInfo = 'Mac OS';
  } else if (userAgent.indexOf('Linux') !== -1) {
    osInfo = 'Linux';
  } else {
    osInfo = 'Unknown OS';
  }

  // 检查浏览器类型
  if (userAgent.indexOf('Chrome') !== -1) {
    browserInfo = 'Chrome';
  } else if (userAgent.indexOf('Firefox') !== -1) {
    browserInfo = 'Firefox';
  } else if (userAgent.indexOf('Safari') !== -1) {
    browserInfo = /Version\/([\d.]+).*Safari/.exec(userAgent)![1];
  } else if (userAgent.indexOf('Edge') !== -1) {
    browserInfo = 'Edge';
  } else if (userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident/') !== -1) {
    browserInfo = 'Internet Explorer';
  } else {
    browserInfo = 'Unknown Browser';
  }
  return { machine: osInfo, browser: browserInfo };
};
export default getUserAgentData;
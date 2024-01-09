const formatTimeAgo = (createdAt: string) => {
  let time = '';

  const dateObject = new Date(createdAt);
  const milliseconds = dateObject.getTime();

  const lastTime = (Date.now() - milliseconds) / 1000 / 60 / 60; // 시

  if (Math.floor(lastTime) > 24 * 7 * 4) {
    time = `${Math.floor(lastTime / (24 * 7 * 4))}달 전`; // 달
  } else if (Math.floor(lastTime) > 24 * 7) {
    time = `${Math.floor(lastTime / (24 * 7))}주 전`; // 주
  } else if (Math.floor(lastTime) > 24) {
    time = `${Math.floor(lastTime / 24)}일 전`; // 날짜
  } else if (Math.floor(lastTime) > 0) {
    time = `${Math.floor(lastTime)}시간 전`; // 시간
  } else if (lastTime * 60 > 0) {
    time = `${Math.floor(lastTime * 60)}분 전`; // 분
  }

  return time;
};

export default formatTimeAgo;

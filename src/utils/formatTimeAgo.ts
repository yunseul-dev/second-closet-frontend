const formatTimeAgo = (createdAt: number) => {
  let time = '';

  const lastTime = (Date.now() - createdAt) / 1000 / 60 / 60; // 시

  if (Math.floor(lastTime) > 24) {
    time = `${Math.floor(lastTime / 24)}일 전`; // 날짜
  } else if (Math.floor(lastTime) > 0) {
    time = `${Math.floor(lastTime)}시간 전`; //
  } else if (lastTime * 60 > 0) {
    time = `${Math.floor(lastTime * 60)}분 전`;
  }

  return time;
};

export default formatTimeAgo;

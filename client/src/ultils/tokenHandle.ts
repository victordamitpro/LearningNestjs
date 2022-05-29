export const validateTokenExpired = (
  tokenTime: Date | any,
  expiresIn: number | any,
) => {
  const dateTimeNow = new Date().getTime();
  const elapsedTime = Math.abs(dateTimeNow - tokenTime.getTime());
  return elapsedTime > expiresIn * 1000;
};

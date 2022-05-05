export const getConvertedFollowersNumber = (
  followersNumber: number
): string | number => {
  if (followersNumber >= 1000) {
    return (followersNumber / 1000).toFixed(1) + "k";
  }
  return followersNumber;
};

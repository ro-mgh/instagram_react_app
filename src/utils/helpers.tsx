export const getArrayOfUnkhownUsers = (userId, allUsers) => {
  if (allUsers.hasOwnProperty(userId)) {
    const userFollowingIdsArrOfObjects = allUsers[userId].followingIds;

    const knownUsersIds = [userId];

    if (userFollowingIdsArrOfObjects.length > 0) {
      userFollowingIdsArrOfObjects.map((record) => {
        knownUsersIds.push(record.followingId);
      });
    }

    const newUsersArray = [];

    for (const userId in allUsers) {
      if (!knownUsersIds.includes(userId)) {
        newUsersArray.push(allUsers[userId]);
      }
    }

    return newUsersArray;
  } else {
    return [];
  }
};

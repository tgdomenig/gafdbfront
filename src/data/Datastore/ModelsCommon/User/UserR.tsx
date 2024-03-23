import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { DsUser, DsUserFavourite, DsVote } from '../../../../models';

/* ----------------------------- GET ----------------------- */
export async function getDsUsers() : Promise<DsUser[]> {
  return await DataStore.query(DsUser);
}

export async function getDsUser(pushToken: string) : Promise<DsUser|undefined> {
  const rec = await DataStore.query(DsUser, pushToken);
  return rec || undefined;
}

export async function hasDsUser(pushToken: string) : Promise<boolean> {
  const rec = await DataStore.query(DsUser, pushToken);
  return !! rec;
}

export async function getDsUserFavourite({userId, favouriteId}: {userId: string, favouriteId: string}) : Promise<DsUserFavourite|undefined> {
    return (await getDsUserFavourites(userId)).find(fav => fav.artistId === favouriteId);
}

export async function getDsUserFavourites(userId: string) : Promise<DsUserFavourite[]> {
  return await DataStore.query(DsUserFavourite, (fav) => fav.userId.eq(userId));
}

  
export async function isUserFavourite({userId, favouriteId}: {userId: string, favouriteId: string}) : Promise<boolean> {
  const fav = await getDsUserFavourite({userId, favouriteId});
  return !! (fav && fav.isActive);
}

export async function getDsUserVote(userId: string, votingId: string) : Promise<DsVote | undefined> {
  const dsUser = await getDsUser(userId);
  if (dsUser && dsUser.votes) {
    return dsUser.votes.find(vote => vote.votingId === votingId);
  }
}

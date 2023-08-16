import {development, LensClient, PaginatedResult, ProfileFragment, ProfileSortCriteria} from "@lens-protocol/client";
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Modal from 'react-modal';

const lensClient = new LensClient({
  environment: development
});

export const ExploreProfiles = () => {
  const [profilesMap, setProfilesMap] = useState<Map<string, ProfileFragment>>(new Map());
  const [paginatedResult, setPaginatedResult] = useState<PaginatedResult<ProfileFragment> | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<ProfileFragment | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProfileElementRef = useCallback(node => {
    if (observer.current) observer.current?.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && paginatedResult?.next) {
        loadMoreProfiles();
      }
    });
    if (node) observer.current?.observe(node);
  }, [paginatedResult]);

  useEffect(() => {
    if(!paginatedResult) {
      lensClient.explore.profiles({
        sortCriteria: ProfileSortCriteria.MostFollowers
      })
        .then(result => {
          const newProfilesMap = new Map(profilesMap);
          result.items.forEach(profile => {
            newProfilesMap.set(profile.id, profile);
          });
          setProfilesMap(newProfilesMap);
          setPaginatedResult(result);
        })
    }
  }, [paginatedResult]);

  const onProfileClick = (profileId) => {
    const profile = profilesMap.get(profileId);
    // @ts-ignore
    setSelectedProfile(profile);
  };

  const getProfilePicture = (profileId: string) => {
    const picture = profilesMap.get(profileId)?.picture;
    if (picture?.__typename === 'MediaSet') {
      return picture.original.url;
    } else if (picture?.__typename === 'NftImage') {
      return picture.uri;
    }
    return '/assets/theplugs-spark-creativity.png';
  }

  const loadMoreProfiles = () => {
    if (paginatedResult && paginatedResult.next) {
      paginatedResult.next().then(result => {
        if (result) {
          const newProfilesMap = new Map(profilesMap);
          result.items.forEach(profile => {
            newProfilesMap.set(profile.id, profile);
          });
          setProfilesMap(newProfilesMap);
          setPaginatedResult(result);
        }
      });
    }
  };

  const profileIds = Array.from(profilesMap.keys());
  return (
    <div className="profiles-container" >
        {profileIds.map((profileId, index) => (
          <div ref={index === profileIds.length - 1 ? lastProfileElementRef : null} key={profileId} onClick={() => onProfileClick(profileId)} className="profile-card">
            <picture><img className="thumbnail" src={getProfilePicture(profileId)} alt="Profile picture" /></picture>
            <h3>{profilesMap.get(profileId)?.name}</h3>
            <text>{profilesMap.get(profileId)?.id}</text>
          </div>
        ))}
      <Modal
        isOpen={selectedProfile !== null}
        onRequestClose={() => setSelectedProfile(null)}
        className="flex flex-col justify-center items-center bg-[url('/assets/mojo-da-king.png')] bg-[length:50%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] "
      >
        <h2>
          {selectedProfile?.name ?? selectedProfile?.id}.lens
        </h2>
        <picture><img className="thumbnail" src={getProfilePicture(selectedProfile?.id as string)} alt="Profile picture" /></picture>
        <p>{selectedProfile?.id}</p>
        <p>{selectedProfile?.bio}</p>
        <p>Total Followers: {selectedProfile?.stats.totalFollowers}</p>
        <p>Total Following: {selectedProfile?.stats.totalFollowing}</p>
        <button className="button-dig" onClick={() => setSelectedProfile(null)}>Dig⛏</button>
        <button className="button-dig" onClick={() => setSelectedProfile(null)}>Close</button>
      </Modal>
    </div>
  );
};

import {development, production, LensClient, PaginatedResult, ProfileFragment, ProfileSortCriteria} from "@lens-protocol/client";
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Modal from 'react-modal';
import styles from "~~/styles/home.module.css";

Modal.setAppElement(':root');

const lensClient = new LensClient({
  environment: development // use development for testnet and production for mainnet
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
    <div className={styles.profileGrid} >
        {profileIds.map((profileId, index) => (
          <div ref={index === profileIds.length - 1 ? lastProfileElementRef : null} key={profileId} onClick={() => onProfileClick(profileId)} className={styles.profileContainer}>
            <picture><img className="thumbnail" src={getProfilePicture(profileId)} alt="Profile picture" /></picture>
            <h2>{profilesMap.get(profileId)?.name}</h2>
            <br />@{profilesMap.get(profileId)?.handle}
            <br />{profilesMap.get(profileId)?.id}
          </div>
        ))}
      <Modal
        isOpen={selectedProfile !== null}
        onRequestClose={() => setSelectedProfile(null)}
        className={styles.modalContent}
      >
        <div className={styles.div}>
          <div className={styles.overlap}>
            <div className={styles.title}> @{selectedProfile?.handle}</div>
            <picture><img className={styles.ellipse} src={getProfilePicture(selectedProfile?.id as string)} alt="Profile picture" /></picture>
          </div>
          <div className={styles.div2}>
            <div className={styles.modalHeader}>
              <div className={styles.text}>
                Profile Stats
              </div>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.textWrapper}>
                Profile ID: {selectedProfile?.id}
                <br />
                Profile Name: {selectedProfile?.name}
                <br />
                Total Followers: {selectedProfile?.stats.totalFollowers}
                <br />
                Total Following: {selectedProfile?.stats.totalFollowing}
                <br />
                Total Posts: {selectedProfile?.stats.totalPosts}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <div className={styles.group}>
                <button className={styles.overlapGroupWrapper} onClick={() => setSelectedProfile(null)}>
                  <div className={styles.overlapGroup}>
                    <button className={styles.textWrapper2}>Close</button>
                  </div>
                </button>
                <button className={styles.overlapWrapper} onClick={() => setSelectedProfile(null)}>
                  <div className={styles.divWrapper}>
                    <div className={styles.textWrapper3}>Dig ⛏</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        </Modal>
    </div>
  );
};

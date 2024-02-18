import { Modal } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import vnTopo from 'src/app/gadm36_VNM_1.json';
import useWindowSize from 'src/app/hooks/useWindowSize';
import { checkProvince, ISLAND } from 'src/constant/provinceSVG';
import { useGetTreePlantingSiteQuery, useLazyGetArrayTreeQuery } from 'src/services/home';
import { geoPolyhedralWaterman } from 'd3-geo-projection';
import { getProvinceID } from 'src/services/treeAPI';
import TreeDetailStory from './TreeDetailStoryAndHistory/TreeDetailStory';
import TreeDetailStorySecondary from './TreeDetailStoryAndHistory/TreeDetailStorySecondary';
import decorLeaf1 from 'public/images/decor-leaf-1.png';
import TreeDetailStoryTreesJourney from './TreeDetailStoryAndHistory/TreeDetailStoryTreesJourney';
const MapTreesJourney = ({ trackingData, children }: any) => {
  const screenWidth = useWindowSize()?.width;
  const screenHeight = useWindowSize()?.height;
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: siteData = [] } = useGetTreePlantingSiteQuery({ refetchOnMountOrArgChange: true });
  const [getArrayTree, { data }] = useLazyGetArrayTreeQuery();
  const [showStory, setShowStory] = useState({
    id: '',
    isShow: false,
  });

  const [provinceClick, setProvinceClick] = useState('');

  useEffect(() => {
    dispatch(
      getProvinceID({
        provinceId: trackingData?.treePlantingSiteId,
        isShow: true,
      })
    );
  }, [trackingData, dispatch]);

  useEffect(() => {
    if (router.pathname !== '/trees-journey') {
      const codes = localStorage.getItem('my_tree_codes');
      if (codes) {
        getArrayTree(JSON.parse(codes).join(''));
      }
    }
  }, [getArrayTree, router]);

  const handleClick = (value: any) => {
    const filterData = siteData.find((m) => m.provinceCodeInMap === value.rsmKey);
    if (siteData.find((item) => item.provinceCodeInMap === value.rsmKey)) {
      setProvinceClick(value.rsmKey);
      if (filterData?.id) {
        dispatch(getProvinceID({ provinceId: filterData.id, isShow: true }));
        setShowStory({ id: filterData.id, isShow: true });
      } else {
        dispatch(getProvinceID({ provinceId: '1', isShow: true }));
        setShowStory({ id: '', isShow: true });
      }
    }
  };

  const MergeArr = useMemo(() => {
    if (data) {
      const arr = siteData.map((m) => {
        return data.filter((d) => {
          return m.provinceCodeInMap === d.provinceCodeInMap;
        });
      });
      return arr;
    }
  }, [data, siteData]);

  const MyCurrentTree = useMemo(() => {
    if (MergeArr && trackingData) {
      const getProvince = MergeArr.find((province) => {
        return province.find((p) => p.provinceCodeInMap === trackingData.provinceCodeInMap);
      });
      if (getProvince && getProvince?.length) {
        return getProvince[0]?.provinceCodeInMap;
      }
    }
  }, [MergeArr, trackingData]);

  const DetailHighlight = useCallback(
    (geography: any) => {
      if (MyCurrentTree) {
        return siteData.find((data) => MyCurrentTree === geography.rsmKey)
          ? '#00874a'
          : siteData.find((data) => data.provinceCodeInMap === geography.rsmKey)
          ? '#87CE29'
          : '#fff';
      } else if (siteData.find((data) => data.provinceCodeInMap === geography.rsmKey)) {
        return '#87CE29';
      } else {
        return '#fff';
      }
    },
    [MyCurrentTree, siteData]
  );

  const HomeHighlight = useCallback(
    (geography: any) => {
      if (provinceClick) {
        if (
          siteData.find(
            (data) => data.provinceCodeInMap === provinceClick && provinceClick === geography.rsmKey
          )
        ) {
          return '#00874a';
        } else if (siteData.find((data) => data.provinceCodeInMap === geography.rsmKey)) {
          return '#87CE29';
        } else {
          return '#fff';
        }
      } else {
        if (geography.rsmKey === 'geo-42') {
          return '#00874a';
        } else if (siteData.find((data) => data.provinceCodeInMap === geography.rsmKey)) {
          return '#87CE29';
        } else {
          return '#fff';
        }
      }
    },
    [siteData, provinceClick]
  );

  const MarkToMap = useMemo(() => {
    const stringLocationArr = [];
    if (MergeArr) {
      const getArr = MergeArr.filter((m) => {
        return m.length > 0;
      });
      const marks = getArr.map((arr) => {
        return arr.find((a) => a?.provinceCodeInMap);
      });
      if (typeof window !== 'undefined') {
        marks?.forEach((m) => {
          if (m?.provinceCodeInMap === trackingData?.provinceCodeInMap) {
            return stringLocationArr.push({
              key: m?.publicCode,
              coordinates: [Number(m?.longitude) - 1.05, Number(m?.latitude) + 1.45],
              isPlanting: true,
              code: m?.provinceCodeInMap,
            });
          } else {
            return stringLocationArr.push({
              key: m?.publicCode,
              coordinates: [Number(m?.longitude) - 1.1, Number(m?.latitude) + 1.3],
              isPlanting: false,
              code: m?.provinceCodeInMap,
            });
          }
        });
      }
    }
    return stringLocationArr;
  }, [MergeArr, trackingData]);

  const StoryAndHistory = useMemo(() => {
    if (screenWidth) {
      return (
        <div className="w-[90%] desktop:w-[85%] h-full mx-auto">
          {screenWidth >= 1025 && (
            <div className="">
              <p className="uppercase heading-1 text-white-500 font-bold mobile:text-center laptop:text-start">
                danh sách <br className="bloack tablet:hidden" />
                điểm trồng cây
              </p>
              <div className=" laptop:mb-4 mobile:mb-2 ">
                <p className="text-white-500 mobile:text-center laptop:text-start">
                  Mỗi điểm trồng cây đều có một câu chuyện riêng. Click vào từng mảng xanh trên bản
                  đồ để cùng tìm hiểu.
                </p>
              </div>
            </div>
          )}
          <div className="text-justify">
            <TreeDetailStoryTreesJourney data={siteData} trackingData={trackingData} />
          </div>
        </div>
      );
    }
    return '';
  }, [siteData, screenWidth]);

  const responsiveMap = useMemo(() => {
    if (screenWidth >= 1600) {
      if (screenHeight <= 1000) {
        return 'scale(1) translate(0%, 8%)';
      } else if (screenHeight <= 2000) {
        return 'scale(1) translate(0%, 8%)';
      }
    } else if (screenWidth >= 1400) {
      return 'scale(1.1) translate(8px, 86px)';
    } else if (screenWidth >= 1300) {
      return 'scale(1.1) translate(1%, 80px)';
    } else if (screenWidth >= 1200) {
      return 'scale(1.1) translate(10px, 70px)';
    } else if (screenWidth >= 1100) {
      return 'scale(1.2) translate(100px, 40px)';
    } else if (screenWidth >= 1030) {
      return 'scale(1) translate(100px, 40px)';
    } else if (screenWidth > 1025) {
      return 'scale(1) translate(-10%, 10%)';
    } else if (screenWidth >= 768) {
      if (screenHeight <= 1000) {
        return 'scale(1) translate(0%, 10%)';
      } else {
        return 'scale(1) translate(0%, 10%)';
      }
    } else {
      return 'scale(1.2) translate(1%, 16%)';
    }
  }, [screenWidth, screenHeight]);

  const projection = geoPolyhedralWaterman().translate([-3550, 1900]).scale(2300).rotate([0, 0, 0]);
  // const projection = geoPolyhedralWaterman().translate([-3650, 1900]).scale(2300).rotate([0, 0, 0]);

  const TreeMap = useMemo(() => {
    if (screenWidth) {
      return (
        <>
          <ComposableMap
            projection={projection}
            width={850}
            height={850}
            style={{
              overflow: 'hidden',
              transform: `rotate(76deg) ${responsiveMap}`,
              width: `${screenWidth >= 1025 ? '100%' : '100%'}`,
              height: '100%',
            }}
          >
            <Geographies geography={vnTopo} style={{ transform: 'translate(-50px, 50px)' }}>
              {({ geographies }) => {
                return geographies.map((geography, i: number) => {
                  return (
                    geography.id !== 'ATA' && (
                      <Geography
                        onClick={() => handleClick(geography)}
                        key={i}
                        geography={geography}
                        className="cursor-pointer"
                        style={{
                          default: {
                            fill:
                              router.pathname === '/trees-journey'
                                ? HomeHighlight(geography)
                                : router.pathname === '/tree-detail/[id]'
                                ? DetailHighlight(geography)
                                : '',
                            stroke: '#F59FBC',
                            strokeWidth: 1,
                            outline: 'none',
                          },
                          hover: {
                            fill:
                              router.pathname === '/trees-journey'
                                ? HomeHighlight(geography)
                                : router.pathname === '/tree-detail/[id]'
                                ? DetailHighlight(geography)
                                : '',
                            stroke: '#F59FBC',
                            strokeWidth: 1,
                            outline: 'none',
                          },
                          pressed: {
                            fill:
                              router.pathname === '/trees-journey'
                                ? HomeHighlight(geography)
                                : router.pathname === '/tree-detail/[id]'
                                ? DetailHighlight(geography)
                                : '',
                            stroke: '#F59FBC',
                            strokeWidth: 1,
                            outline: 'none',
                          },
                        }}
                      />
                    )
                  );
                });
              }}
            </Geographies>
            {router.pathname !== '/trees-journey' &&
              MarkToMap &&
              MarkToMap.map((data) => {
                if (data.isPlanting) {
                  return (
                    <>
                      <Marker key={data.province} coordinates={data.coordinates}>
                        <svg
                          width={50}
                          height={50}
                          viewBox="0 0 50 50"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="grey" transform="rotate(-75) translate(-30 0)">
                            <path
                              d="M32.5 16.25C32.5 27.5 20 36.25 20 36.25C20 36.25 7.5 27.5 7.5 16.25C7.5 12.9348 8.81696 9.75537 11.1612 7.41117C13.5054 5.06696 16.6848 3.75 20 3.75C23.3152 3.75 26.4946 5.06696 28.8388 7.41117C31.183 9.75537 32.5 12.9348 32.5 16.25V16.25Z"
                              fill="white"
                              stroke={'#00384F'}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M20.1525 23.5147C24.5882 23.5147 28.184 19.8789 28.184 15.3938C28.184 10.9088 24.5882 7.27295 20.1525 7.27295C15.7169 7.27295 12.1211 10.9088 12.1211 15.3938C12.1211 19.8789 15.7169 23.5147 20.1525 23.5147Z"
                              fill="#DCEEC0"
                            />
                            <path
                              d="M19.3389 13.7793H19.0813V27.8791H19.3389V13.7793Z"
                              fill="#00384F"
                            />
                            <path
                              d="M17.3269 19.2203C16.5497 19.2193 15.802 18.9191 15.2358 18.3807C14.6697 17.8423 14.3275 17.1062 14.2788 16.3219L14.2676 16.1333L14.4083 16.0066C14.8332 15.6158 15.3592 15.3551 15.9251 15.2549C16.4909 15.1547 17.0732 15.2192 17.6042 15.4409V15.4409C18.1365 15.6587 18.5967 16.025 18.9311 16.497C19.2656 16.9691 19.4604 17.5276 19.4931 18.1073L19.5051 18.2966L19.3643 18.4225C18.8063 18.9345 18.0803 19.2187 17.3269 19.2203V19.2203ZM15.0706 16.4649C15.1272 16.8613 15.2854 17.2359 15.5292 17.5516C15.7731 17.8672 16.0943 18.1129 16.461 18.2644C16.8278 18.4159 17.2272 18.4679 17.6199 18.4153C18.0126 18.3626 18.3849 18.2072 18.6999 17.9643C18.6447 17.5673 18.4871 17.192 18.243 16.8761C17.9989 16.5602 17.6769 16.3148 17.3093 16.1646V16.1646C16.9429 16.0115 16.5431 15.9586 16.1501 16.0113C15.7571 16.064 15.3848 16.2205 15.0706 16.4649V16.4649Z"
                              fill="#00384F"
                            />
                            <path
                              d="M21.4694 19.4057C20.5582 19.4037 19.6792 19.0645 18.9984 18.4521L18.8577 18.3269L18.8675 18.1383C18.9036 17.428 19.1372 16.7424 19.5416 16.1604C19.946 15.5784 20.5047 15.1237 21.1534 14.8486C21.8021 14.5736 22.5144 14.4892 23.2084 14.6054C23.9023 14.7216 24.5498 15.0335 25.0762 15.5053L25.2169 15.6299L25.2071 15.8191C25.1738 16.5303 24.9413 17.2172 24.5367 17.7999C24.1321 18.3826 23.5721 18.8371 22.9219 19.1103C22.462 19.3055 21.9682 19.4059 21.4694 19.4057ZM19.6557 17.9881C20.07 18.3165 20.5637 18.5267 21.0855 18.5968C21.6073 18.6669 22.1382 18.5943 22.6228 18.3866V18.3866C23.1088 18.1824 23.5317 17.8503 23.8477 17.4248C24.1637 16.9993 24.3611 16.496 24.4196 15.9672C24.0045 15.6404 23.5109 15.4312 22.9894 15.3612C22.4679 15.2912 21.9374 15.3628 21.4523 15.5687C20.9673 15.7746 20.5452 16.1074 20.2295 16.5329C19.9137 16.9583 19.7157 17.4611 19.6557 17.9896V17.9881Z"
                              fill="#00384F"
                            />
                            <path
                              d="M19.2101 14.3657C18.8148 14.3657 18.4284 14.2471 18.0997 14.0251C17.771 13.803 17.5148 13.4874 17.3636 13.1181C17.2123 12.7488 17.1727 12.3425 17.2498 11.9504C17.327 11.5584 17.5173 11.1983 17.7968 10.9157C18.0764 10.633 18.4325 10.4405 18.8202 10.3626C19.2079 10.2846 19.6098 10.3246 19.975 10.4776C20.3402 10.6305 20.6524 10.8896 20.872 11.2219C21.0916 11.5543 21.2089 11.945 21.2089 12.3447C21.2083 12.8805 20.9975 13.3942 20.6228 13.7731C20.2481 14.152 19.74 14.3651 19.2101 14.3657V14.3657ZM19.2101 11.1058C18.9676 11.1058 18.7306 11.1785 18.5289 11.3148C18.3273 11.451 18.1702 11.6447 18.0774 11.8712C17.9846 12.0978 17.9604 12.347 18.0078 12.5875C18.0551 12.828 18.172 13.0489 18.3435 13.2222C18.515 13.3956 18.7335 13.5136 18.9714 13.5613C19.2093 13.6091 19.4558 13.5844 19.6798 13.4905C19.9038 13.3965 20.0952 13.2375 20.2298 13.0336C20.3645 12.8296 20.4363 12.5899 20.4361 12.3447C20.4356 12.0162 20.3062 11.7013 20.0764 11.469C19.8466 11.2368 19.535 11.1062 19.2101 11.1058V11.1058Z"
                              fill="#00384F"
                            />
                          </g>
                        </svg>
                        <g transform="translate(60, -30)">{checkProvince(data.code)}</g>
                      </Marker>
                    </>
                  );
                } else {
                  return (
                    <>
                      <Marker key={data.province} coordinates={data.coordinates}>
                        <svg
                          width={30}
                          height={30}
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g transform="rotate(-75) translate(-30 0)">
                            <path
                              d="M32.5 16.25C32.5 27.5 20 36.25 20 36.25C20 36.25 7.5 27.5 7.5 16.25C7.5 12.9348 8.81696 9.75537 11.1612 7.41117C13.5054 5.06696 16.6848 3.75 20 3.75C23.3152 3.75 26.4946 5.06696 28.8388 7.41117C31.183 9.75537 32.5 12.9348 32.5 16.25V16.25Z"
                              fill="#CCCCCC"
                              stroke="#777777"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M20.1525 23.5147C24.5882 23.5147 28.184 19.8789 28.184 15.3938C28.184 10.9088 24.5882 7.27295 20.1525 7.27295C15.7169 7.27295 12.1211 10.9088 12.1211 15.3938C12.1211 19.8789 15.7169 23.5147 20.1525 23.5147Z"
                              fill="#EFF5EC"
                            />
                            <path
                              d="M19.3389 13.7793H19.0813V27.8791H19.3389V13.7793Z"
                              fill="#777777"
                            />
                            <path
                              d="M17.3269 19.2203C16.5497 19.2193 15.802 18.9191 15.2358 18.3807C14.6697 17.8423 14.3275 17.1062 14.2788 16.3219L14.2676 16.1333L14.4083 16.0066C14.8332 15.6158 15.3592 15.3551 15.9251 15.2549C16.4909 15.1547 17.0732 15.2192 17.6042 15.4409V15.4409C18.1365 15.6587 18.5967 16.025 18.9311 16.497C19.2656 16.9691 19.4604 17.5276 19.4931 18.1073L19.5051 18.2966L19.3643 18.4225C18.8063 18.9345 18.0803 19.2187 17.3269 19.2203V19.2203ZM15.0706 16.4649C15.1272 16.8613 15.2854 17.2359 15.5292 17.5516C15.7731 17.8672 16.0943 18.1129 16.461 18.2644C16.8278 18.4159 17.2272 18.4679 17.6199 18.4153C18.0126 18.3626 18.3849 18.2072 18.6999 17.9643C18.6447 17.5673 18.4871 17.192 18.243 16.8761C17.9989 16.5602 17.6769 16.3148 17.3093 16.1646V16.1646C16.9429 16.0115 16.5431 15.9586 16.1501 16.0113C15.7571 16.064 15.3848 16.2205 15.0706 16.4649V16.4649Z"
                              fill="#777777"
                            />
                            <path
                              d="M21.4694 19.4057C20.5582 19.4037 19.6792 19.0645 18.9984 18.4521L18.8577 18.3269L18.8675 18.1383C18.9036 17.428 19.1372 16.7424 19.5416 16.1604C19.946 15.5784 20.5047 15.1237 21.1534 14.8486C21.8021 14.5736 22.5144 14.4892 23.2084 14.6054C23.9023 14.7216 24.5498 15.0335 25.0762 15.5053L25.2169 15.6299L25.2071 15.8191C25.1738 16.5303 24.9413 17.2172 24.5367 17.7999C24.1321 18.3826 23.5721 18.8371 22.9219 19.1103C22.462 19.3055 21.9682 19.4059 21.4694 19.4057ZM19.6557 17.9881C20.07 18.3165 20.5637 18.5267 21.0855 18.5968C21.6073 18.6669 22.1382 18.5943 22.6228 18.3866V18.3866C23.1088 18.1824 23.5317 17.8503 23.8477 17.4248C24.1637 16.9993 24.3611 16.496 24.4196 15.9672C24.0045 15.6404 23.5109 15.4312 22.9894 15.3612C22.4679 15.2912 21.9374 15.3628 21.4523 15.5687C20.9673 15.7746 20.5452 16.1074 20.2295 16.5329C19.9137 16.9583 19.7157 17.4611 19.6557 17.9896V17.9881Z"
                              fill="#777777"
                            />
                            <path
                              d="M19.2101 14.3657C18.8148 14.3657 18.4284 14.2471 18.0997 14.0251C17.771 13.803 17.5148 13.4874 17.3636 13.1181C17.2123 12.7488 17.1727 12.3425 17.2498 11.9504C17.327 11.5584 17.5173 11.1983 17.7968 10.9157C18.0764 10.633 18.4325 10.4405 18.8202 10.3626C19.2079 10.2846 19.6098 10.3246 19.975 10.4776C20.3402 10.6305 20.6524 10.8896 20.872 11.2219C21.0916 11.5543 21.2089 11.945 21.2089 12.3447C21.2083 12.8805 20.9975 13.3942 20.6228 13.7731C20.2481 14.152 19.74 14.3651 19.2101 14.3657V14.3657ZM19.2101 11.1058C18.9676 11.1058 18.7306 11.1785 18.5289 11.3148C18.3273 11.451 18.1702 11.6447 18.0774 11.8712C17.9846 12.0978 17.9604 12.347 18.0078 12.5875C18.0551 12.828 18.172 13.0489 18.3435 13.2222C18.515 13.3956 18.7335 13.5136 18.9714 13.5613C19.2093 13.6091 19.4558 13.5844 19.6798 13.4905C19.9038 13.3965 20.0952 13.2375 20.2298 13.0336C20.3645 12.8296 20.4363 12.5899 20.4361 12.3447C20.4356 12.0162 20.3062 11.7013 20.0764 11.469C19.8466 11.2368 19.535 11.1062 19.2101 11.1058V11.1058Z"
                              fill="#777777"
                            />
                          </g>
                        </svg>
                      </Marker>
                    </>
                  );
                }
              })}
            {router.pathname === '/trees-journey' &&
              siteData?.map((data) => {
                return (
                  <>
                    <Marker
                      key={data.provinceCode}
                      coordinates={[Number(data?.longitude), Number(data?.latitude)]}
                    >
                      {checkProvince(data.provinceCodeInMap)}
                    </Marker>
                  </>
                );
              })}
            <Marker coordinates={[110, 17.95]}>{ISLAND.HOANG_SA.TEN_HOANG_SA}</Marker>
            {/* <Marker coordinates={[110.4, 15.35]}>{ISLAND.HOANG_SA.HOANG_SA_1}</Marker> */}
            <Marker coordinates={[112.1, 17.9]}>{ISLAND.HOANG_SA.HOANG_SA_2}</Marker>
            <Marker coordinates={[111.5, 17.9]}>{ISLAND.HOANG_SA.HOANG_SA_3}</Marker>

            <Marker coordinates={[111, 10.7]}>{ISLAND.TRUONG_SA.TEN_TRUONG_SA}</Marker>
            <Marker coordinates={[111.9, 11.8]}>{ISLAND.TRUONG_SA.TRUONG_SA_1}</Marker>
            <Marker coordinates={[112.2, 11.7]}>{ISLAND.TRUONG_SA.TRUONG_SA_2}</Marker>
            <Marker coordinates={[112.1, 10.7]}>{ISLAND.TRUONG_SA.TRUONG_SA_3}</Marker>
            <Marker coordinates={[112.8, 10.1]}>{ISLAND.TRUONG_SA.TRUONG_SA_4}</Marker>
            <Marker coordinates={[111.8, 10]}>{ISLAND.TRUONG_SA.TRUONG_SA_5}</Marker>
            <Marker coordinates={[111.2, 10.8]}>{ISLAND.TRUONG_SA.TRUONG_SA_6}</Marker>
            <Marker coordinates={[110.9, 10.8]}>{ISLAND.TRUONG_SA.TRUONG_SA_7}</Marker>
            <Marker coordinates={[110.1, 10.1]}>{ISLAND.TRUONG_SA.TRUONG_SA_8}</Marker>
          </ComposableMap>
        </>
      );
    }
  }, [DetailHighlight, HomeHighlight, MarkToMap, router, screenWidth, projection, responsiveMap]);

  return (
    <div className="tree-detail w-full h-full relative " id="tree-map">
      <div className="relative tree-detail__map tree-detail__journey laptop:px-5 flex flex-col laptop:flex-row items-center justify-evenly pt-[0] pb-[8%] tablet:py-[4%] laptop:py-[10%]">
        {screenWidth < 1025 && (
          <div className=" mb-4 tablet:mb-0">
            <p className="uppercase heading-1 text-white-500 font-bold text-center">
              danh sách <br className="bloack tablet:hidden" />
              điểm trồng cây
            </p>
            <div className="laptop:flex tablet:flex mobile:block laptop:justify-center mobile:justify-center tablet:justify-center items-center  mobile:mb-2 tablet:mb-4  laptop:mb-4 flex-wrap">
              <p className="px-2  text-white-500 text-center">
                Mỗi điểm trồng cây đều có một câu chuyện riêng. Click vào từng mảng xanh trên bản đồ
                để cùng tìm hiểu.
              </p>
            </div>
          </div>
        )}

        <div className="w-[60%] px-30 relative z-10">
          {screenWidth <= 1025 ? (
            <Modal
              open={showStory.isShow}
              footer={null}
              closeIcon={false}
              closable={true}
              onCancel={() => setShowStory({ id: '', isShow: false })}
            >
              {StoryAndHistory}
            </Modal>
          ) : (
            StoryAndHistory
          )}
          <div className="invisible h-[0px]">{StoryAndHistory}</div>
        </div>

        <div className="mx-auto laptop:mx-0 w-[100%] tablet:w-[40%] desktopXL:w-[40%] px-8 desktopXL:px-14 relative z-10 ">
          <div
            className="py-10 desktopXL:py-4 bg-gray-100"
            style={{
              boxShadow: ` 4px 4px 40px 0px rgba(0, 0, 0, 0.25)`,
            }}
          >
            {TreeMap}
          </div>
        </div>

        <img className="hidden laptop:block absolute left-0 top-[10%] desktopXL:top-[60%] -translate-y-1/2 " src={decorLeaf1.src} alt="" />
      </div>
    </div>
  );
};
export default MapTreesJourney;

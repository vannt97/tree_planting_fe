import Image from 'next/image';
import { useRouter } from 'next/router';
import Leaf from 'public/icons/gardenLeaf.svg';
import menuBarIcon from 'public/icons/menu-bar.svg';
import garden from 'public/images/garden.png';
import Tree3 from 'public/images/gardenTree1.svg';
import Tree1 from 'public/images/gardenTree2.svg';
import Tree2 from 'public/images/gardenTree3.svg';
import TreeActive31 from 'public/icons/iconsTreeActiveFull.svg';
import TreeActive3 from 'public/images/treeActiveFull.png';
import myGardenImg from 'public/images/my-garden.png';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import useWindowSize from 'src/app/hooks/useWindowSize';
import Seo from 'src/components/Seo';
import HeaderSideMenu from 'src/layout/Header/HeaderSideMenu';
import { useLazyGetArrayTreeQuery } from 'src/services/home';
import { useLazyGetTreeHistoryQuery } from 'src/services/warranty';
import { decodeBase64 } from 'src/utils/helpers/common';
import TreeModal from './TreeModal';
import { Tree } from './type';

const Trees = [Tree1, Tree2, Tree3];
const Garden = () => {
  const dispatch = useDispatch();
  const width = useWindowSize()?.width;
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [treeData, setTreeData] = useState<any[]>([]);
  const [treeDetail, setTreeDetail] = useState<Tree>();
  const [randomArr, setRandomArr] = useState<number[]>([]);
  const [userName, setUserName] = useState('');
  const [activeTreeCode, setActiveTreeCode] = useState<string>('');
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [getClientTree, { data }] = useLazyGetTreeHistoryQuery();
  const [getArrayTree, { data: treeDataBE }] = useLazyGetArrayTreeQuery();

  useEffect(() => {
    setUserName(localStorage.getItem('user_name'));
    setActiveTreeCode(localStorage.getItem('tree_code'));
  }, []);

  useEffect(() => {
    const phoneNumber = decodeBase64(String(router?.query?.key) as string);
    getClientTree({ phoneNumber, publicCode: '' });
  }, [router, getClientTree]);

  if (typeof window !== 'undefined') {
    window.onfocus = function () {
      if (localStorage.getItem('pn') !== router.query.key) {
        router.push(`/my-garden?key=${localStorage.getItem('pn')}`);
        setUserName(localStorage?.getItem('username'));
      } else {
      }
    };
  }

  useEffect(() => {
    treeDataBE && setTreeData(treeDataBE);
  }, [treeDataBE, dispatch]);

  useEffect(() => {
    if (data?.length) {
      const array = data.map((d) => {
        return `StringCode=${d.treeCode}&`;
      });
      localStorage.setItem('my_tree_codes', JSON.stringify(array));
      getArrayTree(array.join(''));
    }
  }, [data, getArrayTree]);

  const handleClick = (tree: Tree) => {
    setOpen(true);
    setTreeDetail(tree);
  };

  useEffect(() => {
    if (treeData) {
      let array = treeData.map((tree, index) => index);
      for (let i = array?.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      setRandomArr(array);
    }
  }, [treeData]);

  const TemplateArea = useCallback((length: number) => {
    let gridTemplate = {
      area: '',
      columns: '',
      rows: '',
    };
    if (length <= 2) {
      gridTemplate = {
        area: `'h1  h2' `,
        columns: '1fr 1fr',
        rows: '100%',
      };
    } else if (length <= 3) {
      gridTemplate = {
        area: `'h1 h2 h3'`,
        columns: '1fr 1fr 1fr',
        rows: '100%',
      };
    } else if (length <= 4) {
      gridTemplate = {
        area: `'h1 h2' 'h3 h4'`,
        columns: '1fr 1fr',
        rows: '50% 50%',
      };
    } else if (length <= 6) {
      gridTemplate = {
        area: `'h1 h2' 'h3 h4' 'h5 h6'`,
        columns: '1fr 1fr',
        rows: '33.3% 33.3% 33.3%',
      };
    } else if (length <= 9) {
      gridTemplate = {
        area: `'h1 h2 h3' 'h4 h5 h6' 'h7 h8 h9'`,
        columns: '1fr 1fr 1fr',
        rows: '33.3% 33.3% 33.3%',
      };
    } else if (length <= 12) {
      gridTemplate = {
        area: `'h1 h2 h3 h4' 'h5 h6 h7 h8' 'h9 h10 h11 h12'`,
        columns: '1fr 1fr 1fr 1fr',
        rows: '33.3% 33.3% 33.3%',
      };
    } else if (length <= 18) {
      gridTemplate = {
        area: `'h1 h2 h3 h4 h5 h6' 'h7 h8 h9 h10 h11 h12' 'h13 h14 h15 h16 h17 h18'`,
        columns: '1fr 1fr 1fr 1fr 1fr 1fr',
        rows: '33.3% 33.3% 33.3%',
      };
    } else if (length <= 24) {
      gridTemplate = {
        area: `'h1 h2 h3 h4 h5 h6' 'h7 h8 h9 h10 h11 h12' 'h13 h14 h15 h16 h17 h18' 'h19 h20 h21 h22 h23 h24'`,
        columns: '1fr 1fr 1fr 1fr 1fr 1fr',
        rows: '25% 25% 25% 25%',
      };
    } else if (length <= 30) {
      gridTemplate = {
        area: `'h1 h2 h3 h4 h5 h6 h7 h8 h9 h10' 'h11 h12 h13 h14 h15 h16 h17 h18 h19 h20' 'h21 h22 h23 h24 h25 h26 h27 h28 h29 h30'`,
        columns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        rows: '33.3% 33.3% 33.3%',
      };
    } else if (length <= 40) {
      gridTemplate = {
        area: `'h1 h2 h3 h4 h5 h6 h7 h8 h9 h10' 'h11 h12 h13 h14 h15 h16 h17 h18 h19 h20' 'h21 h22 h23 h24 h25 h26 h27 h28 h29 h30' 'h31 h32 h33 h34 h35 h36 h37 h38 h39 h40'`,
        columns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        rows: '25% 25% 25% 25%',
      };
    } else if (length <= 50) {
      gridTemplate = {
        area: `'h1 h2 h3 h4 h5 h6 h7 h8 h9 h10' 'h11 h12 h13 h14 h15 h16 h17 h18 h19 h20' 'h21 h22 h23 h24 h25 h26 h27 h28 h29 h30' 'h31 h32 h33 h34 h35 h36 h37 h38 h39 h40' 'h41 h42 h43 h44 h45 h46 h47 h48 h49 h50'`,
        columns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        rows: '20% 20% 20% 20% 20%',
      };
    } else {
      gridTemplate = {
        area: `'h1 h2 h3 h4 h5 h6 h7 h8 h9 h10 h11 h12 h13 h14 h15 h16 h17 h18 h19 h20' 
        'h21 h22 h23 h24 h25 h26 h27 h28 h29 h30 h31 h32 h33 h34 h35 h36 h37 h38 h39 h40' 
        'h41 h42 h43 h44 h45 h46 h47 h48 h49 h50 h51 h52 h53 h54 h55 h56 h57 h58 h59 h60' 
        'h61 h62 h63 h64 h65 h66 h67 h68 h69 h70 h71 h72 h73 h74 h75 h76 h77 h78 h79 h80' 
        'h81 h82 h83 h84 h85 h86 h87 h88 h89 h90 h91 h92 h93 h94 h95 h96 h97 h98 h99 h100' 
        'h101 h102 h103 h104 h105 h106 h107 h108 h109 h110 h111 h112 h113 h114 h115 h116 h117 h118 h119 h120'`,
        columns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        rows: '16.6% 16.6% 16.6% 16.6% 16.6% 16.6%',
      };
    }
    return gridTemplate;
  }, []);

  const treesMemo = useMemo(() => {
    if (treeData?.length) {
      return treeData?.map((tree, index) => {
        const random = Math.ceil(Math.random() * 3);
        return (
          <div
            className="text-center cursor-pointer mx-auto my-auto"
            style={{
              width: `${activeTreeCode === tree?.publicCode ? '100%' : '60%'}`,
              gridArea: randomArr?.length && `h${index + 1}`,
            }}
            key={index}
            onClick={() => handleClick(tree)}
          >
            {activeTreeCode === tree?.publicCode ? (
              <Image src={TreeActive3} alt="tree" layout="intrinsic" />
            ) : (
              <Image src={Trees[random - 1]} alt="tree" layout="intrinsic" />
            )}

            {treeData?.length <= 3 && (
              <div className="flex justify-center">
                <Image src={Leaf} alt="tree-detail" width={30} height={30} />
                <div className="" style={{ fontWeight: '900', color: ' #171717' }}>
                  <p className="text-left laptop:text-[16px] tablet:text-[14px] text-[14px] w-max">
                    {tree?.treeHistory[2].treeName || 'Tên Cây'}
                  </p>
                  <p className="text-left laptop:text-[16px] tablet:text-[14px] text-[14px]">
                    {tree?.location || 'Vị Trí'}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      });
    }
  }, [treeData, randomArr]);

  return (
    <>
      <Seo
        url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/my-garden`}
        title="Vườn của bạn"
        thumnail={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/${myGardenImg.src}`}
        description="Vườn của bạn"
      />
      <div className="relative w-full h-screen overflow-hidden">
        <Image src={garden} layout="fill" alt="bg" />
        <div className="">
          <span
            onClick={() => setOpenNav(true)}
            className="header__icon container-custom absolute cursor-pointer z-50 top-[1rem]"
          >
            <Image src={menuBarIcon} alt="" layout="fixed" width={25} height={25} />
          </span>
        </div>
        {!treeData?.length ? (
          <div
            style={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              width: '100%',
              height: '100vh',
              zIndex: '100000',
              position: 'absolute',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              style={{
                margin: 'auto',
                background: 'none',
                display: 'block',
                shapeRendering: 'auto',
                top: '50%',
                left: '50%',
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                height: '100vh',
              }}
              width="204px"
              height="204px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#87ce29" stroke="none">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  dur="0.7042253521126761s"
                  repeatCount="indefinite"
                  keyTimes="0;1"
                  values="0 50 51;360 50 51"
                ></animateTransform>
              </path>
            </svg>
          </div>
        ) : (
          <div className="relative w-full h-screen">
            <div className="garden__title z-20 w-full">
              <p className="text-[24px] tablet:text-[48px] laptop:text-[48px]">cẢM ƠN {userName}</p>
              <p className="text-[24px] tablet:text-[48px] laptop:text-[48px]">
                đÃ GÓP {('0' + treeData.length).slice(-treeData.length.toString().split('').length)}{' '}
                CÂY CHO RỪNG
              </p>
            </div>
            <div
              className="garden__trees w-full grid px-1 absolute bottom-[12%]"
              style={{
                gridTemplateAreas: `${TemplateArea(treeData.length).area}`,
                gridTemplateColumns: `${TemplateArea(treeData.length).columns}`,
                gridTemplateRows: `${TemplateArea(treeData.length).rows}`,
              }}
            >
              {treesMemo}
            </div>

            <TreeModal open={open} close={() => setOpen(false)} treeDetail={treeDetail} />
          </div>
        )}
      </div>
      <HeaderSideMenu onClose={() => setOpenNav(false)} show={openNav} />
    </>
  );
};

export default memo(Garden);

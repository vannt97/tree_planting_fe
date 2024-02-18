import Image from 'next/image';
import huyHieu1 from 'public/images/huy-hieu-1.png';
export default function MedalPage(props: any) {
  return (
    <section className="">
      <div className="text-center w-[100vw] h-[100vh] flex justify-center items-center">
        <div>
          {/* <Image
            alt="huy hieu"
            src={huyHieu1.src}
            width={huyHieu1.width}
            height={huyHieu1.height}
          /> */}
          {props?.linkTree ? <Image alt="huy hieu" objectFit='contain' src={props?.linkTree} width={huyHieu1.src} height={huyHieu1.height} /> : ''}
          {props?.nameTree ? (
            <p className="uppercase font-bold text-green-primary">
              {props?.nameTree}
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
    </section>
  );
}

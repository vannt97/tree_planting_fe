import { Image } from 'antd';
import questionImg from 'public/images/game/12.jpg';

const CardGame = ({ id, name, flipped, matched, clicked }) => {
  return (
    <div
      onClick={() => (flipped ? undefined : clicked(name, id))}
      className={'card' + (flipped ? ' flipped' : '') + (matched ? ' matched' : '')}
    >
      <div className="back">
        <img src={questionImg.src} alt="" className="h-full w-full rounded-[10px]" />
        {/* <Image src={questionImg.src} alt="" /> */}
      </div>
      <div className="front">
        <img alt={name} src={'/images/game/' + name + '.png'} />
      </div>
    </div>
  );
};

export default CardGame;

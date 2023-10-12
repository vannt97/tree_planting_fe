import moment from 'moment';

const TimeSheet = ({ data }: any) => {
  return (
    <div className="time-sheet">
      <div className="flex flex-nowrap">
        <div className="time-sheet__left__item py-[6px]">
          <p className="text-[10px] laptop:text-[14px] tablet:text-[14px]">
            {moment(data[2]?.timeLine)?.format('DD')} Th{moment(data[2]?.timeLine)?.format('MM')}
          </p>
          <p className="text-[10px] laptop:text-[14px] tablet:text-[14px]">
            {moment(data[2]?.timeLine)?.format('HH:mm')}
          </p>
        </div>
        <div className="time-sheet__right">
          <div className="time-sheet__right__item text-green-primary active px-[8px] py-[6px] laptop:text-[18px] tablet:text-[18px]">
            {data[2]?.title}
          </div>
          <div className=" pb-4">
            <div className="font-bold px-[8px] py-[6px]">Kế hoạch trồng cây:</div>
            <ul className="list-disc ml-8">
              <li>Loại cây: {data[2]?.treeName}</li>
              <li>
                Thời gian trồng dự kiến:&nbsp;
                {moment(data[2]?.estimatedPlantingTime).format('MM/YYYY')}
              </li>
              <li>Địa điểm trồng: {data[2]?.plantingLocation}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-nowrap mb-4">
        <div className="time-sheet__left__item py-[6px]">
          <p className="text-[10px] laptop:text-[14px] tablet:text-[14px]">
            {moment(data[1]?.timeLine)?.format('DD')} Th{moment(data[1]?.timeLine)?.format('MM')}
          </p>
        </div>
        <div className="time-sheet__right">
          <div className="time-sheet__right__item text-green-primary active px-[8px] py-[6px] laptop:text-[18px] tablet:text-[18px]">
            {data[1]?.title}
          </div>
        </div>
      </div>

      <div className="flex flex-nowrap mb-4">
        <div className="time-sheet__left__item py-[6px]">
          <p className="text-[10px] laptop:text-[14px] tablet:text-[14px]">
            {moment(data[0]?.timeLine)?.format('DD')} Th{moment(data[0]?.timeLine)?.format('MM')}
          </p>
        </div>
        <div className="time-sheet__right">
          <div className="time-sheet__right__item text-green-primary active px-[8px] py-[6px] laptop:text-[18px] tablet:text-[18px]">
            {data[0]?.title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSheet;

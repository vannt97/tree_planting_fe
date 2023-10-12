import styled from "styled-components";

const TimerWrapper = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // .stop-watch {
  //   font-size: 6rem;
  //   margin-right: 1rem;
  // }
  // label {
  //   margin-bottom: 0.5rem;
  // }
  input {
    width: 44px;
    // margin: 0 auto;
    // padding: 10px;
    color: #282c34;
    outline: none;
    border: none;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    // padding: 0rem 0.5rem;
    border-radius: 4px;
    pointer-events: none;
  }
  input:hover {
    background-color: #928f8f;
  }
`;

export default function TimerNew({
  milliseconds,
  seconds,
  minutes,
  //   hours,
  // changeSeconds,
  // changeMinutes,
  //   changeHours,
}) {
  return (
    <TimerWrapper>
      {/* <BsStopwatch className="stop-watch " /> */}
      {/* <div className="d-flex flex-column">
        <label>hh</label>
        <input value={hours} onChange={changeHours} />
      </div> */}
      <div className="flex gap-1 p-3 rounded items-center pl-2">
        <div>
          <input value={minutes} />
          {/* <label>Phút</label> */}
          {/* <input value={minutes} onChange={changeMinutes} /> */}
        </div>
        <h1 className="text-4xl flex items-center">:</h1>
        <div>
          <input value={seconds} />
          {/* <label>Giây</label> */}
          {/* <input value={seconds} onChange={changeSeconds} /> */}
        </div>
      </div>
      {/* <div className="d-flex flex-column">
        <label>ms</label>
        <input value={milliseconds} />
      </div> */}
    </TimerWrapper>
  );
}

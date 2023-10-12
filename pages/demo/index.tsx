import Seo from "src/components/Seo";
import quizBg from "public/images/quiz/quiz-seo.png";
import CardGame from "src/components/Card/card";
// import GameOver from "src/components/Card/gameOver";
import { useEffect, useState } from "react";
// import CountdownTimer from "./CountdownTimer";
import { Avatar, Button, Input, Modal, Progress } from "antd";
import TimerNew from "./Timer";
// import CountdownTimerNew from "./Timer/index";

function Demo() {
  //timer
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // const THREE_MIN_IN_MS = 3 * 60 * 1000;
  // const NOW_IN_MS = new Date().getTime();
  const [isClient, setIsClient] = useState(false);
  const [name, setName] = useState("Aegona");
  const [isHidden, setIsHidden] = useState(false);
  const [checkName, setCheckName] = useState(false);
  // const [isStart, setIsStart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  // const [timeCounterEnd, setTimeCounterEnd] = useState(
  //   NOW_IN_MS + THREE_MIN_IN_MS
  // );
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverStatus, setGameOverStatus] = useState(false);
  const [isShowModalFinal, setIsShowModalFinal] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (localStorage.getItem("name")) {
      setCheckName(true);
    }
  }, []);

  //   useEffect(() => {
  //     if (isClick) {
  //       setTimeCounterEnd(NOW_IN_MS + THREE_MIN_IN_MS);
  //     }
  //   }, [timeCounterEnd]);
  // useEffect(() => {
  //   setGameOver(gameOverStatus);
  // }, [gameOverStatus]);

  function resetTimer() {
    // setIsRunning(false);
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(3);
    // setHours(0);
  }

  // useEffect(() => {
  //   if (localStorage.getItem("name")) {
  //     closeModal();
  //   }
  // }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (milliseconds > 0) {
          setMilliseconds((milliseconds) => milliseconds - 1);
        } else if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
          setMilliseconds(99);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
          setMilliseconds(99);
        }
        //  else if (hours > 0) {
        //   setHours((hours) => hours - 1);
        //   setMinutes(59);
        //   setSeconds(59);
        //   setMilliseconds(99);
        // }
      }, 10);
    }

    if (minutes === 0 && seconds === 0 && milliseconds === 1) {
      // setShowEndScreen({ ...showEndScreen, show: true });
      setGameOver(true);
      resetTimer();
      // setIsRunning(true);
    }
    return () => clearInterval(interval);
  }, [milliseconds, seconds, minutes, isRunning]);

  useEffect(() => {
    if (isGameOver) {
      setIsShowModalFinal(gameOverStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);
  const cards = [
    "TV",
    "TV",
    "hbird",
    "hbird",
    "seal",
    "seal",
    "tracks",
    "tracks",
  ];

  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  const [cardList, setCardList] = useState(
    shuffle(cards).map((name, index) => {
      return {
        id: index,
        name: name,
        flipped: false,
        matched: false,
      };
    })
  );

  //   const [timeOver, setTimeOver] = useState(false);

  const handleClick = (name, index) => {
    let currentCard = {
      name,
      index,
    };

    //update card is flipped
    let updateCards = cardList.map((card) => {
      if (card.id === index) {
        card.flipped = true;
      }
      return card;
    });
    let updateFlipped = flippedCards;
    updateFlipped.push(currentCard);
    setFlippedCards(updateFlipped);
    setCardList(updateCards);

    //if 2 cards are flipped, check if they are a match
    if (flippedCards.length === 2) {
      setTimeout(() => {
        check();
      }, 1000);
    }
  };

  const check = () => {
    let updateCards = cardList;
    if (
      flippedCards[0].name === flippedCards[1].name &&
      flippedCards[0].index !== flippedCards[1].index
    ) {
      updateCards[flippedCards[0].index].matched = true;
      updateCards[flippedCards[1].index].matched = true;
      isGameOver();
    } else {
      updateCards[flippedCards[0].index].flipped = false;
      updateCards[flippedCards[1].index].flipped = false;
    }
    setCardList(updateCards);
    setFlippedCards([]);
  };

  const isGameOver = () => {
    let done = true;
    cardList.forEach((card) => {
      if (!card.matched) {
        done = false;
      }
    });
    setGameOver(done);
    setGameOverStatus(done);
  };

  const restartGame = () => {
    setCardList(
      shuffle(cards).map((name, index) => {
        return {
          id: index,
          name: name,
          flipped: false,
          matched: false,
        };
      })
    );
    setFlippedCards([]);
    // setTimeCounterEnd(NOW_IN_MS + THREE_MIN_IN_MS);
    setGameOver(false);
    // setIsStart(true);
    resetTimer();
  };

  const claimReward = () => {
    console.log("claim");
  };

  // const onFinishCount = () => {
  //   setGameOver(true);
  // };

  const closeModal = () => {
    setIsRunning(true);
    setIsModalOpen(!isModalOpen);
    setIsHidden(!isHidden);
    localStorage.setItem("name", name);
  };
  const handleChangeName = (event: any) => {
    setName(event.target.value);
    console.log(name, "name");
  };
  return (
    <div>
      {isClient ? (
        <>
          <Modal open={isModalOpen} footer={false} className="modal__name ">
            {
              <div className="mb-4 text-center">
                <label
                  htmlFor="inputName"
                  className="font-play text-[28px] font-bold "
                >
                  Nhập tên của bạn
                  <Input
                    name="inputName h-[60px] font-play"
                    className="w-2/3"
                    type="text"
                    defaultValue={localStorage.getItem("name") || name}
                    onChange={handleChangeName}
                    allowClear
                  />
                </label>
              </div>
            }

            <div className="w-full text-center ">
              <Button
                onClick={closeModal}
                className="button__play text-1.5xl font-play"
              >
                Chơi ngay
              </Button>
            </div>
          </Modal>

          {isHidden ? (
            <div className="min-h-screen">
              <div className="flex h-full flex-col tablet:flex-row wrap-body">
                {!gameOver && (
                  <div className="w-full tablet:w-1/4  bg-[#33cccc] left__box">
                    <Progress
                      className="progressBar hidden"
                      percent={99.9}
                      status="active"
                      strokeColor={{ from: "#108ee9", to: "#87d068" }}
                    />
                    <div>{/* <CountdownTimerNew /> */}</div>
                    <div className="info__box">
                      <h2 className="py-3 font_game text-1.5xl font-bold">
                        {localStorage.getItem("name") || "Player1"}
                      </h2>
                      <Avatar
                        size={80}
                        icon={
                          <img
                            src="https://www.telegraph.co.uk/content/dam/news/2016/09/08/107667228_beech-tree-NEWS_trans_NvBQzQNjv4BqplGOf-dgG3z4gg9owgQTXEmhb5tXCQRHAvHRWfzHzHk.jpg"
                            alt=""
                            className="bg-cover object-contain"
                          />
                        }
                      />
                    </div>
                  </div>
                )}
                <div className="w-full right__content">
                  <Seo
                    description="Demo"
                    thumnail={quizBg.src}
                    title="Quiz"
                    url={`${process.env.NEXT_PUBLIC_DOMAIN_TEST}/demo`}
                  />
                  <div className="header__bar justify-between flex flex-col tablet:flex-row items-center ">
                    <div></div>
                    <h1 className="text-2xl tablet:text-2.5xl py-3 font-semibold font_game">
                      Tìm thẻ giống nhau
                    </h1>
                    <div className="flex items-center">
                      <p className="font_game text-1.5xl font-semibold">
                        Thời gian
                      </p>
                      <div>
                        <TimerNew
                          milliseconds={milliseconds}
                          seconds={seconds}
                          minutes={minutes}
                        />
                      </div>
                    </div>
                  </div>
                  <div></div>
                  <div className="game-board">
                    {!gameOver &&
                      cardList.map((card, index) => (
                        <>
                          <CardGame
                            key={index}
                            id={index}
                            name={card.name}
                            flipped={card.flipped}
                            matched={card.matched}
                            clicked={
                              flippedCards.length === 2 ? () => {} : handleClick
                            }
                          />
                        </>
                      ))}
                    {gameOver ? (
                      <div className="centered flex-col">
                        {gameOverStatus === true ? (
                          <Modal
                            open={isShowModalFinal}
                            className="text-center"
                            footer={false}
                          >
                            <h1 className="font_game text-1.5xl font-bold">
                              Chúc mừng bạn đã chiến thắng!
                            </h1>
                            <Button
                              className="restart-button mt-2"
                              onClick={claimReward}
                            >
                              <p className=" font_game text-1xl  ">
                                Nhận thưởng
                              </p>
                            </Button>
                            <Button
                              className="replay-button mt-2"
                              onClick={restartGame}
                            >
                              <p className=" font_game text-1xl  "> Chơi lại</p>
                            </Button>
                          </Modal>
                        ) : (
                          <Modal
                            open={!isShowModalFinal}
                            footer={false}
                            className="text-center"
                          >
                            <h1 className="font_game text-1.5xl font-bold">
                              Bạn thua mất rồi!
                            </h1>
                            <Button
                              className="replay-button  mt-2"
                              onClick={restartGame}
                            >
                              <p className=" font_game text-1xl  "> Chơi lại</p>
                            </Button>
                          </Modal>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end w-full py-2 bg-black-100">
                <p className="text-white-500 px-3">Designed by AEGONA Ltd.Co</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Demo;

// const CountdownTimerNew = () => {
//   //   const [hours, setHours] = useState(0);
//   // const [minutes, setMinutes] = useState(0);
//   // const [seconds, setSeconds] = useState(3);
//   // const [milliseconds, setMilliseconds] = useState(0);
//   // const [isRunning, setIsRunning] = useState(false);
//   // End of Time
//   // const [showEndScreen, setShowEndScreen] = useState({
//   //   show: false,
//   //   message: "Happy coding in 2023",
//   // });
//   //   const [showEndScreen, setShowEndScreen] = useState(</>);

//   // useEffect(() => {
//   //   if (isGameOver) {
//   //     setGameOver(true);
//   //     // resetTimer();
//   //   }
//   // }, [isGameOver]);

//   // useEffect(() => {
//   //   let interval;
//   //   if (isRunning) {
//   //     interval = setInterval(() => {
//   //       if (milliseconds > 0) {
//   //         setMilliseconds((milliseconds) => milliseconds - 1);
//   //       } else if (seconds > 0) {
//   //         setSeconds((seconds) => seconds - 1);
//   //         setMilliseconds(99);
//   //       } else if (minutes > 0) {
//   //         setMinutes((minutes) => minutes - 1);
//   //         setSeconds(59);
//   //         setMilliseconds(99);
//   //       }
//   //       //  else if (hours > 0) {
//   //       //   setHours((hours) => hours - 1);
//   //       //   setMinutes(59);
//   //       //   setSeconds(59);
//   //       //   setMilliseconds(99);
//   //       // }
//   //     }, 10);
//   //   }

//   // if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 1) {
//   // if (minutes === 0 && seconds === 0 && milliseconds === 1) {
//   //   // setShowEndScreen({ ...showEndScreen, show: true });
//   //   setGameOver(true);
//   //   resetTimer();
//   //   // setIsRunning(true);
//   // }
//   //   return () => clearInterval(interval);
//   // }, [milliseconds, seconds, minutes, isRunning]);
//   // }, [milliseconds, seconds, minutes, isRunning, showEndScreen.show]);
//   //   }, [milliseconds, seconds, minutes, hours, isRunning, showEndScreen.show]);
//   // Start Pause & Stop functions
//   // Start
//   // function startTimer() {
//   //   setIsRunning(true);
//   //   // if (hours !== 0 || minutes !== 0 || seconds !== 0 || milliseconds !== 0) {
//   //   // if (minutes !== 0 || seconds !== 0 || milliseconds !== 0) {
//   //   //   setShowEndScreen({ ...showEndScreen, show: false });
//   //   // } else {
//   //   //   window.alert("Add Time.");
//   //   // }
//   // }

//   //   // Pause
//   //   function pauseTimer() {
//   //     setIsRunning(false);
//   //   }
//   //   // Stop

//   //   function stopTimer() {
//   //     resetTimer();
//   //     setShowEndScreen({ ...showEndScreen, show: false });
//   //   }

//   // function resetTimer() {
//   //   setIsRunning(false);
//   //   setMilliseconds(0);
//   //   setSeconds(0);
//   //   setMinutes(3);
//   //   // setHours(0);
//   // }
//   // Handlers
//   // const changeSeconds = (e) => {
//   //   setSeconds(e.target.value);
//   // };
//   // const changeMinutes = (e) => {
//   //   setMinutes(e.target.value);
//   // };
//   //   const changeHours = (e) => {
//   //     setHours(e.target.value);
//   //   };
//   // const restartGame = () => {
//   //   setIsRunning(false);
//   //   setMilliseconds(0);
//   //   setSeconds(3);
//   //   setMinutes(0);
//   // };
//   return (
//     <div>
//       {/* {showEndScreen.show && (
//         // <h1 className="title text-light">{showEndScreen.message}</h1>
//         <GameOver
//           //   restartGame={(restartGame)}
//           restartGame={() => {
//             restartGame();
//           }}
//           //   claimReward={claimReward}
//           claimReward={() => {}}
//           status={null}
//         />
//       )} */}
//       <Timer
//         milliseconds={milliseconds}
//         seconds={seconds}
//         minutes={minutes}
//         // hours={hours}
//         changeSeconds={changeSeconds}
//         changeMinutes={changeMinutes}
//         // changeHours={changeHours}
//       />
//       {/* <br /> */}
//       {/* {!isRunning && (
//         <Button className="btn btn-accept btn-lg" onClick={startTimer}>
//           Bắt đầu
//         </Button>
//       )} */}
//       {/* <BsFillPlayFill /> */}
//       {/* {isRunning && (<button className="btn btn-warning btn-lg" onClick={pauseTimer}>
//           Pause</button>)
//       } */}
//       {/* <BsPauseFill /> */}
//       {/* <button className="btn btn-danger btn-lg" onClick={stopTimer}> */}
//       {/* <BsStopFill /> */}
//       {/* Stop */}
//       {/* </button> */}
//     </div>
//   );
// };

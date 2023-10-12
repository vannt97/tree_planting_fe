interface LoaderProps {
  loading: boolean;
}

function Loader(props: LoaderProps) {
  const { loading } = props;
  return (
    <>
      {loading ? (
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: '100vw',
            height: '100vh',
            zIndex: '100000',
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
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
        ''
      )}
    </>
  );
}

export default Loader;

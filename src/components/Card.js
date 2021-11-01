const Card = (props) => {
  const { data, flipped, disabled, onClick } = props;

  const handleClick = () => {
    if (!disabled) onClick(data);
  };

  return (
    <div key={data.id} className="relative w-24 h-24 sm:w-32 sm:h-32">
      <div
        className={`${
          flipped ? '' : 'absolute transition ease-in'
        } flex items-center justify-center w-full h-full p-2 duration-200 `}
        style={{ transform: `rotateY(${flipped ? '0' : '90'}deg)` }}
      >
        {data.icon}
      </div>

      <div
        className={`${
          flipped ? 'duration-[0ms]' : ' transition ease-in duration-200 '
        } w-full h-full p-2 bg-gray-300 rounded-lg`}
        style={{ transform: `rotateY(${flipped ? '90' : '0'}deg)` }}
        onClick={handleClick}
      />
    </div>
  );
};

export default Card;

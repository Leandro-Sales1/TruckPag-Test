import { useState } from 'react';

const DescriptionText = ({ text }: { text: string }) => {
  const [showAllText, setShowAllText] = useState(false);

  const toggle = () => {
    setShowAllText(!showAllText);
  };

  const getTruncatedText = () => {
    if (text != undefined) {
      const firstPeriodIndex = 70;
      return text.slice(0, firstPeriodIndex + 1);
    }
  };

  return (
    <>
      <p className="whitespace-pre-line text-sm">
        {showAllText ? text : `${getTruncatedText()}..`}
        {
          <button className="ml-1 underline cursor-pointer decoration-1 hover:no-underline" onClick={toggle}>
            {showAllText ? 'Show less' : 'Show more'}
          </button>
        }
      </p>
    </>
  );
};

export default DescriptionText;

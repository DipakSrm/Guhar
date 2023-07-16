import { useState } from "react";

export default function Carousel() {
  const [plus1, setplus1] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const data = [
    " https://cloud.appwrite.io/v1/storage/buckets/64b41ec462a90717dd34/files/64b420102005faf1d722/view?project=648d91fcb9386a6a3ee5&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/64b41ec462a90717dd34/files/64b4201a0fe14d1e9ebc/view?project=648d91fcb9386a6a3ee5&mode=admin",
    "https://cloud.appwrite.io/v1/storage/buckets/64b41ec462a90717dd34/files/64b42020e9c0e4af0e69/view?project=648d91fcb9386a6a3ee5&mode=admin",
  ];
  return (
    <>
      <div className="flex overflow-hidden ">
        {data.map((item, index) => {
          if (!plus1 && index === currentIndex) {
            return (
              <div
                key={index}
                className="min-h-[100%] min-w-full overflow-hidden"
              >
                <video height={1000} width={1000}>
                  <source src={item} />
                </video>
              </div>
            );
          } else if (plus1 && index === currentIndex + 1) {
            return (
              <div
                key={currentIndex < index ? index + 1 : currentIndex}
                className="min-h-[100%] min-w-full overflow-hidden"
              >
                <video height={1000} width={1000}>
                  <source src={item} />
                </video>
              </div>
            );
          } else if (index === currentIndex - 1) {
            return (
              <div
                key={index - 1}
                className="min-h-[100%] min-w-full overflow-hidden"
              >
                <video height={1000} width={1000}>
                  <source src={item} />
                </video>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="flex justify-evenly w-full">
        {" "}
        <button
          onClick={() => {
            setplus1(!plus1);
            setCurrentIndex(currentIndex + 1);
          }}
          className=" text-center bg-orange-200 text-black text-lg shadow rounded-md font-semibold py-3 px-4 my-5 "
        >
          +Next
        </button>
        <button
          onClick={() => {
            setCurrentIndex(currentIndex - 1);
          }}
          className="text-center bg-orange-200 text-black text-lg shadow rounded-md font-semibold py-3 px-4 my-5 "
        >
          -Previous
        </button>
      </div>
    </>
  );
}

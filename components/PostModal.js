import Image from "next/image";

export default function PostModal({ isOpen, close, post }) {
  return (
    <div>
      {isOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50">
            <div className="relative w-full max-w-xl my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg bg-white dark:bg-gray-800 w-full flex flex-col">
                <div className="flex items-start justify-between p-4 outline-none text-black dark:text-white">
                  <h3 className="text-l">{post.title}</h3>
                  <button className="text-l outline-none pl-4" onClick={close}>
                    X
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <Image
                    src={post.largest}
                    width="1000"
                    height="720"
                    layout="responsive"
                    alt="modal image"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="opacity-25 fixed inset-0 z-10 bg-black dark:bg-gray-400"
            onClick={close}
          />
        </>
      )}
    </div>
  );
}

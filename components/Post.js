import { useState } from "react";
import Image from "next/image";
import PostModal from "./PostModal";

export default function Post({ post }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white dark:bg-transparent border-2 border-gray-300 p-4 rounded shadow-lg">
      {post.thumbnail && (
        <div
          className="self-center rounded-md flex-shrink-0"
          onClick={() => setShowModal(true)}
        >
          <Image src={post.thumbnail} width="100" height="100" />
        </div>
      )}
      <div className="ml-4 text-l font-medium text-black dark:text-white self-center">
        {post.title}
      </div>
      <PostModal
        isOpen={showModal && post.largest}
        close={closeModal}
        post={post}
      />
    </div>
  );
}

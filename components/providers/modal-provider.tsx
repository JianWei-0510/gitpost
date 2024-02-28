"use client";

import { useEffect, useState } from "react";
import { CreatePostModal } from "../modals/create-post-modal";
import { EditPostModal } from "../modals/edit-post-modal";
import { DeletePostModal } from "../modals/delete-post-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreatePostModal />
      <EditPostModal />
      <DeletePostModal />
    </>
  );
};

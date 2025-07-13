import StorePostsManager from "@app/client/pages/Profile/stores/Posts/Store-Posts-Manager";
import { useParams } from "react-router-dom";
import { z } from "zod";

function usePostsStore() {
  const id = z.coerce.number().parse(useParams().id)
  const store = StorePostsManager.getOrCreateStore(id)
  return store
}

export default usePostsStore
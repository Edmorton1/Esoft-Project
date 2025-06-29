import StorePosts from "@/pages/Profile/stores/Store-Posts"
import StoreProfile from "@/pages/Profile/stores/Store-Profile"
import useInfinitPaginationDoc from "@/shared/hooks/usePagination/useInfinitPaginationDoc"
import { serverPaths } from "@shared/PATHS"
import { observer } from "mobx-react-lite"

function PostsHead() {
  useInfinitPaginationDoc(`${serverPaths.postsGet}/${StoreProfile.profile?.id}?cursor=${StorePosts.cursor}`, StorePosts.cursor === null, (data) => StorePosts.lazyLoadPosts(data), )
  
  return StorePosts.posts?.map(e => (
    <div key={e.id} style={{height: "500px"}}>
      {e.text}
      <p>Can Change: {String(StorePosts.canChange)}</p>
    </div>
  ))
}

export default observer(PostsHead)
import logger from "@s/helpers/logger";
import Yandex from "@s/helpers/yandex";
import ORM from "@s/infrastructure/db/SQL/ORM";
import FilesService from "@s/infrastructure/services/Files.service";
// import PostsModule from "@s/infrastructure/endpoints/Posts/sql/Posts.module";
import { POSTS_LIMIT } from "@shared/CONST";
import { PostsDTO } from "@t/gen/dtoObjects";
import { Posts } from "@t/gen/Users";
import { inject, injectable } from "inversify";
import { z } from "zod";

interface IPostsService {
	get: (userid: number, cursor: number | undefined) => Promise<Posts[]>;
	post: (postsDTO: PostsDTO) => Promise<Posts>;
	put: (id: number, postsDTO: PostsDTO) => Promise<Posts | null>;
	delete: (post_id: number, userid: number) => Promise<Posts | null>;
}

@injectable()
class PostsService {
  constructor (
    @inject(ORM)
    private readonly ORM: ORM,
    @inject(Yandex)
    private readonly yandex: Yandex,
    @inject(FilesService)
    private readonly filesService: FilesService
    // @inject(PostsModule)
		// private readonly postsModule: PostsModule,
  ) {}
	get: IPostsService["get"] = async (userid, cursor) => {
    const total = await this.ORM.getByParams({userid: userid}, "posts", undefined, {
      infinitPagination: {
        cursor: cursor ? cursor : 0,
        limit: POSTS_LIMIT,
        orderBy: "asc"
      },
    });

    return total
  };

	post: IPostsService["post"] = async (postsDTO) => {
    const {files, ...data} = postsDTO
    const [request] = await this.ORM.post(data, "posts")
    logger.info({DLINNA: files.length})

    let total = request;
    if (files.length) {
      const yandexFiles = await this.filesService.uploadFiles(request.id, files, "posts")
      total = (await this.ORM.put({...data, files: yandexFiles}, request.id, "posts", postsDTO.userid))[0]
    }

    return total
  };

	put: IPostsService["put"] = async (id, postsDTO) => {
    const {files, ...data} = postsDTO

    const [old_data] = await this.ORM.getById(id, "posts", "userid")
    if (old_data.id === data.userid) return null

    let yandexFiles;

    // const updateFiles = JSON.stringify(old_data.files.sort()) !== JSON.stringify(files)

    if (files.length) {
      this.yandex.deleteFolder(id, "posts")
      yandexFiles = await this.filesService.uploadFiles(id, files, "posts")
    }
    
    const total = await this.ORM.put({...data, files: yandexFiles ?? []}, id, "posts", postsDTO.userid)

    if (!total.length) {
      return null
    }

    return total[0]
  };

	delete: IPostsService["delete"] = async (post_id, userid) => {
    const deleted = await this.ORM.delete(post_id, "posts", userid)

    if (!deleted.length) {
      return null
    }

    return deleted[0]
  };
}

export default PostsService;

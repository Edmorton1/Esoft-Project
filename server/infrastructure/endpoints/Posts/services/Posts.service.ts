import TYPES from "@s/config/containers/types";
import { ILogger } from "@s/helpers/logger/logger.controller";
import Yandex, { IYandex } from "@s/helpers/yandex";
import ORM, { IORM } from "@s/infrastructure/db/SQL/ORM";
import FilesService, { IFilesService } from "@s/infrastructure/services/Files.service";
// import PostsModule from "@s/infrastructure/endpoints/Posts/sql/Posts.module";
import { POSTS_LIMIT } from "@shared/CONST";
import { PostsDTO, PostsDTOPut } from "@t/gen/dtoObjects";
import { Posts } from "@t/gen/Users";
import { inject, injectable } from "inversify";
import { z } from "zod";

interface IPostsService {
	get: (userid: number, cursor: number | undefined) => Promise<Posts[]>;
	post: (postsDTO: PostsDTO) => Promise<Posts>;
	put: (post_id: number, postsDTO: PostsDTOPut) => Promise<Posts | null>;
	delete: (post_id: number, userid: number) => Promise<Posts | null>;
}

@injectable()
class PostsService {
  constructor (
    @inject(TYPES.LoggerController)
    private readonly logger: ILogger,
    @inject(ORM)
    private readonly ORM: IORM,
    @inject(Yandex)
    private readonly yandex: IYandex,
    @inject(FilesService)
    private readonly filesService: IFilesService
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
    this.logger.info({DLINNA: files.length})

    let total = request;
    if (files.length) {
      const yandexFiles = await this.filesService.uploadFiles(request.id, files, "posts")
      total = (await this.ORM.put({...data, files: yandexFiles}, request.id, "posts", postsDTO.userid))[0]
    }

    return total
  };

	put: IPostsService["put"] = async (post_id, postsDTO) => {
    const {files, remove_old,...data} = postsDTO

    const [old_data] = await this.ORM.getById(post_id, "posts", "userid, files")

    this.logger.info({DATA_IN_DB_OLD: old_data})

    if (old_data.id === data.userid) return null

    let yandexFiles;

    const cleanded_old_data = await this.yandex.deleteArr(post_id, remove_old, "posts")
    
    if (files.length + cleanded_old_data.length > 3) throw new Error("Нельзя загрузить больше 3-х файлов")
    // const updateFiles = JSON.stringify(old_data.files.sort()) !== JSON.stringify(files)

    if (files.length) {
      yandexFiles = await this.filesService.uploadFiles(post_id, files, "posts")
      yandexFiles.push(...cleanded_old_data)
    } else {
      yandexFiles = cleanded_old_data
    }

    const total = await this.ORM.put({...data, files: yandexFiles}, post_id, "posts", postsDTO.userid)

    if (!total.length) {
      return null
    }

    return total[0]
  };

	delete: IPostsService["delete"] = async (post_id, userid) => {
    // СДЕЛАТЬ УДАЛЕНИЕ ПАПКИ В ЯНДЕКСЕ
    const deleted = await this.ORM.delete(post_id, "posts", userid)

    if (!deleted.length) {
      return null
    }

    return deleted[0]
  };
}

export default PostsService;

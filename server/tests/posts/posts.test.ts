import { IYandex } from "@s/helpers/yandex";
import { IORM } from "@s/infrastructure/db/SQL/ORM";
import PostsService from "@s/infrastructure/endpoints/Posts/services/Posts.service";
import { IFilesService } from "@s/infrastructure/services/Files.service";
import { PostsDTOPut } from "@t/gen/dtoObjects";

describe("[POSTS]: Изменение сообщений", () => {
	it("Должен вернуть ошибку больше 3-х", async () => {
		const mockORM: jest.Mocked<IORM> = {
			get: jest.fn(),
			getById: jest
				.fn()
				.mockResolvedValue([
					{ id: 1, userid: 123, files: [] },
				] as any),
			getByParams: jest.fn(),
			getManyParams: jest.fn(),
			post: jest.fn(),
			postArr: jest.fn(),
			put: jest.fn().mockResolvedValue([{id: 1, userid: 123, files: [], text: "test", created_at: "123"}]),
			delete: jest.fn(),
		};

		const mockYandex: jest.Mocked<IYandex> = {
			deleteArr: jest.fn().mockResolvedValue([]),
			deleteFolder: jest.fn(),
			getFolder: jest.fn(),
			upload: jest.fn(),
		};

    const mockFileService: jest.Mocked<IFilesService> = {
      uploadAvatar: jest.fn(),
      uploadFiles: jest.fn().mockResolvedValue([])
    }

    const postsService = new PostsService(mockORM, mockYandex, mockFileService)
    const mockDTO: PostsDTOPut = {
      userid: 123,
      remove_old: [],
      files: [],
      text: "test"
    }

    await postsService.put(1, mockDTO)
	});
});

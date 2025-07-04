import { IYandex } from "@app/server/helpers/yandex";
import { IORM } from "@app/server/infrastructure/db/SQL/ORM";
import PostsService from "@app/server/infrastructure/endpoints/Posts/services/Posts.service";
import { IFilesService } from "@app/server/infrastructure/services/Files.service";
import ConsoleService from "@app/server/tests/console.service";
import { PostsDTOPut } from "@app/types/gen/dtoObjects";
import { Posts } from "@app/types/gen/Users";

type SimplifiedMockDTO = {
  remove_old: string[];
  files: string[];
};

const mockFileService: Partial<jest.Mocked<IFilesService>> = {
	uploadFiles: jest
		.fn()
		.mockImplementation((post_id: number, data: Express.Multer.File[]) =>
			data.map(e => `NewFile-${String(Math.round(Math.random() * 100))}`),
		),
};

const createMockORM = (
	old_in_db: Partial<Posts>,
): Partial<jest.Mocked<IORM>> => {
	return {
		getById: jest.fn().mockResolvedValue([old_in_db]),
		put: jest.fn().mockImplementation(data => Promise.resolve([data])),
	};
};

const createMockYandex = (arr: string[]): Partial<jest.Mocked<IYandex>> => ({
	deleteArr: jest
		.fn()
		.mockImplementation((post_id: number, data: string[]) =>
			data.filter(e => !arr.includes(e)),
		),
});

const createPostService = (files: string[]) =>
	new PostsService(
		new ConsoleService(),
		createMockORM({ id: 1, userid: 123, files }) as IORM,
		createMockYandex(files) as IYandex,
		mockFileService as IFilesService,
	);

const createMockDTO = (
	data: SimplifiedMockDTO,
): PostsDTOPut => {
	return {
		...data,
		text: "text",
		userid: 123,
		files: data.files as unknown as Express.Multer.File[],
	};
};


describe("[POSTS]: Изменение сообщений", () => {
	it("Должен вернуть ошибку больше 3-х", async () => {
    
		const mockPost: string[] = []
		const postsService = createPostService(mockPost)

    const mockDTO = createMockDTO({
      remove_old: [],
      files: ["file1", "file2", "file3", "file4"],
    })

    await expect(postsService.put(1, mockDTO)).rejects.toThrow()
	});

	it("Должен удалить 3 файла и добавить 3", async () => {
		const mockPost = ["file1", "file2", "file3"]
		const postsService = createPostService(mockPost)

		const mockDTO = createMockDTO({
			remove_old: ["file1", "file2", "file3"],
			files: ["new-file1", "new-file2", "new-file3"]
		})

		const result = await postsService.put(1, mockDTO)
		console.log(result)
		expect(result?.files).toHaveLength(3)
		expect(result?.files.every(e => e.includes("NewFile-"))).toBe(true)
	})
});

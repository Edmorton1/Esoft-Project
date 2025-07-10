import AuthService from "@app/server/infrastructure/endpoints/Auth/services/Auth.service";
import SettingsService from "@app/server/infrastructure/endpoints/Settings/services/Settings.service";
import MessagesService from "@app/server/infrastructure/endpoints/Messages/services/Messages.service";
import LikesService from "@app/server/infrastructure/endpoints/Likes/services/LikesService";
import MessageOutService from "@app/server/infrastructure/endpoints/MessageOutside/service/MessageOut.service";
import PostsService from "@app/server/infrastructure/endpoints/Posts/services/Posts.service";
import { ContainerModule } from "inversify";

const serviceBindings = new ContainerModule(({ bind }) => {
	bind<LikesService>(LikesService).toSelf();
	bind<AuthService>(AuthService).toSelf();
	bind<SettingsService>(SettingsService).toSelf();
	bind<MessageOutService>(MessageOutService).toSelf();
	bind<MessagesService>(MessagesService).toSelf();
	bind<PostsService>(PostsService).toSelf();
});

export default serviceBindings;

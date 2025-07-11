import AuthService from "@app/server/infrastructure/requests/Auth/services/Auth.service";
import SettingsService from "@app/server/infrastructure/requests/Settings/services/Settings.service";
import MessagesService from "@app/server/infrastructure/requests/Messages/services/Messages.service";
import LikesService from "@app/server/infrastructure/requests/Likes/services/LikesService";
import MessageOutService from "@app/server/infrastructure/requests/MessageOutside/service/MessageOut.service";
import PostsService from "@app/server/infrastructure/requests/Posts/services/Posts.service";
import { ContainerModule } from "inversify";
import GoogleService from "@app/server/infrastructure/requests/Google/service/Google.service";

const serviceBindings = new ContainerModule(({ bind }) => {
	bind<LikesService>(LikesService).toSelf();
	bind<AuthService>(AuthService).toSelf();
	bind<SettingsService>(SettingsService).toSelf();
	bind<MessageOutService>(MessageOutService).toSelf();
	bind<MessagesService>(MessagesService).toSelf();
	bind<PostsService>(PostsService).toSelf();
	bind<GoogleService>(GoogleService).toSelf();
});

export default serviceBindings;

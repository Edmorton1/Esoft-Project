import ExtendedSearchModule from "@app/server/infrastructure/requests/ExtendSearch/SQL/ExtendedSearch.module";
import ExtendedSeacrhSQLhelper from "@app/server/infrastructure/requests/ExtendSearch/SQL/ExtendedSeacrh.SQLhelper";
import LikesModule from "@app/server/infrastructure/requests/Likes/sql/Likes.module";
import MessagesOutModule from "@app/server/infrastructure/requests/MessageOutside/sql/MessagesOut.module";
import MessagesSQL from "@app/server/infrastructure/requests/Messages/SQL/Message.module";
import { ContainerModule } from "inversify";

const moduleBindings = new ContainerModule(({ bind }) => {
	bind<LikesModule>(LikesModule).toSelf();
	bind<ExtendedSeacrhSQLhelper>(ExtendedSeacrhSQLhelper).toSelf();
	bind<ExtendedSearchModule>(ExtendedSearchModule).toSelf();
	bind<MessagesOutModule>(MessagesOutModule).toSelf();
	bind<MessagesSQL>(MessagesSQL).toSelf();
});

export default moduleBindings
import ExtendedSearchModule from "@app/server/infrastructure/endpoints/ExtendSearch/SQL/ExtendedSearch.module";
import ExtendedSeacrhSQLhelper from "@app/server/infrastructure/endpoints/ExtendSearch/SQL/ExtendedSeacrh.SQLhelper";
import LikesModule from "@app/server/infrastructure/endpoints/Likes/sql/Likes.module";
import MessagesOutModule from "@app/server/infrastructure/endpoints/MessageOutside/sql/MessagesOut.module";
import MessagesSQL from "@app/server/infrastructure/endpoints/Messages/SQL/Message.module";
import { ContainerModule } from "inversify";

const moduleBindings = new ContainerModule(({ bind }) => {
	bind<LikesModule>(LikesModule).toSelf();
	bind<ExtendedSeacrhSQLhelper>(ExtendedSeacrhSQLhelper).toSelf();
	bind<ExtendedSearchModule>(ExtendedSearchModule).toSelf();
	bind<MessagesOutModule>(MessagesOutModule).toSelf();
	bind<MessagesSQL>(MessagesSQL).toSelf();
});

export default moduleBindings
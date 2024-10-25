import express from "express";
import { IRouteSchema } from "../interface/interface";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { ChatRoutes } from "../modules/chat/chat.route";
import { MessageRoutes } from "../modules/message/message.route";
import { ChatPreferenceRoutes } from "../modules/chat.preference/chat.route";
import { MessagePreferenceRoutes } from "../modules/message.preference/message.preference.route";

const router = express.Router();

const moduleRoutes: Array<IRouteSchema> = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/chat",
    route: ChatRoutes,
  },
  {
    path: "/message",
    route: MessageRoutes,
  },
  {
    path: "/chat-preference",
    route: ChatPreferenceRoutes,
  },
  {
    path: "/message-preference",
    route: MessagePreferenceRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;

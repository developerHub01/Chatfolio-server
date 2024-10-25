import messageSchema from "./model.schema";
import { IMessage } from "../message.interface";

messageSchema.pre<IMessage>(
  "save",
  async function (next: () => void) {
    /*
     *
     * your cods
     * some more codes
     * codes and codes
     *
     */
    next();
  },
);

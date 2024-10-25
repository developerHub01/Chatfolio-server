import ChatSchema from "./model.schema";
import { IChat } from "../chat.interface";

ChatSchema.pre<IChat>("save", async function (next: () => void) {
  /*
   *
   * your cods
   * some more codes
   * codes and codes
   *
   */
  next();
});

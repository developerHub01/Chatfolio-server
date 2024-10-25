import ChatPreferenceSchema from "./model.schema";
import { IChatPreference } from "../chat.interface";

ChatPreferenceSchema.pre<IChatPreference>(
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

import messagePreferenceSchema from "./model.schema";
import { IMessagePreference } from "../message.preference.interface";

messagePreferenceSchema.pre<IMessagePreference>(
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

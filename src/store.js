import { configureStore } from "@reduxjs/toolkit";
import activeUser from "../slices/userSlices";

export const store = configureStore({
    reducer: {
        userData: activeUser,
    },
});

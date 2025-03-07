import { createSlice } from "@reduxjs/toolkit";
import thunkAuthRegister from "./thunk/thunkAuthRegister"
import thunkAuthLogin from "./thunk/thunkAuthLogin"
import { isString, TLoading } from "@types";

interface IAuthState {
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
    } | null;
    accessToken: string | null;
    loading: TLoading;
    error: string | null
}

const initialState: IAuthState = {
    user: null,
    accessToken: null,
    loading: "idle",
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetUI: (state) => {
            state.loading = "idle";
            state.error = null;
        },
        authLogout: (state) => {
            state.user = null;
            state.accessToken = null;
        },
    },
    extraReducers: (builder) => {
        // Register
        builder.addCase(thunkAuthRegister.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(thunkAuthRegister.fulfilled, (state) => {
            state.loading = "succeeded"
            state.error = null
        })
        builder.addCase(thunkAuthRegister.rejected, (state, action) => {
            state.loading = "failed"
            if (isString(action.payload)) {
                state.error = action.payload
            }
        }
        )
        // Login
        builder.addCase(thunkAuthLogin.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(thunkAuthLogin.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        })
        builder.addCase(thunkAuthLogin.rejected, (state, action) => {
            state.loading = "failed"
            if (isString(action.payload)) {
                state.error = action.payload
            }
        }
        )
    }
})

export { thunkAuthRegister, thunkAuthLogin }
export const { resetUI, authLogout } = authSlice.actions
export default authSlice.reducer
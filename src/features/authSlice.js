    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import axiosInstance from './axiosInstance';

    const initialState = {
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
    };

    export const RegisterUser = createAsyncThunk('user/RegisterUser', async (user, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/register', user);
            return response.data;
        } catch (error) {
            if (error.response) {
                const message = error.response.data.msg;
                return thunkAPI.rejectWithValue(message);
            }
            return thunkAPI.rejectWithValue(error.message);
        }
    }); 
            

    export const LoginUser = createAsyncThunk('user/LoginUser', async (user, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/login', {
                email: user.email,
                password: user.password
            });
            const userData = response.data;
            sessionStorage.setItem('user', JSON.stringify(userData)); // Simpan data pengguna di sessionStorage
            return userData;    
        } catch (error) {
            if (error.response) {
                const message = error.response.data.msg;
                return thunkAPI.rejectWithValue(message);
            }
            return thunkAPI.rejectWithValue(error.message);
        }
    });



    export const logoutUser = createAsyncThunk('user/logoutUser', async (_, thunkAPI) => {
        try {
          await axiosInstance.delete('/logout'); // Memanggil endpoint logout
          sessionStorage.removeItem('user'); // Hapus data sesi pengguna
          return true; // Berhasil
        } catch (error) {
          const message = error.response?.data?.msg || error.message; // Ambil pesan error
          return thunkAPI.rejectWithValue(message); // Kirim pesan error ke komponen
        }
      });
      


    export const getMe = createAsyncThunk('user/getMe', async (_, thunkAPI) => {
        const user = sessionStorage.getItem('user');
        // console.log('session', user)
        if (user) {
            return JSON.parse(user);
        } else {
            return thunkAPI.rejectWithValue('User not authenticated');
        }
    });


    const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
            reset: () => initialState,
        },
        extraReducers: (builder) => {
            builder
                .addCase(LoginUser.pending, (state) => {
                    state.isLoading = true;
                })
                // .addCase(LoginUser.fulfilled, (state, action) => {
                //     state.isLoading = false;
                //     state.isSuccess = true;
                //     state.user = action.payload;
                // })
                .addCase(LoginUser.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.isSuccess = true;
                        const userData = action.payload;

                        // Pastikan role ada dalam payload sebelum disimpan
                        if (userData && userData.role) {
                            state.user = userData;
                            sessionStorage.setItem('user', JSON.stringify(userData));
                        } else {
                            state.user = null; // Reset user jika role tidak ditemukan
                        }
                    })

                .addCase(LoginUser.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                })
                .addCase(logoutUser.fulfilled, (state) => {
                    state.user = null;
                    state.isSuccess = false;
                })
                .addCase(getMe.fulfilled, (state, action) => {
                    state.user = action.payload;
                    state.isSuccess = true;
                })
                .addCase(getMe.rejected, (state) => {
                    state.user = null;
                    state.isSuccess = false;
                })
                .addCase(RegisterUser.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(RegisterUser.fulfilled, (state) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                })
                .addCase(RegisterUser.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                });
        },
    });

    export const selectUser = (state) => state.auth.user;
    export const { reset } = authSlice.actions;
    export default authSlice.reducer;

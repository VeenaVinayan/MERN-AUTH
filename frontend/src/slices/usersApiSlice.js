import {apiSlice} from './apiSlice';

const USERS_URL ='/api/user';
const ADMIN_URL='/api/admin';
export const userApiSlice = apiSlice.injectEndpoints({
     endpoints: (builder) => ({
        login: builder.mutation({
               query : (data) => ({
               url: `${USERS_URL}/auth`,
               method:'POST',
               body: data,
               credentials: 'include',
            })
        }),
        logout: builder.mutation({
            query: () =>({
               url : `${USERS_URL}/logout`,
               method:'POST',
               credentials: 'include',
          })
        }),
        register: builder.mutation({
         query : (data) => ({
         url: `${USERS_URL}`,
         method:'POST',
         body: data,
         credentials: 'include',
      })
     }),
      profileImage : builder.mutation({
           query: (data) => ({
              url:`${USERS_URL}/setProfileImage`,
              method:'PUT',
              body: data,
              credentials: 'include',
           })
     }),
      admin: builder.mutation({
       query: (data) => ({
         url: `${ADMIN_URL}`,
         method:'POST',
         body:data,
         credentials: 'include',
     })
   }), 
   dashboard: builder.mutation({
         query: (data) =>({
          url: `${ADMIN_URL}/dashboard`,
          method: 'GET',
          credentials: 'include',
       })
   }),
   updateProfile: builder.mutation({
        query: (data) => ({
           url: `${USERS_URL}/profile`,
           method:'PUT',
           body: data,
           credentials: 'include',
     })
   }),
   deleteUser : builder.mutation({
        query: (data) => ({
           url: `${ADMIN_URL}/deleteUser`,
           method:'PATCH',
           body: data,
           credentials:'include',
      })
   }),
   addUser: builder.mutation({
       query: (data) => ({
          url: `${ADMIN_URL}/addUser`,
          method:'POST',
          body:data,
          credentials:'include',
       })
   }),
   updateUserProfile: builder.mutation({
       query: (data) =>({
          url : `${ADMIN_URL}/updateUserProfile`,
          method:'PATCH',
          body:data,
          credentials: 'include',
       })
   }) 
  }) 
});

export const { useLoginMutation,useLogoutMutation,
   useRegisterMutation ,
   useAdminMutation, 
   useDashboardMutation, 
   useProfileImageMutation, 
   useUpdateProfileMutation,
   useDeleteUserMutation,
   useAddUserMutation,
   useUpdateUserProfileMutation       } = userApiSlice;
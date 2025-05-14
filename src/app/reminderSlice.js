import api from "./api";

const ReminderApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllReminders: builder.query({
            query: () => ({
                url: `/api/reminder/getAll/car/:vin`,
                method: 'GET',
            }),
            providesTags: ['Reminder'],
        }),
        getReminder: builder.query({
            query: () => ({
                url: `/api/reminder/getReminder/:id`,
                method: 'GET',
            }),
            providesTags: ['Reminder'],
        }),
        createReminder: builder.mutation({
            query: (title,note) => ({
                url: `/api/reminder/create/car/:vin`,
                method: 'POST',
                body: title,note,
            }),
            invalidatesTags: ['Reminder'],
        }),
        deleteReminder: builder.mutation({
        query: () => ({
            url: `/api/reminder/deleteReminder/:vin`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Reminder'],
        }),
      updateReminder: builder.mutation({
        query: (title,note) => ({
            url: `/api/reminder/updateReminder/:id`,
            method: 'PUT',
            body: title,note,
        }),
        invalidatesTags: ['Reminder'],
        }),
    })
})

export const { useGetAllRemindersQuery, useGetReminderQuery, useCreateReminderMutation, useDeleteReminderMutation, useUpdateReminderMutation } = ReminderApi;

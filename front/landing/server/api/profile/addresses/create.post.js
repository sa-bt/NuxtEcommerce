export default defineEventHandler(async (event) => {
    const {
        public: {apiBase},
    } = useRuntimeConfig();
    const token = getCookie(event, "token");
    try {
        const data = await $fetch(`${apiBase}/profile/addresses/create`, {
            headers: {
                Method: 'POST',
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return data.data;
    } catch (error) {
        return error;
    }
});
  
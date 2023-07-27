export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body)
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const token = getCookie(event, "token");
  try {
    const data = await $fetch(`${apiBase}/check-coupon`, {
      method: "POST",
      body: body ,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
});

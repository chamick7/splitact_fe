export const requirePageAuth = (res) => {
  const isLogined = true;

  if (!isLogined) {
    res.writeHead(302, { Location: "/login" });
    res.end();
  }

  return;
};

export function getServerSideProps({ res }) {
  res.writeHead(302, { Location: "/profile/me" });
  res.end();
}

export default function index() {
  return <div></div>;
}

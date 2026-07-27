import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <>
      <h1>404</h1>
      <h2>PAGE NOT FOUND</h2>
      <p>Sorry,the page you are looking for does not exist</p>
      <Link to="/">Go Home</Link>
    </>
  );
}

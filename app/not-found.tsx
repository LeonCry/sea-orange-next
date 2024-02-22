import Link from 'next/link';
const notFound = () => {
  return (
    <div className=" text-4xl">
      <h2>Not Found current page.</h2>
      <p>Could not find requested resource</p>
      <br />
      <Link href="/" className="cursor-pointer border p-2 hover:bg-blue-100">
        Return Home
      </Link>
    </div>
  );
};

export default notFound;

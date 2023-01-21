import React from "react";
import Link from "next/link";
import CreateForm from "../components/CreateForm";

const initialvalues = {
  title: "",
  price: "",
  likes: 0,
  dislikes: 0,
};

const create = () => {
  //   const [values, setValues] = useState(initialvalues);
  //   const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="flex flex-col justify-center first-line:items-center p-4 mt-8 ">
      <CreateForm />
      <Link href="/">
        <button className="w-full p-2 mt-10 bg-gradient-to-tr from-black to-yellow-900 text-white hover:bg-gradient-to-tl from-black to-yellow-700 hover:-translate-y-0.5 rounded-lg mt-2">
          Go to homepage
        </button>
      </Link>
    </div>
  );
};

export default create;

import React, { useState } from "react";

const CreateForm = ({
  values,
  setValues,
  initialvalues,
  isCreated,
  createFood,
  price,
  owner,
  token,
  foodId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await createFood();
    setValues(initialvalues);
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="basis-1/2">
        <form onSubmit={handleSubmit} className="flex flex-col mr-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="m-1 p-2 bg-purple-100 rounded-lg"
            onChange={handleChange}
            value={values.title}
          />
          <input
            type="text"
            name="price"
            placeholder="Price (in Wei)"
            className="m-1 p-2 bg-purple-100 rounded-lg"
            onChange={handleChange}
            value={values.price}
          />
          <input
            type="text"
            name="photo"
            placeholder="Url for photo"
            className="m-1 p-2 bg-purple-100 rounded-lg"
            onChange={handleChange}
            value={values.photo}
          />

          {isSubmitting ? (
            <button
              type="submit"
              className="w-full p-2 bg-gradient-to-tr from-black to-blue-900 text-white hover:bg-gradient-to-tl from-black to-blue-700 hover:-translate-y-0.5 rounded-lg mt-2"
            >
              Waiting
            </button>
          ) : (
            <button
              type="submit"
              className="w-full p-2 bg-gradient-to-tr from-black to-blue-900 text-white hover:bg-gradient-to-tl from-black to-blue-700 hover:-translate-y-0.5 rounded-lg mt-2"
            >
              Create
            </button>
          )}
        </form>
      </div>
      <div className="basis-1/2 mt-2 md:mt-0">
        {isCreated ? (
          <div className="text-xl md:text-2xl  xl:text-3xl flex justify-center content-center items-center bg-cyan-100 rounded-xl h-full font-bold text-cyan-900 border border-blue-200 p-3 ">
            <p>People are waiting for your meal offer</p>
          </div>
        ) : (
          <div className="basis-1/2 text-sm md:text-lg  xl:text-xl  bg-cyan-100 rounded-xl h-full font-bold text-cyan-900 border border-blue-200 p-3 ">
            <h2>Creater:{owner}</h2>
            <h2>Food's given id no : {foodId}</h2>
            <h2>Food price :{price / 10 ** 18} ETH</h2>
            <h2>Food token :{token / 10 ** 18} CF</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateForm;

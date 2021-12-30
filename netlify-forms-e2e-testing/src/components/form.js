import * as React from "react";

import { useForm } from "react-hook-form";

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

const FormComponent = () => {
  const { register, handleSubmit } = useForm();

  const [result, setResult] = React.useState("");

  const sendForm = (formData, event) => {
    setResult(JSON.stringify(formData));
    event.preventDefault();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...formData,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Message successfully sent.");
        } else {
          console.error("Oops. Something went wrong.");
        }
      })
      .catch((e) => console.error(e));
  };

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit(sendForm)}
      className="w-[600px]"
    >
      <p class="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>
      <div className="mb-6">
        <label
          for="firstName"
          className="block mb-2 text-sm font-medium text-white"
        >
          First name
        </label>
        <input
          {...register("firstName")}
          placeholder="First name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          data-cy="firstName"
        />
      </div>

      <div className="mb-6">
        <label
          for="lastName"
          className="block mb-2 text-sm font-medium text-white"
        >
          Last name
        </label>
        <input
          {...register("lastName")}
          placeholder="Last name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          data-cy="lastName"
        />
      </div>

      <div className="mb-6">
        <label
          for="category"
          className="block mb-2 text-sm font-medium text-white"
        >
          Category
        </label>
        <select
          {...register("category")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          data-cy="category"
        >
          <option value="">Select...</option>
          <option value="A">Category A</option>
          <option value="B">Category B</option>
        </select>
      </div>

      <p className="text-white my-6">{result}</p>

      <input
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
        data-cy="submit"
      />
    </form>
  );
};

export default FormComponent;

import * as React from "react";

import { useForm } from "react-hook-form";

const FormComponent = () => {
  const { register, handleSubmit } = useForm();

  const sendForm = (formData, event) => {
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
        reset();
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
    >
      <p class="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>
      <input {...register("firstName")} placeholder="First name" />
      <input {...register("lastName")} placeholder="Last name" />
      <select {...register("category")}>
        <option value="">Select...</option>
        <option value="A">Category A</option>
        <option value="B">Category B</option>
      </select>
      <p>{result}</p>
      <input type="submit" />
    </form>
  );
};

export default FormComponent;

"use client";

import { Inter as Font } from "next/font/google";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Form from "@radix-ui/react-form";

const font = Font({ subsets: ["latin"] });

interface FormData {
  email: string;
  endDate: string;
  firstName: string;
  lastName: string;
  location: string;
  message: string;
  startDate: string;
}

const cities = [
  "Aliso Viejo",
  "Anaheim",
  "Brea",
  "Buena Park",
  "Costa Mesa",
  "Cypress",
  "Dana Point",
  "Fountain Valley",
  "Fullerton",
  "Garden Grove",
  "Huntington Beach",
  "Irvine",
  "La Habra",
  "La Palma",
  "Laguna Beach",
  "Laguna Hills",
  "Laguna Niguel",
  "Laguna Woods",
  "Lake Forest",
  "Los Alamitos",
  "Mission Viejo",
  "Newport Beach",
  "Orange",
  "Placentia",
  "Rancho Santa Margarita",
  "San Clemente",
  "San Juan Capistrano",
  "Santa Ana",
  "Seal Beach",
  "Stanton",
  "Tustin",
  "Villa Park",
  "Westminster",
  "Yorba Linda",
];

export function ContactForm() {
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      endDate: today,
      firstName: "",
      lastName: "",
      location: "",
      message: "",
      startDate: today,
    },
  });

  const onSubmit = (data: FormData) => {
    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        alert("Thank you for your submission!");
        setValue("email", "");
        setValue("endDate", today);
        setValue("firstName", "");
        setValue("lastName", "");
        setValue("location", "");
        setValue("message", "");
        setValue("startDate", today);
      } else {
        alert("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <Form.Root
      className="container mx-auto grid max-w-screen-lg grid-cols-2 gap-3 rounded-lg bg-white px-6 py-4 shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-span-full flex flex-col items-center justify-center">
        <h3
          className="py-1.5 text-3xl font-semibold text-zinc-800"
          style={font.style}
        >
          Contact Us
        </h3>
        <span className="text-md py-1.5 text-center font-light text-zinc-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id reiciendis
          deleniti incidunt, totam earum aliquid labore. Ut assumenda
          repellendus, quas laboriosam tenetur, delectus recusandae numquam
          voluptates omnis, aliquam molestiae magni!
        </span>
        <Image
          alt="BFT-01"
          src="/images/BFT-01.jpg"
          className="aspect-[2/1] w-full object-cover object-center"
          width={1024}
          height={576}
        />
      </div>
      {/* First Name */}
      <Form.Field
        name="firstName"
        className="col-span-full flex flex-col rounded-sm"
      >
        <Form.Label className="py-1.5 text-xs font-semibold uppercase text-zinc-600">
          First Name
        </Form.Label>
        <Form.Control
          {...register("firstName", { required: true })}
          className={`rounded-b-none rounded-t border-b ${
            errors.firstName ? "border-red-600" : "border-zinc-300"
          } bg-zinc-100 px-3 py-4 focus:outline-none`}
          type="text"
        />
      </Form.Field>

      {/* Last Name */}
      <Form.Field
        name="lastName"
        className="col-span-full flex flex-col rounded-sm"
      >
        <Form.Label className="py-1.5 text-xs font-semibold uppercase text-zinc-600">
          Last Name
        </Form.Label>
        <Form.Control
          {...register("lastName", { required: true })}
          className={`rounded-b-none rounded-t border-b ${
            errors.lastName ? "border-red-600" : "border-zinc-300"
          } bg-zinc-100 px-3 py-4 focus:outline-none`}
          type="text"
        />
      </Form.Field>

      {/* Email */}
      <Form.Field
        name="email"
        className="col-span-full flex flex-col rounded-sm"
      >
        <Form.Label className="py-1.5 text-xs font-semibold uppercase text-zinc-600">
          Email
        </Form.Label>
        <Form.Control
          {...register("email", { required: true })}
          className={`rounded-b-none rounded-t border-b ${
            errors.email ? "border-red-600" : "border-zinc-300"
          } bg-zinc-100 px-3 py-4 focus:outline-none`}
          type="email"
        />
      </Form.Field>

      {/* Location */}
      <Form.Field
        name="location"
        className="col-span-full flex flex-col rounded-sm"
      >
        <Form.Label className="py-1.5 text-xs font-semibold uppercase text-zinc-600">
          Location
        </Form.Label>
        <Form.Control asChild>
          <select
            {...register("location", { required: true })}
            className={`appearance-none rounded-b-none rounded-t border-b ${
              errors.location ? "border-red-600" : "border-zinc-300"
            } bg-zinc-100 px-3 py-4 focus:outline-none`}
          >
            {cities.map((city) => {
              return (
                <option key={city} value={city}>
                  {city}
                </option>
              );
            })}
          </select>
        </Form.Control>
      </Form.Field>

      {/* Start Date */}
      <Form.Field
        name="startDate"
        className="col-span-full flex flex-col rounded-sm md:col-span-1"
      >
        <Form.Label className="py-1.5 text-xs font-semibold uppercase text-zinc-600">
          Start Date
        </Form.Label>
        <Form.Control
          {...register("startDate", { required: true })}
          className={`rounded-b-none rounded-t border-b ${
            errors.startDate ? "border-red-600" : "border-zinc-300"
          } bg-zinc-100 px-3 py-4 focus:outline-none`}
          type="date"
        />
      </Form.Field>

      {/* End Date */}
      <Form.Field
        name="endDate"
        className="col-span-full flex flex-col rounded-sm md:col-span-1"
      >
        <Form.Label className="py-1.5 text-xs font-semibold uppercase text-zinc-600">
          End Date
        </Form.Label>
        <Form.Control
          {...register("endDate", { required: true })}
          className={`rounded-b-none rounded-t border-b ${
            errors.endDate ? "border-red-600" : "border-zinc-300"
          } bg-zinc-100 px-3 py-4 focus:outline-none`}
          type="date"
        />
      </Form.Field>

      {/* Message */}
      <Form.Field
        name="message"
        className="col-span-full flex flex-col rounded-sm"
      >
        <Form.Label className="py-1.5 text-xs font-semibold uppercase text-zinc-600">
          Message
        </Form.Label>
        <Form.Control asChild>
          <textarea
            {...register("message", { required: true })}
            className={`rounded-b-none rounded-t border-b ${
              errors.message ? "border-red-600" : "border-zinc-300"
            } resize-none bg-zinc-100 px-3 py-4 focus:outline-none`}
            rows={5}
          />
        </Form.Control>
      </Form.Field>

      <div className="col-span-full flex items-center justify-center px-3 py-2">
        <span className="text-zinc-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id reiciendis
          deleniti incidunt, totam earum aliquid labore.
        </span>
      </div>

      {/* Submit */}
      <div className="col-span-full flex items-center justify-end px-3 py-2">
        <Form.Submit className="flex w-full items-center justify-center gap-1 rounded bg-zinc-800 px-6 py-2 hover:bg-emerald-700 md:w-max">
          <span className="text-zinc-50">Submit</span>
          <FontAwesomeIcon className="text-zinc-50" icon={faArrowRight} />
        </Form.Submit>
      </div>
    </Form.Root>
  );
}

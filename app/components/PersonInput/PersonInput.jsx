"use client";

import { useState } from "react";
import Image from "next/image";
import tick from "../../assets/tick.svg";

const PersonInput = ({ data, setPersonData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    birthYear: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the current input on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the form is already submitting before executing the logic
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    // Validate form fields
    const validationErrors = {};

    // Validate Greek text inputs
    const greekTextPattern = /^[\u0370-\u03FF\s]+$/;
    if (
      formData.firstName.trim() === "" ||
      !greekTextPattern.test(formData.firstName)
    ) {
      validationErrors.firstName =
        "Το πεδίο απαιτείται ή περιέχει μη έγκυρους χαρακτήρες.";
    }
    if (
      formData.lastName.trim() === "" ||
      !greekTextPattern.test(formData.lastName)
    ) {
      validationErrors.lastName =
        "Το πεδίο απαιτείται ή περιέχει μη έγκυρους χαρακτήρες.";
    }
    if (
      formData.fatherName.trim() === "" ||
      !greekTextPattern.test(formData.fatherName)
    ) {
      validationErrors.fatherName =
        "Το πεδίο απαιτείται ή περιέχει μη έγκυρους χαρακτήρες.";
    }
    if (
      formData.motherName.trim() === "" ||
      !greekTextPattern.test(formData.motherName)
    ) {
      validationErrors.motherName =
        "Το πεδίο απαιτείται ή περιέχει μη έγκυρους χαρακτήρες.";
    }

    const currentYear = new Date().getFullYear();
    const birthYearPattern = /^\d{4}$/;
    const birthYear = parseInt(formData.birthYear);
    
    if (
      formData.birthYear.trim() === "" ||
      !birthYearPattern.test(formData.birthYear) ||
      birthYear < 1900 ||
      birthYear > currentYear - 16
    ) {
      validationErrors.birthYear =
        "Το πεδίο απαιτείται και πρέπει να περιέχει ένα έγκυρο έτος γέννησης.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    data.push(formData);
    setPersonData(data);
  };

  return (
    <>
      <form
        className="max-w-5xl flex gap-4 flex-wrap mx-auto justify-center bg-blue-100 rounded-xl p-6 relative border border-cyan-600"
        onSubmit={handleSubmit}
      >
        {isSubmitting && (
          <>
            <Image
              src={tick}
              alt="tick"
              className="absolute right-6 top-5 max-w-[40px] tick"
            />
          </>
        )}
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-1">
            Όνομα:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            placeholder="Τουλάχιστον 2 χαρακτήρες"
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-1">
            Επώνυμο:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Το πρώτο επώνυμο"
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="fatherName" className="block mb-1">
            Πατρώνυμο:
          </label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            placeholder="Τουλάχιστον 2 χαρακτήρες"
            value={formData.fatherName}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border ${
              errors.fatherName ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.fatherName && (
            <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="motherName" className="block mb-1">
            Μητρώνυμο:
          </label>
          <input
            type="text"
            id="motherName"
            name="motherName"
            placeholder="Τουλάχιστον 2 χαρακτήρες"
            value={formData.motherName}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border ${
              errors.motherName ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.motherName && (
            <p className="text-red-500 text-sm mt-1">{errors.motherName}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="birthYear" className="block mb-1">
            Έτος γέννησης:
          </label>
          <input
            type="number"
            id="birthYear"
            name="birthYear"
            value={formData.birthYear}
            placeholder="4 ψηφία"
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border ${
              errors.birthYear ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.birthYear && (
            <p className="text-red-500 text-sm mt-1">{errors.birthYear}</p>
          )}
        </div>
        {!isSubmitting && (
          <>
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 transition-all duration-200 text-white font-semibold py-2 px-4 rounded w-full max-w-[500px]"
            >
              Προσθήκη στη λίστα
            </button>
          </>
        )}
      </form>
    </>
  );
};

export default PersonInput;

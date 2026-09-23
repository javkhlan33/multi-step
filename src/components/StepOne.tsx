"use client";

import { ChangeEvent, FormEvent } from "react";
import type { FormData, FormErrors } from "@/types/form";
import { FormHeader } from "./FormHeader";
import { FormInput } from "./FormInput";
import { ProgressTracker } from "./ProgressTracker";
import { validateStep1 } from "@/lib/validation";

type StepOneProps = {
  formData: FormData;
  errors: FormErrors;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onContinue: (errors: FormErrors) => void;
};

export function StepOne({
  formData,
  errors,
  onChange,
  onContinue,
}: StepOneProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { isValid, errors: validationErrors } = validateStep1(formData);
    onContinue(isValid ? {} : validationErrors);
  };

  return (
    <div className="flex flex-col w-full max-w-[480px] min-h-[655px] p-8 bg-white rounded-lg">
      <FormHeader />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-grow gap-y-3"
        noValidate
      >
        <FormInput
          name="firstName"
          label="First name"
          value={formData.firstName}
          onChange={onChange}
          placeholder="Your first name"
          error={errors.firstName}
          autoComplete="given-name"
        />
        <FormInput
          name="lastName"
          label="Last name"
          value={formData.lastName}
          onChange={onChange}
          placeholder="Your last name"
          error={errors.lastName}
          autoComplete="family-name"
        />
        <FormInput
          name="username"
          label="Username"
          value={formData.username}
          onChange={onChange}
          placeholder="Your username"
          error={errors.username}
          autoComplete="username"
        />
        <ProgressTracker currentStep={1} />
      </form>
    </div>
  );
}

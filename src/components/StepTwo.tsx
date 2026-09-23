"use client";

import { ChangeEvent, FormEvent } from "react";
import type { FormData, FormErrors } from "@/types/form";
import { FormHeader } from "./FormHeader";
import { FormInput } from "./FormInput";
import { ProgressTracker } from "./ProgressTracker";
import { validateStep2 } from "@/lib/validation";

type StepTwoProps = {
  formData: FormData;
  errors: FormErrors;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onContinue: (errors: FormErrors) => void;
  onBack: () => void;
};

export function StepTwo({
  formData,
  errors,
  onChange,
  onContinue,
  onBack,
}: StepTwoProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { isValid, errors: validationErrors } = validateStep2(formData);
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
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Your email"
          error={errors.email}
          autoComplete="email"
        />
        <FormInput
          name="phoneNumber"
          label="Phone number"
          type="tel"
          value={formData.phoneNumber}
          onChange={onChange}
          placeholder="Your phone number"
          error={errors.phoneNumber}
          autoComplete="tel"
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={onChange}
          placeholder="Your password"
          error={errors.password}
          autoComplete="new-password"
        />
        <FormInput
          name="confirmPassword"
          label="Confirm password"
          type="password"
          value={formData.confirmPassword}
          onChange={onChange}
          placeholder="Confirm password"
          error={errors.confirmPassword}
          autoComplete="new-password"
        />
        <ProgressTracker currentStep={2} onBack={onBack} />
      </form>
    </div>
  );
}

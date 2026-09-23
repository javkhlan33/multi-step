"use client";

import { ChangeEvent, FormEvent } from "react";
import type { FormData, FormErrors } from "@/types/form";
import { FormHeader } from "./FormHeader";
import { FormInput } from "./FormInput";
import { ImageUploader } from "./ImageUploader";
import { ProgressTracker } from "./ProgressTracker";
import { validateStep3 } from "@/lib/validation";

type StepThreeProps = {
  formData: FormData;
  errors: FormErrors;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onImageChange: (file: File | null) => void;
  onImageError: (message: string | undefined) => void;
  onSubmit: (errors: FormErrors) => void;
  onBack: () => void;
  isSubmitting?: boolean;
};

export function StepThree({
  formData,
  errors,
  onChange,
  onImageChange,
  onImageError,
  onSubmit,
  onBack,
  isSubmitting = false,
}: StepThreeProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { isValid, errors: validationErrors } = validateStep3(formData);
    onSubmit(isValid ? {} : validationErrors);
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
          name="dateOfBirth"
          label="Date of birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={onChange}
          placeholder="--/--/--"
          error={errors.dateOfBirth}
        />
        <ImageUploader
          error={errors.profileImage}
          onImageChange={onImageChange}
          onValidationError={onImageError}
        />
        <ProgressTracker
          currentStep={3}
          onBack={onBack}
          submitLabel="Submit 3/3"
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
}

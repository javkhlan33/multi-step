"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  INITIAL_FORM_DATA,
  type FormData,
  type FormErrors,
  type FormStep,
} from "@/types/form";
import { clearFormStorage, loadFormData, saveFormData } from "@/lib/storage";
import { submitForm } from "@/lib/submitForm";
import { validateField } from "@/lib/validation";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { SuccessMessage } from "./SuccessMessage";

const stepVariants = {
  enter: { opacity: 0, x: 100 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState<FormStep | "success">(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const restored = loadFormData();
    if (restored) {
      setFormData(restored.data);
      setCurrentStep(restored.step);
    }
    setIsHydrated(true);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FormData;

    setFormData((prev) => {
      const next = { ...prev, [fieldName]: value };

      setErrors((prevErrors) => {
        if (!prevErrors[fieldName]) return prevErrors;

        const fieldError = validateField(fieldName, value, next);
        const nextErrors = { ...prevErrors };

        if (fieldError) {
          nextErrors[fieldName] = fieldError;
        } else {
          delete nextErrors[fieldName];
        }

        if (fieldName === "password" && prevErrors.confirmPassword) {
          const confirmError = validateField(
            "confirmPassword",
            next.confirmPassword,
            next
          );
          if (confirmError) {
            nextErrors.confirmPassword = confirmError;
          } else {
            delete nextErrors.confirmPassword;
          }
        }

        return nextErrors;
      });

      return next;
    });
  };

  const handleImageChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, profileImage: file }));
    if (file) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.profileImage;
        return next;
      });
    }
  };

  const handleImageError = (message: string | undefined) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (message) {
        next.profileImage = message;
      } else {
        delete next.profileImage;
      }
      return next;
    });
  };

  const goToStep = (step: FormStep) => {
    setCurrentStep(step);
    setErrors({});
    setSubmitError(null);
  };

  const handleStepOneContinue = (validationErrors: FormErrors) => {
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    saveFormData(formData, 2);
    goToStep(2);
  };

  const handleStepTwoContinue = (validationErrors: FormErrors) => {
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    saveFormData(formData, 3);
    goToStep(3);
  };

  const handleStepThreeSubmit = async (validationErrors: FormErrors) => {
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await submitForm(formData);

    setIsSubmitting(false);

    if (!result.success) {
      setSubmitError(result.error);
      return;
    }

    clearFormStorage();
    setCurrentStep("success");
  };

  if (!isHydrated) {
    return (
      <div className="flex flex-col w-full max-w-[480px] min-h-[655px] p-8 bg-white rounded-lg" />
    );
  }

  if (currentStep === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <SuccessMessage />
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-[480px] px-4 sm:px-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial="enter"
          animate="center"
          exit="exit"
          variants={stepVariants}
          transition={{ duration: 0.35 }}
        >
          {currentStep === 1 && (
            <StepOne
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onContinue={handleStepOneContinue}
            />
          )}
          {currentStep === 2 && (
            <StepTwo
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onContinue={handleStepTwoContinue}
              onBack={() => {
                saveFormData(formData, 1);
                goToStep(1);
              }}
            />
          )}
          {currentStep === 3 && (
            <StepThree
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onImageChange={handleImageChange}
              onImageError={handleImageError}
              onSubmit={handleStepThreeSubmit}
              onBack={() => {
                saveFormData(formData, 2);
                goToStep(2);
              }}
              isSubmitting={isSubmitting}
            />
          )}
        </motion.div>
      </AnimatePresence>
      {submitError && (
        <p className="mt-3 text-center text-error text-sm" role="alert">
          {submitError}
        </p>
      )}
    </div>
  );
}

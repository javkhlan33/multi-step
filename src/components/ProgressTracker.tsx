import { Button } from "./Button";

type ProgressTrackerProps = {
  currentStep: 1 | 2 | 3;
  onBack?: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
};

/**
 * Footer progress controls matching the reference design.
 * Shows current step via button labels (Continue 1/3, etc.)
 * and a Back button on steps 2 and 3.
 */
export function ProgressTracker({
  currentStep,
  onBack,
  submitLabel,
  isSubmitting = false,
}: ProgressTrackerProps) {
  const primaryLabel =
    submitLabel ??
    (currentStep === 3 ? "Submit 3/3" : `Continue ${currentStep}/3`);

  return (
    <div className="flex w-full gap-x-2 mt-auto" role="navigation" aria-label="Form steps">
      <span className="sr-only">
        Step {currentStep} of 3
      </span>
      {onBack && (
        <Button
          type="button"
          variant="secondary"
          showBackArrow
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </Button>
      )}
      <Button
        type="submit"
        showForwardArrow
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : primaryLabel}
      </Button>
    </div>
  );
}

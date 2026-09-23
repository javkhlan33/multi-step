import type { FormData } from "@/types/form";

export type SubmitResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Submission handler structured for easy API integration later.
 * Currently logs the final payload and resolves successfully.
 */
export async function submitForm(data: FormData): Promise<SubmitResult> {
  try {
    const payload = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      username: data.username,
      dateOfBirth: data.dateOfBirth,
      password: data.password,
      confirmPassword: data.confirmPassword,
      profileImage:
        data.profileImage instanceof File
          ? {
              name: data.profileImage.name,
              type: data.profileImage.type,
              size: data.profileImage.size,
            }
          : data.profileImage,
    };

    console.log("Form submitted:", payload);

    // Ready for API integration, e.g.:
    // const response = await fetch('/api/register', { method: 'POST', body: formData });

    return { success: true };
  } catch (error) {
    console.error("Form submission failed:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting.",
    };
  }
}

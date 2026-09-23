export type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
  profileImage: File | string | null;
};

export type FormErrors = Partial<Record<keyof FormData, string>>;

export type FormStep = 1 | 2 | 3;

export const INITIAL_FORM_DATA: FormData = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  username: "",
  dateOfBirth: "",
  password: "",
  confirmPassword: "",
  profileImage: null,
};

export const STORAGE_DATA_KEY = "multi-step-form-data";
export const STORAGE_STEP_KEY = "multi-step-form-step";

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

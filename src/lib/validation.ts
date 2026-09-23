import type { FormData, FormErrors } from "@/types/form";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "@/types/form";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?\d{8}$/;

const isEmpty = (value: string | null | undefined | File): boolean => {
  if (value instanceof File) return false;
  return !value?.toString().trim();
};

export const validateEmail = (email: string): string | undefined => {
  if (isEmpty(email)) return "Email is required.";
  if (!EMAIL_REGEX.test(email)) return "Please enter a valid email address.";
  return undefined;
};

export const validatePhone = (phone: string): string | undefined => {
  if (isEmpty(phone)) return "Phone number is required.";
  if (phone.trim().length < 8) return "Please enter an 8-digit phone number.";
  if (!PHONE_REGEX.test(phone.trim()))
    return "Please enter a valid phone number.";
  return undefined;
};

export const validateFirstName = (firstName: string): string | undefined => {
  if (isEmpty(firstName)) return "First name is required.";
  return undefined;
};

export const validateLastName = (lastName: string): string | undefined => {
  if (isEmpty(lastName)) return "Last name is required.";
  return undefined;
};

export const validateUsername = (username: string): string | undefined => {
  if (isEmpty(username)) return "Username is required.";
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (isEmpty(password)) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  return undefined;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | undefined => {
  if (isEmpty(confirmPassword)) return "Confirm password is required.";
  if (confirmPassword !== password) return "Passwords do not match.";
  return undefined;
};

export const validateDateOfBirth = (dateOfBirth: string): string | undefined => {
  if (isEmpty(dateOfBirth)) return "Date of birth is required.";

  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  if (Number.isNaN(birthDate.getTime())) {
    return "Please enter a valid date of birth.";
  }

  if (birthDate > today) {
    return "Date of birth must be before today.";
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  if (age < 18) {
    return "You must be at least 18 years old.";
  }

  return undefined;
};

export const validateProfileImage = (
  profileImage: File | string | null
): string | undefined => {
  if (!profileImage) return "Profile image is required.";

  if (profileImage instanceof File) {
    if (!ACCEPTED_IMAGE_TYPES.includes(profileImage.type)) {
      return "Please select a valid image (JPEG, PNG, or WebP).";
    }
    if (profileImage.size > MAX_IMAGE_SIZE) {
      return "Image must be smaller than 5MB.";
    }
  }

  return undefined;
};

export const validateImageFile = (file: File): string | undefined => {
  if (!file.type.startsWith("image/")) {
    return "Please select a valid image file.";
  }
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "Please select a valid image (JPEG, PNG, or WebP).";
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return "Image must be smaller than 5MB.";
  }
  return undefined;
};

export const validateStep1 = (
  data: FormData
): { isValid: boolean; errors: FormErrors } => {
  const errors: FormErrors = {};

  const firstNameError = validateFirstName(data.firstName);
  const lastNameError = validateLastName(data.lastName);
  const usernameError = validateUsername(data.username);

  if (firstNameError) errors.firstName = firstNameError;
  if (lastNameError) errors.lastName = lastNameError;
  if (usernameError) errors.username = usernameError;

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateStep2 = (
  data: FormData
): { isValid: boolean; errors: FormErrors } => {
  const errors: FormErrors = {};

  const emailError = validateEmail(data.email);
  const phoneError = validatePhone(data.phoneNumber);
  const passwordError = validatePassword(data.password);
  const confirmError = validateConfirmPassword(
    data.password,
    data.confirmPassword
  );

  if (emailError) errors.email = emailError;
  if (phoneError) errors.phoneNumber = phoneError;
  if (passwordError) errors.password = passwordError;
  if (confirmError) errors.confirmPassword = confirmError;

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateStep3 = (
  data: FormData
): { isValid: boolean; errors: FormErrors } => {
  const errors: FormErrors = {};

  const dobError = validateDateOfBirth(data.dateOfBirth);
  const imageError = validateProfileImage(data.profileImage);

  if (dobError) errors.dateOfBirth = dobError;
  if (imageError) errors.profileImage = imageError;

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateField = (
  name: keyof FormData,
  value: string,
  formData: FormData
): string | undefined => {
  switch (name) {
    case "email":
      return validateEmail(value);
    case "firstName":
      return validateFirstName(value);
    case "lastName":
      return validateLastName(value);
    case "phoneNumber":
      return validatePhone(value);
    case "username":
      return validateUsername(value);
    case "password":
      return validatePassword(value);
    case "confirmPassword":
      return validateConfirmPassword(formData.password, value);
    case "dateOfBirth":
      return validateDateOfBirth(value);
    default:
      return undefined;
  }
};

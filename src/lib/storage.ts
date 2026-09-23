import {
  INITIAL_FORM_DATA,
  STORAGE_DATA_KEY,
  STORAGE_STEP_KEY,
  type FormData,
  type FormStep,
} from "@/types/form";

type PersistedFormData = Omit<FormData, "profileImage"> & {
  profileImage: null;
};

export function saveFormData(data: FormData, step: FormStep): void {
  if (typeof window === "undefined") return;

  const toPersist: PersistedFormData = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phoneNumber: data.phoneNumber,
    username: data.username,
    dateOfBirth: data.dateOfBirth,
    password: data.password,
    confirmPassword: data.confirmPassword,
    profileImage: null,
  };

  localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(toPersist));
  localStorage.setItem(STORAGE_STEP_KEY, String(step));
}

export function loadFormData(): {
  data: FormData;
  step: FormStep;
} | null {
  if (typeof window === "undefined") return null;

  try {
    const rawData = localStorage.getItem(STORAGE_DATA_KEY);
    const rawStep = localStorage.getItem(STORAGE_STEP_KEY);

    if (!rawData) return null;

    const parsed = JSON.parse(rawData) as Partial<FormData>;
    const stepNum = rawStep ? Number(rawStep) : 1;
    const step: FormStep =
      stepNum === 2 || stepNum === 3 ? stepNum : 1;

    return {
      data: {
        ...INITIAL_FORM_DATA,
        ...parsed,
        profileImage: null,
      },
      step,
    };
  } catch {
    return null;
  }
}

export function clearFormStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_DATA_KEY);
  localStorage.removeItem(STORAGE_STEP_KEY);
}

import { useState } from "react";
import Swal from "sweetalert2";
import { TFormData } from "@/types/formData.type";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const initialFormData: TFormData = {
  name: "",
  email: "",
  phone: "",
  phonePermission: "",
  usageType: "",
  invoiceRegistration: "",
  provideRegistrationNumber: "",
  city: "",
  product_info: "",
  inquiry_source: "",
  product_details: "",
  product_condition: "",
  image: null,
  additional_notes: "",
};

export const useFormHandler = () => {
  const [formData, setFormData] = useState<TFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (base64Image: string | null) => {
    setFormData((prevData) => ({ ...prevData, image: base64Image }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send only the Base64 image in `attachment`, and exclude it from `formData`
      const emailData = {
        ...formData,
        attachment: formData.image || null, // Send Base64 image as attachment
        fileName: formData.fileName || "attachment", // Include file name
      };

      // Remove the image field from the email's context
      delete emailData.image;

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Email sending failed");
      }

      setFormData(initialFormData);
      Toast.fire({
        icon: "success",
        title: "メールが送信されました！確認メールをお送りしました。",
      });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Unknown error";
      Toast.fire({
        icon: "error",
        title: `送信中にエラーが発生しました: ${errMsg}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleInputChange,
    handleImageChange,
    handleSubmit,
  };
};


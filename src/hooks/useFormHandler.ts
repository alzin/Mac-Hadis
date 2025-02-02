import { TFormData } from "@/types/formData.type";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import Swal from "sweetalert2";

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
  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (image: string | null) => {
    setFormData((prevData) => ({ ...prevData, image }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // EmailJS Configuration
    const serviceID = "service_p3to9nt";
    const systemTemplateID = "template_xf3foxn"; // For sending to your system
    const welcomeTemplateID = "template_id6emd5"; // For sending to the client
    const publicKey = "0xF8VQGwM-H1P-NVr";

    const emailParams = {
      ...formData,
      image: formData.image || "No Image Provided",
      from_name: formData.name,
    };

    const welcomeParams = {
      ...formData,
      image: formData.image || "No Image Provided",
      name: formData.name,
      user_email: formData.email,
    };

    try {
      // Send email to system
      await emailjs.send(serviceID, systemTemplateID, emailParams, publicKey);

      // Reset form
      setFormData(initialFormData);

      // Success toast
      Toast.fire({ icon: "success", title: "メールが送信されました！" });

      // Send welcome email
      await emailjs.send(
        serviceID,
        welcomeTemplateID,
        welcomeParams,
        publicKey
      );

      // Welcome email toast
      Toast.fire({ icon: "success", title: "Welcome email sent to client!" });
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

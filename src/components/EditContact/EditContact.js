import { reactive, ref, watch } from "vue";

export default function useEditContact(props, emit) {
  const model = reactive({
    contact: {
      name: "",
      email: "",
      phnumber: "",
    },
  });

  const errorDialog = ref(false);
  const errorMessage = ref("");

  watch(
    () => props.contact,
    (newContact) => {
      if (newContact) {
        model.contact = { ...newContact };
      }
    },
    { immediate: true }
  );

  const saveContact = () => {
    if (!model.contact.name.trim()) {
      errorMessage.value = "Name must not be empty or contain only spaces.";
      errorDialog.value = true;
      return;
    }

    if (!model.contact.email) {
      errorMessage.value = "Email is required.";
      errorDialog.value = true;
      return;
    }

    if (!model.contact.phnumber) {
      errorMessage.value = "Phone Number is required.";
      errorDialog.value = true;
      return;
    }

    emit("contact-saved", model.contact);
  };

  return {
    model,
    saveContact,
    errorDialog,
    errorMessage,
  };
}

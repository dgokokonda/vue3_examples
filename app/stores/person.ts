interface FormType {
  about_me: string;
  age: number;
  birthdate: string;
  fio: string;
  hobby: { id: string; name: string }[];
  languages: string[];
  phone: string;
  post: string;
  sex: string;
}

interface PersonField {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string | number | Record<string, string>[] | string[];
  required: boolean;
  min?: string;
  max?: string;
  mask?: string;
  options?: Record<string, string> | string[];
  maxlength?: number;
}

export const usePersonStore = defineStore("personStore", () => {
  // state
  // const personForm = ref<PostType>();
  const fields = ref<PersonField[]>([]);

  // actions
  const getFields = async () => {
    const { data, error, execute } = await useFetch(
      "http://localhost:3001/person-form",
    );

    if (data.value?.fields) {
      fields.value = data.value.fields;
    }
  };

  const savePersonForm = async (data: FormType) => {
    if (!data) return;

    try {
      await $fetch("http://localhost:3001/form", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      await changeFields(data);
    } catch (error) {
      console.error(error || "Save form error!");
    }
  };

  const changeFields = async (data: FormType) => {
    if (!data) return;

    const newFields = fields.value.map((field: PersonField) => ({
      ...field,
      value: data[field.name],
    }));

    try {
      await $fetch("http://localhost:3001/person-form", {
        method: "PUT",
        body: JSON.stringify({ fields: newFields }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      fields.value = newFields;
    } catch (error) {
      console.error("Update fields error");
    }
  };

  return {
    // personForm,
    fields,
    getFields,
    savePersonForm,
  };
});

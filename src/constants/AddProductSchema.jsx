import * as yup from "yup";

export const AddProductSchema = yup.object().shape({
  name: yup
    .string()
    .required("Bu alan zorunlu")
    .max(100, "100 karakterden fazla olamaz"),
  description: yup
    .string()
    .required("Bu alan zorunlu")
    .max(500, "500 karakterden fazla olamaz"),
  price: yup
    .number()
    .required("Bu alan zorunlu")
    .typeError("0-9 Arasında Bir Rakam Girin"),
  category: yup.number().required("Bu alan zorunlu"),
  status: yup.string().required("Bu alan zorunlu"),
  image: yup.mixed().required("Bu alan zorunlu"),
});
